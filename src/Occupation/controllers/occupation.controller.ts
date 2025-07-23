import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { OccupationService } from "../services/occupation.service";
import { CreateOccupationDto } from "../data/dtos/create-occupation.dto";

@Controller('occupations')
export class OccupationController {
    constructor(private readonly occupationService: OccupationService) {}
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body()createOccupationDto: CreateOccupationDto) {
        return await this.occupationService.create(createOccupationDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return await this.occupationService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(id: number) {
        return await this.occupationService.findOne(id);
    }
    
}
