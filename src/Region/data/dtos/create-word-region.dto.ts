import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateWordRegionDto {
    @ApiProperty({ description: 'the id of the word', type: Number })
    @IsNumber()
    wordId: number;

    @ApiProperty({ description: 'the id of the region', type: Number })
    @IsNumber()
    regionId: number;
}