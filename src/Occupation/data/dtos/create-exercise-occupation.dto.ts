import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateExerciseOccupationDto {
    @ApiProperty({description: 'id of exercise', type: Number})
    @IsNumber()
    exerciseId: number;
    @ApiProperty({description: 'id of occupation', type: Number})
    @IsNumber()
    occupationId: number;
}