import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { LearningPathImpairmentRepositoryImpl } from "../data/repositories/learning_path_impairment.repository.impl";
import { LearningPathImpairmentRepository } from "../domain/repositories/LearningPathImpairmentRepository";
import { CreateLearningPathImpairmentDto } from "../data/dtos/create-learning-path-impairment.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class LearningPathImpairmentService {
    constructor(@Inject(LearningPathImpairmentRepositoryImpl) private readonly learningPathImpairmentRepository: LearningPathImpairmentRepository) {}

    async create(createLearningPathImpairmentDto: CreateLearningPathImpairmentDto) {
        try {
            const learningPathImpairment = await this.learningPathImpairmentRepository.create(createLearningPathImpairmentDto);
            return learningPathImpairment;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll() {
        try {
            const learningPathsImpairments = await this.learningPathImpairmentRepository.findAll();
            return learningPathsImpairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByLearningPath(learningPathId: number) {
        try {
            const impairments = await this.learningPathImpairmentRepository.findByLearningPath(learningPathId);
            return impairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByImpairment(impairmentId: number) {
        try {
            const learningPaths = await this.learningPathImpairmentRepository.findByImpairment(impairmentId);
            return learningPaths;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}