import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { LearningPathImpairmentService } from "../services/learning_path_impairment.service";
import { CreateLearningPathImpairmentDto } from "../data/dtos/create-learning-path-impairment.dto";

@Controller('learning-path-impairments')
export class LearningPathImpairmentController {
    constructor(private readonly learningPathImpairmentService: LearningPathImpairmentService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createLearningPathImpairmentDto: CreateLearningPathImpairmentDto) {
        return await this.learningPathImpairmentService.create(createLearningPathImpairmentDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.learningPathImpairmentService.findAll();
    }

    @Get('learning-paths/:id')
    @HttpCode(HttpStatus.OK)
    async getByLearningPath(@Param('id') learningPathId: number) {
        return await this.learningPathImpairmentService.findByImpairment(learningPathId);
    }

    @Get('impairments/:id')
    @HttpCode(HttpStatus.OK)
    async getByImpairment(@Param('id') impairmentId: number) {
        return await this.learningPathImpairmentService.findByImpairment(impairmentId);
    }
}