import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExerciseOccupationRepository } from "src/Occupation/domain/repositories/ExerciseOccupationRepository";
import { In, Repository } from "typeorm";
import { ExerciseOccupationEntity } from "../entities/exercise_occupation.entity";
import { OccupationEntity } from "../entities/occupation.entity";
import { ExerciseOccupationI } from "src/Occupation/domain/entitiesI/ExerciseOccupationI";
import { CreateExerciseOccupationDto } from "../dtos/create-exercise-occupation.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ExerciseOccupationRepositoryImpl implements ExerciseOccupationRepository {
    constructor(
        @InjectRepository(ExerciseOccupationEntity)
        private readonly exerciseOccupationRepository: Repository<ExerciseOccupationEntity>,
        @InjectRepository(OccupationEntity)
        private readonly occupationRepository: Repository<OccupationEntity>,
    ) {}

    async create(createExerciseOccupationDto: CreateExerciseOccupationDto): Promise<ExerciseOccupationI> {
        try {
            const occupation = await this.occupationRepository.findOne({
                where: { id: createExerciseOccupationDto.occupationId },
            });

            if (!occupation) {
                throw new RpcException({
                    status: HttpStatus.NOT_FOUND,
                    message: "La ocupación asociada no existe",
                });
            }
            
            const exerciseOccupation = this.exerciseOccupationRepository.create({
                ...createExerciseOccupationDto,
                occupation: occupation
            });

            return await this.exerciseOccupationRepository.save(exerciseOccupation);
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }

    async findByExercise(exerciseId: number): Promise<ExerciseOccupationI[]> {
        try {
            const exerciseOccupations = await this.exerciseOccupationRepository.find({
                where: { exerciseId },
                relations: ['occupation'],
            });
            return exerciseOccupations;         
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
            
        }
    }
    
    async findByOccupation(occupationId: number): Promise<ExerciseOccupationI[]> {
        try {
            const exerciseOccupations = await this.exerciseOccupationRepository.find({
                where: { occupationId },
                relations: { occupation: true }
            });
            return exerciseOccupations;
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
            
        }
    }

    async findByOccupationOnlyIds(occupationId: number): Promise<number[]> {
        try {
            const exerciseIds = await this.exerciseOccupationRepository.createQueryBuilder("exerciseOccupation")
                .select("exerciseOccupation.exerciseId")
                .where("exerciseOccupation.occupationId = :occupationId", { occupationId })
                .getMany()
                .then(results => results.map(result => result.exerciseId));

            return exerciseIds;
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }

    async findByOccupationsOnlyIds(occupationsIds: number[]): Promise<number[]> {
        try {
            return await this.exerciseOccupationRepository.find({where: {occupationId: In(occupationsIds)}})
                .then(occupations => occupations.map((occupation) => occupation.exerciseId));
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}