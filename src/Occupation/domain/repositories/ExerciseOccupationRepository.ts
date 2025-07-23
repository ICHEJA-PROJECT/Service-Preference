import { CreateExerciseOccupationDto } from "src/Occupation/data/dtos/create-exercise-occupation.dto";
import { ExerciseOccupationI } from "../entitiesI/ExerciseOccupationI";

export interface ExerciseOccupationRepository {
    create(createExerciseOccupationDto: CreateExerciseOccupationDto): Promise<ExerciseOccupationI>;
    findByExercise(exerciseId: number): Promise<ExerciseOccupationI[]>;
    findByOccupation(occupationId: number): Promise<ExerciseOccupationI[]>;
    findByOccupationOnlyIds(occupationId: number): Promise<number[]>;
}