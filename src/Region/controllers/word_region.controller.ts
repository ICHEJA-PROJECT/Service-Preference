import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { WordRegionService } from "../services/word_region.service";
import { CreateWordRegionDto } from "../data/dtos/create-word-region.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";

@Controller('word-regions')
export class WordRegionController {
    constructor(private readonly wordRegionService: WordRegionService) {}

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.WORD_REGION_CREATE })
    async create(@Payload() createWordRegionDto: CreateWordRegionDto) {
        return await this.wordRegionService.create(createWordRegionDto);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.WORD_REGION_FIND_ALL })
    async getAll() {
        return await this.wordRegionService.findAll();
    }
    
}