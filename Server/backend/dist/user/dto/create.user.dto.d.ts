import { FindOperator } from 'typeorm';
export declare class CreateUserDto {
    firstName?: string;
    lastName?: string;
    provider?: string;
    username: string;
    email: string;
    picture?: string;
    static email: string | FindOperator<string>;
    static username: string | FindOperator<string>;
}
