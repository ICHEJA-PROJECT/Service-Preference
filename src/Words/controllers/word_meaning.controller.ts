import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { WordMeaningService } from "../services/word_meaning.service";
import { CreateWordMeaningDto } from "../data/dtos/create-word-meaning.dto";

@Controller('word-meanings')
export class WordMeaningController {
    constructor(private readonly wordMeaningService: WordMeaningService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createWordMeaningDto: CreateWordMeaningDto) {
        return await this.wordMeaningService.create(createWordMeaningDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.wordMeaningService.findAll();
    }
    
}