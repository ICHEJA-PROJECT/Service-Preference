import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ImpairmentRepositoryImpl } from "../data/repositories/impairment.repository.impl";
import { ImpairmentRepository } from "../domain/repositories/ImpairmentRepository";
import { CreateImpairmentDto } from "../data/dtos/create-impairment.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ImpairmentService {
    constructor(@Inject(ImpairmentRepositoryImpl) private readonly impairmentRepository: ImpairmentRepository) {}

    async create(createImpairmentDto: CreateImpairmentDto) {
        try {
            const impairment = await this.impairmentRepository.create(createImpairmentDto);
            return impairment;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll() {
        try {
            const impairments = await this.impairmentRepository.findAll();
            return impairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findOne(id: number) {
        try {
            const impairment = await this.impairmentRepository.findOne(id);
            return impairment;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}