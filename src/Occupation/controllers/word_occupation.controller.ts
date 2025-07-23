import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { WordOccupationService } from "../services/word_occupation.service";
import { CreateWordOccupationDto } from "../data/dtos/create-word-occupation.dto";

@Controller('word-occupations')
export class WordOccupationController {
    constructor(private readonly wordOccupationService: WordOccupationService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createWordOccupationDto: CreateWordOccupationDto) {
        return await this.wordOccupationService.create(createWordOccupationDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return await this.wordOccupationService.findAll();
    }
    
}