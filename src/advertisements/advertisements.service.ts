import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertisement } from './entities/advertisement.entity';
import {
  advertisementFieldsForUpdate,
  CreateAdvertisementDto,
  UpdateAdvertisementDto,
} from './dto/advertisement-dto';
import pick from 'lodash/pick';
import { CatsService } from '../cats/cats.service';
import { UsersService } from '../users/users.service';
import { Cat } from '../cats/entities/cat.entity';
import {CreateCatAttachmentDto} from "../cats/dto/cat-attachment-dto";
import {CatAttachments} from "../cats/entities/cat-attachments.entity";
import {CreateAdvertisementAttachmentDto} from "./dto/advertisement-attachment-dto";
import {AdvertisementAttachments} from "./entities/advertisement-attachments.entity";

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private advertisementsRepository: Repository<Advertisement>,
    @InjectRepository(AdvertisementAttachments)
    private attachmentsRepository: Repository<AdvertisementAttachments>,
    private readonly usersService: UsersService,
    private readonly catsService: CatsService,
  ) {}

  async getAllAdvertisements() {
    const advertisements = await this.advertisementsRepository.find();
    return advertisements
      .map((advertisements) => {
        if (!advertisements.isDeleted && advertisements.level === 'general')
          return advertisements;
      })
      .filter(function (advertisement) {
        return advertisement !== undefined;
      });
  }

  async getAdvertisementById(id: string) {
    const advertisements = await this.advertisementsRepository.findOne(id);
    if (advertisements && !advertisements.isDeleted) {
      return advertisements;
    }
    throw new HttpException('Advertisements not found', HttpStatus.NOT_FOUND);
  }

  async createAdvertisement(createAdvertisementDto: CreateAdvertisementDto) {
    const newAdvertisement = await this.advertisementsRepository.create(
      createAdvertisementDto,
    );
    newAdvertisement.creator = await this.usersService.getUserByUsername(
      createAdvertisementDto.creatorUsername,
    );
    if (createAdvertisementDto.catIDs) {
      const cats: Cat[] = [];
      for (const catId of createAdvertisementDto.catIDs) {
        cats.push(await this.catsService.getCatById(catId));
      }
      newAdvertisement.cats = cats;
    }

    await this.advertisementsRepository.save(newAdvertisement);
    return newAdvertisement;
  }

  async updateAdvertisement(
    id: string,
    updateAdvertisementDto: UpdateAdvertisementDto,
  ) {
    const updatedAdvertisement = await this.advertisementsRepository.findOne(
      id,
    );
    if (!updatedAdvertisement) {
      throw new HttpException('Advertisement not found', HttpStatus.NOT_FOUND);
    }

    const updatedFields = Object.keys(
      pick(updateAdvertisementDto, advertisementFieldsForUpdate),
    );
    for (const field of updatedFields) {
      updatedAdvertisement[field] = updateAdvertisementDto[field];
    }

    if (updateAdvertisementDto.catIDs) {
      const cats: Cat[] = [];
      for (const catId of updateAdvertisementDto.catIDs) {
        cats.push(await this.catsService.getCatById(catId));
      }
      updatedAdvertisement.cats = cats;
    }

    await this.advertisementsRepository.save(updatedAdvertisement);
    return updatedAdvertisement;
  }

  async deleteAdvertisement(id: string) {
    await this.updateAdvertisement(id, {
      isDeleted: true,
      deletionDate: new Date().toISOString(),
    });
  }

  async addAttachments(advertsId: string, createAdvertisementAttachmentDtoArray: CreateAdvertisementAttachmentDto[]) {
    if (!(await this.advertisementsRepository.findOne(advertsId))) {
      throw new HttpException('Advertisement not found', HttpStatus.NOT_FOUND);
    }
    const attachmentsToReturn: CatAttachments[] = [];
    for (const createAdvertisementAttachmentDto of createAdvertisementAttachmentDtoArray) {
      const newAttachment = await this.attachmentsRepository.create(createAdvertisementAttachmentDto);
      createAdvertisementAttachmentDto.path = await bcrypt.hash(createAdvertisementAttachmentDto.path, 10);
      await this.attachmentsRepository.save(newAttachment);
      attachmentsToReturn.push(newAttachment)
    }
    return attachmentsToReturn;
  }

  async getAdvertisementAttachments(advertsId: string): Promise<AdvertisementAttachments[]> {
    const adverts = await this.getAdvertisementById(advertsId);
    return adverts.attachments;
  }

  async getAdvertisementMainPhoto(advertsId: string): Promise<AdvertisementAttachments> {
    const advertsAttachments = await this.getAdvertisementAttachments(advertsId);
    for (const attachment of advertsAttachments) {
      if (attachment.isMainPhoto) return attachment
    }
    return advertsAttachments[0]
  }

  async ifAdvertisementHasMainPhoto(advertsId: string): Promise<boolean> {
    const mainPhoto = await this.getAdvertisementMainPhoto(advertsId)
    return (mainPhoto.isMainPhoto)
  }

  async setMainPhoto(advertsId: string, attachmentId: string): Promise<CatAttachments> {
    if (await this.ifAdvertisementHasMainPhoto(advertsId)) await this.attachmentsRepository.update(this.getAdvertisementMainPhoto(advertsId), {isMainPhoto: false});
    try {
      await this.attachmentsRepository.update(attachmentId, {isMainPhoto: true});
    } catch (error) {
      throw new HttpException(
          'Attachment does not exists',
          HttpStatus.NOT_FOUND_ERR,
      );
    }
  }

  async deleteAttachment(advertsId: string, attachmentId: string) {
    const attachment: AdvertisementAttachments = await this.attachmentsRepository.findOne(attachmentId, {
      relations: ['advertisement'],
    })
    if (!attachment) {
      throw new HttpException('Attachment not found', HttpStatus.NOT_FOUND);
    }
    if (attachment.advertisement.id !== advertsId) {
      throw new HttpException('Attachment not found', HttpStatus.NOT_FOUND);
    }
    const deleteResponse = await this.attachmentsRepository.delete(attachmentId);
    if (!deleteResponse.affected) {
      throw new HttpException('Attachment not found', HttpStatus.NOT_FOUND);
    }
  }
}
