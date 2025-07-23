import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { WordRegionService } from "../services/word_region.service";
import { CreateWordRegionDto } from "../data/dtos/create-word-region.dto";

@Controller('word-regions')
export class WordRegionController {
    constructor(private readonly wordRegionService: WordRegionService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createWordRegionDto: CreateWordRegionDto) {
        return await this.wordRegionService.create(createWordRegionDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.wordRegionService.findAll();
    }
    
}