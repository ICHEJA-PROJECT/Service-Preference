import { Controller } from "@nestjs/common";
import { WordMeaningService } from "../services/word_meaning.service";
import { CreateWordMeaningDto } from "../data/dtos/create-word-meaning.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";

@Controller('word-meanings')
export class WordMeaningController {
    constructor(private readonly wordMeaningService: WordMeaningService) {}

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.WORD_MEANING_CREATE })
    async create(@Payload() createWordMeaningDto: CreateWordMeaningDto) {
        return await this.wordMeaningService.create(createWordMeaningDto);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.WORD_MEANING_FIND_ALL })
    async getAll() {
        return await this.wordMeaningService.findAll();
    }
    
}