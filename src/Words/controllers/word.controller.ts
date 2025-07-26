import { Controller } from "@nestjs/common";
import { WordService } from "../services/word.service";
import { CreateWordDto } from "../data/dtos/create-word.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";

@Controller('words')
export class WordController {
    constructor(private readonly wordService: WordService) {}

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.WORD_CREATE })
    async create(@Payload() createWordDto: CreateWordDto) {
        return await this.wordService.create(createWordDto);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.WORD_FIND_ALL })
    async getAll() {
        return await this.wordService.findAll();
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.WORD_FIND_BY_ID })
    async getById(@Payload('id') id: number) {
        return await this.wordService.findOne(id);
    }
    
}