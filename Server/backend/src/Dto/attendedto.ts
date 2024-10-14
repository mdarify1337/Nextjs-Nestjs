import { IsString, IsNotEmpty } from "class-validator";

export class AttendeeDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    jobTitle: string;
}
