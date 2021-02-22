export class CreateUserDto {
    email: string;
    username: string;
    password: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    birthDate: Date;
    registrationDate?: Date;
    phone?: string;
    country?: string;
    city?: string;
    image?: string;
}

export class UpdateUserDto {
    id: string;
    email: string;
    username: string;
    password: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    birthDate: Date;
    registrationDate?: Date;
    phone?: string;
    country?: string;
    city?: string;
    image?: string;
}