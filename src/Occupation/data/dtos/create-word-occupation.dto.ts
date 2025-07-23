import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateWordOccupationDto {
    @ApiProperty({description: 'id of word', type: 'number'})
    @IsNumber()
    wordId: number;
    @ApiProperty({description: 'if of occupation', type: 'number'})
    @IsNumber()
    occupationId: number;
}