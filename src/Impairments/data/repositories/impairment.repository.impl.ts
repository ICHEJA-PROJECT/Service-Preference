import { ImpairmentI } from "src/Impairments/domain/entitiesI/ImpairmentI";
import { ImpairmentRepository } from "src/Impairments/domain/repositories/ImpairmentRepository";
import { CreateImpairmentDto } from "../dtos/create-impairment.dto";
import { RpcException } from "@nestjs/microservices";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImpairmentEntity } from "../entities/impairment.entity";
import { Repository } from "typeorm";

@Injectable()
export class ImpairmentRepositoryImpl implements ImpairmentRepository {
    constructor(@InjectRepository(ImpairmentEntity) private readonly impairmentRepository: Repository<ImpairmentEntity>) {}

    async create(createImpairmentDto: CreateImpairmentDto): Promise<ImpairmentI> {
        try {
            const imparment = this.impairmentRepository.create(createImpairmentDto);
            return await this.impairmentRepository.save(imparment);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll(): Promise<ImpairmentI[]> {
        try {
            const impairments = await this.impairmentRepository.find();
            return impairments;
        } catch (error) {
            throw new RpcException({
                message: error.message, 
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findOne(id: number): Promise<ImpairmentI> {
        try {
            const impairment = await this.impairmentRepository.findOne({where:{id: id}});
            if(!impairment)  throw new RpcException({
                message: "La discapacidad solicitada no existe.",
                status: HttpStatus.NOT_FOUND
            });
            return impairment;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}