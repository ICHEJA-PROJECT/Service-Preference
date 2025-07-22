import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateResourceImpairmentDto {
    @ApiProperty({ description: 'Id of resource', type: 'number'})
    @IsNumber()
    resourceId: number;
    @ApiProperty({ description: 'Id of impairment', type: 'number'})
    @IsNumber()
    impairmentId: number;
}