import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateStudentOccupationDto {
    @ApiProperty({description: 'id of student', type: 'number'})
    @IsNumber()
    studentId: number;
    @ApiProperty({description: 'id of occupation', type: 'number'})
    @IsNumber()
    occupationId: number;
}