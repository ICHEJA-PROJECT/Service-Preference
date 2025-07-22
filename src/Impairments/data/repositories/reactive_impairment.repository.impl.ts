import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReactiveImpairmentRepository } from "src/Impairments/domain/repositories/ReactiveImpairmentRepository";
import { ReactiveImpairmentEntity } from "../entities/reactive_impairment.entity";
import { Repository } from "typeorm";
import { ReactiveImpairmentI } from "src/Impairments/domain/entitiesI/ReactiveImpairmentI";
import { CreateReactiveImpairmentDto } from "../dtos/create-reactive-impairment.dto";
import { RpcException } from "@nestjs/microservices";
import { ImpairmentEntity } from "../entities/impairment.entity";

@Injectable()
export class ReactiveImpairmentRepositoryImpl implements ReactiveImpairmentRepository {
    constructor(
        @InjectRepository(ReactiveImpairmentEntity) 
        private readonly reactiveImpairmentRepository: Repository<ReactiveImpairmentEntity>,
        @InjectRepository(ImpairmentEntity)
        private readonly impairmentRepository: Repository<ImpairmentEntity>
    ) {}

    async create(createReactiveImpairmentDto: CreateReactiveImpairmentDto): Promise<ReactiveImpairmentI> {
        try {
            const impairment = await this.impairmentRepository.findOne({where:{id: createReactiveImpairmentDto.impairmentId}});
            if(!impairment) throw new RpcException({
                message: "Discapacidad solicitada no registrada",
                status: HttpStatus.NOT_FOUND
            });

            const reactiveImpairment = this.reactiveImpairmentRepository.create({
                ...createReactiveImpairmentDto,
                impairment: impairment
            });

            return await this.reactiveImpairmentRepository.save(reactiveImpairment);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll(): Promise<ReactiveImpairmentI[]> {
        try {
            const reactivesImpairments = await this.reactiveImpairmentRepository.find({relations:['impairment']});
            return reactivesImpairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByReactive(reactiveId: number): Promise<ReactiveImpairmentI[]> {
        try {
            const impairments = await this.reactiveImpairmentRepository
                .createQueryBuilder('ri')
                .select('ri.impairmentId', 'impairmentId')
                .where('ri.reactiveId = :id', { id: reactiveId })
                .getRawMany()
                .then(results => results.map((result) => result.impairmentId));

            return impairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByImpairment(impairmentId: number): Promise<ReactiveImpairmentI[]> {
        try {
            const reactives = await this.reactiveImpairmentRepository
                .createQueryBuilder('ri')
                .select('ri.reactiveId', 'reactiveId')
                .where('ri.impairmentId = :id', {id: impairmentId})
                .getRawMany()
                .then((results) => results.map(result => result.reactiveId));

            return reactives;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}