import { Controller } from "@nestjs/common";
import { WordOccupationService } from "../services/word_occupation.service";
import { CreateWordOccupationDto } from "../data/dtos/create-word-occupation.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";

@Controller('word-occupations')
export class WordOccupationController {
    constructor(private readonly wordOccupationService: WordOccupationService) {}

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.WORD_OCCUPATION_CREATE })
    async create(@Payload() createWordOccupationDto: CreateWordOccupationDto) {
        return await this.wordOccupationService.create(createWordOccupationDto);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.WORD_OCCUPAIION_FIND_ALL })
    async findAll() {
        return await this.wordOccupationService.findAll();
    }
    
}