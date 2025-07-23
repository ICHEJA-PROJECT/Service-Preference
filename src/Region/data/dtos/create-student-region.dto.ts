import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateStudentRegionDto {
    @ApiProperty({ description: 'the id of the student', type: Number })
    @IsNumber()
    studentId: number;

    @ApiProperty({ description: 'the id of the region', type: Number })
    @IsNumber()
    regionId: number;
}