import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ExerciseOccupationService } from "../services/exercise_occupation.service";
import { CreateExerciseOccupationDto } from "../data/dtos/create-exercise-occupation.dto";

@Controller('exercise-occupations')
export class ExerciseOccupationController {
    constructor(private readonly exerciseOccupationService: ExerciseOccupationService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createExerciseOccupationDto: CreateExerciseOccupationDto) {
        return await this.exerciseOccupationService.create(createExerciseOccupationDto);
    }

    @Get('exercises/:id')
    @HttpCode(HttpStatus.OK)
    async findByExercise(@Param('id') id: number) {
        return await this.exerciseOccupationService.findByExercise(id);
    }

    @Get('occupations/:id/ids')
    @HttpCode(HttpStatus.OK)
    async findByOccupationOnlyIds(@Param('id') id: number) {
        return await this.exerciseOccupationService.findByOccupationOnlyIds(id);
    }

    @Get('occupations/:id')
    @HttpCode(HttpStatus.OK)
    async findByOccupation(@Param('id') id: number) {
        return await this.exerciseOccupationService.findByOccupation(id);
    }

}