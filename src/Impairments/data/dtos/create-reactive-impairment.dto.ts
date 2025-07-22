import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateReactiveImpairmentDto {
    @ApiProperty({description: "Id of reactive", type: "number"})
    @IsNumber()
    reactiveId: number;
    @ApiProperty({description: "Id of impairment", type: "number"})
    @IsNumber()
    impairmentId: number;
}