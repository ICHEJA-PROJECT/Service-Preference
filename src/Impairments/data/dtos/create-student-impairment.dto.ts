import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateStudentImpairmentDto {
    @ApiProperty({description: "Id of student", type: "number"})
    @IsNumber()
    studentId: number;
    @ApiProperty({description: "Id of impairment", type: "number"})
    @IsNumber()
    impairmentId: number;
}