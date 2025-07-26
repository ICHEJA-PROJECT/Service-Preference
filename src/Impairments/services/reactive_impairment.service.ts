import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ReactiveImpairmentRepositoryImpl } from "../data/repositories/reactive_impairment.repository.impl";
import { ReactiveImpairmentRepository } from "../domain/repositories/ReactiveImpairmentRepository";
import { CreateReactiveImpairmentDto } from "../data/dtos/create-reactive-impairment.dto";
import { RpcException } from "@nestjs/microservices";
import { LearningPathImpairmentService } from "./learning_path_impairment.service";

@Injectable()
export class ReactiveImpairmentService {
    constructor(
        @Inject(ReactiveImpairmentRepositoryImpl) 
        private readonly reactiveImpairmentRepository: ReactiveImpairmentRepository,
        private readonly learningPathImpairmentService: LearningPathImpairmentService,
    ) {}

    async create(createReactiveImpairmentDto: CreateReactiveImpairmentDto) {
        try {
            const reactiveImpairment = await this.reactiveImpairmentRepository.create(createReactiveImpairmentDto);
            return reactiveImpairment;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll() {
        try {
            const reactivesImpairments = await this.reactiveImpairmentRepository.findAll();
            return reactivesImpairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByReactive(reactiveId: number) {
        try {
            const impairments = await this.reactiveImpairmentRepository.findByReactive(reactiveId);
            return impairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findeByImpairment(impairmentId: number) {
        try {
            const reactives = await this.reactiveImpairmentRepository.findByImpairment(impairmentId);
            return reactives;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByLearningPath(learningPathId: number) {
        try {
            const learningPathImpairment = await this.learningPathImpairmentService.findOne(learningPathId);

            const reactivesImpairments = await this.findeByImpairment(learningPathImpairment.impairment.id);

            return reactivesImpairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}