import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ExerciseRegionRepository } from "src/Region/domain/repositories/ExerciseRegionRepository";
import { ExerciseRegionEntity } from "../entities/exercise_region.entity";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RegionEntity } from "../entities/region.entity";
import { ExerciseRegionI } from "src/Region/domain/entitiesI/ExerciseRegionI";
import { CreateExerciseRegionDto } from "../dtos/create-exercise-region.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ExerciseRegionRepositoryImpl implements ExerciseRegionRepository {
    constructor(
        @InjectRepository(ExerciseRegionEntity)
        private readonly exerciseRegionRepository: Repository<ExerciseRegionEntity>,
        @InjectRepository(RegionEntity)
        private readonly regionRepository: Repository<RegionEntity>,
    ) {}

    async create(createExerciseRegionDto: CreateExerciseRegionDto): Promise<ExerciseRegionI> {
        try {
            const region = await this.regionRepository.findOneOrFail({ where: { id: createExerciseRegionDto.regionId } });
            const exerciseRegion = this.exerciseRegionRepository.create({
                ...createExerciseRegionDto,
                region: region,
            });
            return await this.exerciseRegionRepository.save(exerciseRegion);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByExercise(exerciseId: number): Promise<ExerciseRegionI[]> {
        try {
            return await this.exerciseRegionRepository.find({ where: { exerciseId }, relations: ['region'] });
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
            
        }
    }

    async findByRegion(regionId: number): Promise<ExerciseRegionI[]> {
        try {
            return await this.exerciseRegionRepository.find({ where: { regionId }, relations: ['region'] });
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
            
        }
    }

    async findByRegionOnlyIds(regionId: number): Promise<number[]> {
        try {
            return await this.exerciseRegionRepository.find({ where: { regionId } })
                .then((regions) => regions.map((region) => region.exerciseId));
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByRegionsOnlyIds(regionsIds: number[]): Promise<number[]> {
        try {
            return await this.exerciseRegionRepository.find({where: {regionId: In(regionsIds)}})
                .then((regions) => regions.map((region) => region.exerciseId));
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}