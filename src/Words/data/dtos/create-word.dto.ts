import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateWordDto {
    @ApiProperty({description: 'The word', type: 'string', maxLength: 32})
    @IsString()
    word: string;
}