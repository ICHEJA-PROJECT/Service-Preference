import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ExerciseRegionRepositoryImpl } from "../data/repositories/exercise_region.repository.impl";
import { ExerciseRegionRepository } from "../domain/repositories/ExerciseRegionRepository";
import { RpcException } from "@nestjs/microservices";
import { CreateExerciseRegionDto } from "../data/dtos/create-exercise-region.dto";

@Injectable()
export class ExerciseRegionService {
    constructor(@Inject(ExerciseRegionRepositoryImpl) private readonly exerciseRegionRepository: ExerciseRegionRepository) {}

    async create(createExerciseRegionDto: CreateExerciseRegionDto) {
        try {
            return await this.exerciseRegionRepository.create(createExerciseRegionDto);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByExercise(exerciseId: number) {
        try {
            return await this.exerciseRegionRepository.findByExercise(exerciseId);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByRegion(regionId: number) {
        try {
            return await this.exerciseRegionRepository.findByRegion(regionId);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByRegionOnlyIds(regionId: number) {
        try {
            return await this.exerciseRegionRepository.findByRegionOnlyIds(regionId);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByRegionsOnlyIds(regionsIds: number[]) {
        try {
            return await this.exerciseRegionRepository.findByRegionsOnlyIds(regionsIds);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

}