import { IsNumberString } from 'class-validator';

export class GetOneParam {
    @IsNumberString()
    id: string;
}