import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LearningPathImpairmentRepository } from "src/Impairments/domain/repositories/LearningPathImpairmentRepository";
import { LearningPathImpairmentEntity } from "../entities/learning_path_impairment.entity";
import { Repository } from "typeorm";
import { LearningPathImpairmentI } from "src/Impairments/domain/entitiesI/LearningPathImpairmentI";
import { CreateLearningPathImpairmentDto } from "../dtos/create-learning-path-impairment.dto";
import { RpcException } from "@nestjs/microservices";
import { ImpairmentEntity } from "../entities/impairment.entity";

@Injectable()
export class LearningPathImpairmentRepositoryImpl implements LearningPathImpairmentRepository {
    constructor(
        @InjectRepository(LearningPathImpairmentEntity) 
        private readonly learningPathImpairmentRepository: Repository<LearningPathImpairmentEntity>,
        @InjectRepository(ImpairmentEntity)
        private readonly impairmentRepository: Repository<ImpairmentEntity>
    ) {}

    async create(createLearningPathImpairmentDto: CreateLearningPathImpairmentDto): Promise<LearningPathImpairmentI> {
        try {
            const impairment = await this.impairmentRepository.findOne({where:{id: createLearningPathImpairmentDto.impairmentId}});
            if(!impairment) throw new RpcException({
                message: "Discapacidad solicitada no registrada",
                status: HttpStatus.NOT_FOUND
            });

            const learningPathImpairment = this.learningPathImpairmentRepository.create({
                ...createLearningPathImpairmentDto,
                impairment: impairment
            });

            return await this.learningPathImpairmentRepository.save(learningPathImpairment);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll(): Promise<LearningPathImpairmentI[]> {
        try {
            const learningPathsImpairments = await this.learningPathImpairmentRepository.find({relations: ['impairment']});
            return learningPathsImpairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByLearningPath(learningPathId: number): Promise<string[]> {
        try {
            const impairments = await this.learningPathImpairmentRepository
                .find({where:{learningPathId: learningPathId}})
                .then(results => results.map(result => result.impairment.name));
            return impairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByImpairment(impairmentId: number): Promise<LearningPathImpairmentI[]> {
        try {
            const learningPaths = await this.learningPathImpairmentRepository
                .createQueryBuilder('lpi')
                .select('lpi.learningPathId', 'learningPathId')
                .where('lpi.impairmentId = :id' , { id: impairmentId})
                .getRawMany()
                .then(results => results.map(result => result.learningPathId));
            return learningPaths;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findOne(id: number): Promise<LearningPathImpairmentI> {
        try {
            const learningPathImpairment = await this.learningPathImpairmentRepository.findOneOrFail({where: {learningPathId: id}, relations: {impairment: true}});
            return learningPathImpairment;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}