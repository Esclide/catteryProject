

export class CreateCatDto {
    name: string;
    title?: string;
    gender: string;
    breederId: string
    ownerId: string
    motherId?: string
    fatherId?: string
    breedId: string
    color: string;
    birthDate: Date;
    abilityToReproduce: Boolean;
    description?: string;
    isAlive: Boolean;
    isDeleted: Boolean;
}

export class UpdateCatDto {
    id: string;
    name: string;
    title?: string;
    gender: string;
    breederId: string
    ownerId: string
    motherId?: string
    fatherId?: string
    breedId: string
    color: string;
    birthDate: Date;
    abilityToReproduce: Boolean;
    description?: string;
    isAlive: Boolean;
    isDeleted: Boolean;
}