import {IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString} from "class-validator";


export class CreateCatDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsEnum(['male', 'female'])
    gender: string;

    @IsNumberString()
    breederId: string

    @IsNumberString()
    ownerId: string

    @IsNumberString()
    @IsOptional()
    motherId?: string

    @IsNumberString()
    @IsOptional()
    fatherId?: string

    @IsNumberString()
    breedId: string

    @IsString()
    color: string;

    @IsDateString()
    birthDate: Date;

    @IsBoolean()
    @IsOptional()
    abilityToReproduce: Boolean;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    isAlive: Boolean;
}

export class UpdateCatDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsEnum(['male', 'female'])
    @IsOptional()
    gender: string;

    @IsNumberString()
    @IsOptional()
    breederId: string

    @IsNumberString()
    @IsOptional()
    ownerId: string

    @IsNumberString()
    @IsOptional()
    motherId?: string

    @IsNumberString()
    @IsOptional()
    fatherId?: string

    @IsNumberString()
    @IsOptional()
    breedId: string

    @IsString()
    @IsOptional()
    color: string;

    @IsDateString()
    @IsOptional()
    birthDate: Date;

    @IsBoolean()
    @IsOptional()
    abilityToReproduce: Boolean;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    isAlive: Boolean;
}