import { CreateExerciseRegionDto } from "src/Region/data/dtos/create-exercise-region.dto";
import { ExerciseRegionI } from "../entitiesI/ExerciseRegionI";

export interface ExerciseRegionRepository {
    create(createExerciseRegionDto: CreateExerciseRegionDto): Promise<ExerciseRegionI>;
    findByExercise(exerciseId: number): Promise<ExerciseRegionI[]>;
    findByRegion(regionId: number): Promise<ExerciseRegionI[]>;
    findByRegionOnlyIds(regionId: number): Promise<number[]>;
}