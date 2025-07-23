import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateExerciseRegionDto {
    @ApiProperty({ description: 'the id of the exercise', type: Number })
    @IsNumber()
    exerciseId: number;

    @ApiProperty({ description: 'the id of the region', type: Number })
    @IsNumber()
    regionId: number;
}