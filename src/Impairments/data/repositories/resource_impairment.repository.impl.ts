import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResourceImpairmentRepository } from "src/Impairments/domain/repositories/ResourceImpairmentRepository";
import { ResourceImpairmentEntity } from "../entities/resource_impairment.entity";
import { Repository } from "typeorm";
import { ResourceImpairmentI } from "src/Impairments/domain/entitiesI/ResourceImpairmentI";
import { CreateResourceImpairmentDto } from "../dtos/create-resource-impairment.dto";
import { RpcException } from "@nestjs/microservices";
import { ImpairmentEntity } from "../entities/impairment.entity";

@Injectable()
export class ResourceImpairmentRepositoryImpl implements ResourceImpairmentRepository {
    constructor(
        @InjectRepository(ResourceImpairmentEntity) 
        private readonly resourceImpairmentRepository: Repository<ResourceImpairmentEntity>,
        @InjectRepository(ImpairmentEntity)
        private readonly impairmentRepository: Repository<ImpairmentEntity>
    ) {}

    async create(createResourceImpairmentDto: CreateResourceImpairmentDto): Promise<ResourceImpairmentI> {
        try {
            const impairment = await this.impairmentRepository.findOne({where:{id: createResourceImpairmentDto.impairmentId}});

            if(!impairment) throw new RpcException({
                message: "Discapacidad solicitada no registrada",
                status: HttpStatus.NOT_FOUND
            });

            const resourceImpairment = this.resourceImpairmentRepository.create({
                ...createResourceImpairmentDto,
                impairment: impairment
            });

            return await this.resourceImpairmentRepository.save(resourceImpairment);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll(): Promise<ResourceImpairmentI[]> {
        try {
            const resourcesImpairments = await this.resourceImpairmentRepository.find({relations:['impairment']});
            return resourcesImpairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByResource(resourceId: number): Promise<ResourceImpairmentI[]> {
        try {
            const impairments = await this.resourceImpairmentRepository
                .createQueryBuilder('rei')
                .select('rei.impairmentId', 'impairmentId')
                .where('rei.resourceId = :id', {id: resourceId})
                .getRawMany()
                .then(results => results.map(result => result.impairmentId));
            return impairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByImpairment(impairmentId: number): Promise<ResourceImpairmentI[]> {
        try {
            const resources = await this.resourceImpairmentRepository
                .createQueryBuilder('rei')
                .select('rei.resourceId', 'resourceId')
                .where('rei.impairmentId = :id', { id: impairmentId})
                .getRawMany()
                .then(results => results.map(result => result.resourceId));

            return resources;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}