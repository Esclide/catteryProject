export class CreateUserDto {
    email: string;
    username: string;
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