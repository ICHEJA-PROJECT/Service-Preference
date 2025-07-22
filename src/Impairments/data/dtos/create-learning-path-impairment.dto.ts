import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateLearningPathImpairmentDto {
    @ApiProperty({description: 'Id of learning path', type: 'number'})
    @IsNumber()
    learningPathId: number;
    @ApiProperty({description: 'Id of impairment', type: 'number'})
    @IsNumber()
    impairmentId: number;
}