import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { LearningPathImpairmentService } from "../services/learning_path_impairment.service";
import { CreateLearningPathImpairmentDto } from "../data/dtos/create-learning-path-impairment.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";

@Controller('learning-path-impairments')
export class LearningPathImpairmentController {
    constructor(private readonly learningPathImpairmentService: LearningPathImpairmentService) {}

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.LEARNING_PATH_IMPAIRMENT_CREATE })
    async create(@Payload() createLearningPathImpairmentDto: CreateLearningPathImpairmentDto) {
        return await this.learningPathImpairmentService.create(createLearningPathImpairmentDto);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.LEARNING_PATH_IMPAIRMENT_FIND_ALL })
    async getAll() {
        return await this.learningPathImpairmentService.findAll();
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.LEARNING_PATH_IMPAIRMENT_FIND_BY_LEARNING_PATH })
    async getByLearningPath(@Payload('id') learningPathId: number) {
        return await this.learningPathImpairmentService.findByImpairment(learningPathId);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.LEARNING_PATH_IMPAIRMENT_FIND_BY_IMPAIRMENT })
    async getByImpairment(@Payload('id') impairmentId: number) {
        return await this.learningPathImpairmentService.findByImpairment(impairmentId);
    }
}