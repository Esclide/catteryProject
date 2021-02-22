import {User} from "../../users/entities/user.entity";
import {Cat} from "../entities/cat.entity";
import {Breed} from "../entities/breed.entity";
import {Column} from "typeorm";

export class CreateBreedDto {
    name: string;
    description?: string;
    image?: string;
}

export class UpdateBreedDto {
    id: string;
    name: string;
    description?: string;
    image?: string;
}