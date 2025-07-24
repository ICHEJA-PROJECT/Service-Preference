import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ResourceImpairmentRepositoryImpl } from "../data/repositories/resource_impairment.repository.impl";
import { ResourceImpairmentRepository } from "../domain/repositories/ResourceImpairmentRepository";
import { CreateResourceImpairmentDto } from "../data/dtos/create-resource-impairment.dto";
import { RpcException } from "@nestjs/microservices";
import { LearningPathImpairmentService } from "./learning_path_impairment.service";

@Injectable()
export class ResourceImpairmentService {
    constructor(
        @Inject(ResourceImpairmentRepositoryImpl) private readonly resourceImpairmentRepository: ResourceImpairmentRepository, 
        private readonly learningPathImpairmentService: LearningPathImpairmentService
    ) {}

    async create(createResourceImpairmentDto: CreateResourceImpairmentDto) {
        try {
            const resourceImpairment = await this.resourceImpairmentRepository.create(createResourceImpairmentDto);
            return resourceImpairment;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll() {
        try {
            const resourcesImpairments = await this.resourceImpairmentRepository.findAll();
            return resourcesImpairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByResource(resourceId: number) {
        try {
            const impairments = await this.resourceImpairmentRepository.findByResource(resourceId);
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
            const resources = await this.resourceImpairmentRepository.findByImpairment(impairmentId);
            return resources;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findeByLearningPath(learningPathId: number) {
        try {
            const learningPathImpairment = await this.learningPathImpairmentService.findOne(learningPathId);
            return await this.findByImpairment(learningPathImpairment.impairment.id);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}