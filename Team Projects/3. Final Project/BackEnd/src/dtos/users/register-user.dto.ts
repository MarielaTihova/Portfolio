
import { IsString, Length, IsEmail, IsNotEmpty } from "class-validator"
export class RegisterUserDTO {
    @IsString()
    @Length(5, 30)
    username: string;
    @IsString()
    @Length(5, 30)
    personalName: string;
    @IsString()

    password: string;
    @IsString()
    avatar: string;

    @IsString()
    country: string;

    @IsEmail({}, { message: 'Incorrect email' })
    @IsNotEmpty({ message: 'The email is required' })
    email: string;
}