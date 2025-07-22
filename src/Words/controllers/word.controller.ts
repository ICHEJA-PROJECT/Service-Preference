import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { WordService } from "../services/word.service";
import { CreateWordDto } from "../data/dtos/create-word.dto";

@Controller('words')
export class WordController {
    constructor(private readonly wordService: WordService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createWordDto: CreateWordDto) {
        return await this.wordService.create(createWordDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.wordService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: number) {
        return await this.wordService.findOne(id);
    }
    
}