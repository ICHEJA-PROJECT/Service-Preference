import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { RegionService } from "../services/region.service";
import { CreateRegionDto } from "../data/dtos/create-region.dto";

@Controller('regions')
export class RegionController {
    constructor(private readonly regionService: RegionService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createRegionDto: CreateRegionDto) {
        return await this.regionService.create(createRegionDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.regionService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: number) {
        return await this.regionService.findOne(id);
    }
}