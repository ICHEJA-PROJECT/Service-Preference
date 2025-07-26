import { Controller } from "@nestjs/common";
import { ExerciseRegionService } from "../services/exercise_region.service";
import { CreateExerciseRegionDto } from "../data/dtos/create-exercise-region.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";

@Controller('exercise-regions')
export class ExerciseRegionController {
    constructor(private readonly exerciseRegionService: ExerciseRegionService) {}

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.EXERCISE_REGION_CREATE })
    async create(@Payload() createExerciseRegionDto: CreateExerciseRegionDto) {
        return await this.exerciseRegionService.create(createExerciseRegionDto);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.EXERCISE_REGION_FIND_BY_EXERCISE })
    async getByExercise(@Payload('id') id: number) {
        return await this.exerciseRegionService.findByExercise(id);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.EXERCISE_REGION_FIND_BY_REGION_ONLY_IDS })
    async getRegionIds(@Payload('id') id: number) {
        return await this.exerciseRegionService.findByRegionOnlyIds(id);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.EXERCISE_REGION_FIND_BY_REGION })
    async getByRegion(@Payload('id') id: number) {
        return await this.exerciseRegionService.findByRegion(id);
    }
    
}