import { Injectable, Inject, HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ExerciseOccupationRepositoryImpl } from "../data/repositories/exercise_occupation.repository.impl";
import { ExerciseOccupationRepository } from "../domain/repositories/ExerciseOccupationRepository";
import { CreateExerciseOccupationDto } from "../data/dtos/create-exercise-occupation.dto";

@Injectable()
export class ExerciseOccupationService {
    constructor(@Inject(ExerciseOccupationRepositoryImpl) private readonly exerciseOccupationRepository: ExerciseOccupationRepository) {}

    async create(createExerciseOccupationDto: CreateExerciseOccupationDto) {
        try {
            return await this.exerciseOccupationRepository.create(createExerciseOccupationDto);
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }

    async findByExercise(exerciseId: number) {
        try {
            return await this.exerciseOccupationRepository.findByExercise(exerciseId);
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }

    async findByOccupation(occupationId: number) {
        try {
            return await this.exerciseOccupationRepository.findByOccupation(occupationId);
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }

    async findByOccupationOnlyIds(occupationId: number) {
        try {
            return await this.exerciseOccupationRepository.findByOccupationOnlyIds(occupationId);
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }

    async findByOccupationsOnlyIds(occupationsIds: number[]) {
        try {
            return await this.exerciseOccupationRepository.findByOccupationsOnlyIds(occupationsIds);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}