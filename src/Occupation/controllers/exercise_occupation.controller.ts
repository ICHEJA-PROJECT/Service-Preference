import { Controller, } from "@nestjs/common";
import { ExerciseOccupationService } from "../services/exercise_occupation.service";
import { CreateExerciseOccupationDto } from "../data/dtos/create-exercise-occupation.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";

@Controller('exercise-occupations')
export class ExerciseOccupationController {
    constructor(private readonly exerciseOccupationService: ExerciseOccupationService) {}

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.EXERCISE_OCCUPATION_CREATE })
    async create(@Payload() createExerciseOccupationDto: CreateExerciseOccupationDto) {
        return await this.exerciseOccupationService.create(createExerciseOccupationDto);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.EXERCISE_OCCUPATION_FIND_BY_EXERCISE })
    async findByExercise(@Payload('id') id: number) {
        return await this.exerciseOccupationService.findByExercise(id);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.EXERCISE_OCCUPATION_FIND_BY_OCCUPATION_ONLY_IDS })
    async findByOccupationOnlyIds(@Payload('id') id: number) {
        return await this.exerciseOccupationService.findByOccupationOnlyIds(id);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.EXERCISE_OCCUPATION_FIND_BY_OCCUPATION })
    async findByOccupation(@Payload('id') id: number) {
        return await this.exerciseOccupationService.findByOccupation(id);
    }

}