import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ExerciseRegionService } from "../services/exercise_region.service";
import { CreateExerciseRegionDto } from "../data/dtos/create-exercise-region.dto";

@Controller('exercise-regions')
export class ExerciseRegionController {
    constructor(private readonly exerciseRegionService: ExerciseRegionService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createExerciseRegionDto: CreateExerciseRegionDto) {
        return await this.exerciseRegionService.create(createExerciseRegionDto);
    }

    @Get('exercises/:id')
    @HttpCode(HttpStatus.OK)
    async getByExercise(@Param('id') id: number) {
        return await this.exerciseRegionService.findByExercise(id);
    }

    @Get('regions/:id/ids')
    @HttpCode(HttpStatus.OK)
    async getRegionIds(@Param('id') id: number) {
        return await this.exerciseRegionService.findByRegionOnlyIds(id);
    }

    @Get('regions/:id')
    @HttpCode(HttpStatus.OK)
    async getByRegion(@Param('id') id: number) {
        return await this.exerciseRegionService.findByRegion(id);
    }
    
}