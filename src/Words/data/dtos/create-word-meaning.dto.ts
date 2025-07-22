import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateWordMeaningDto {
    @ApiProperty({description: 'The id fo word', type: 'number'})
    @IsNumber()
    wordId: number;
    @ApiProperty({description: 'Meaning of word', type: 'string'})
    @IsString()
    meaning: string;
}