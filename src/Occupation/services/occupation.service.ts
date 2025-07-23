import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { OccupationRepositoryImpl } from "../data/repositories/occupation.repository.impl";
import { OccupationRepository } from "../domain/repositories/OccupationRepository";
import { CreateOccupationDto } from "../data/dtos/create-occupation.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class OccupationService {
    constructor(@Inject(OccupationRepositoryImpl) private readonly occupationRepository: OccupationRepository) {}

    async create(createOccupationDto: CreateOccupationDto) {
        try {
            return await this.occupationRepository.create(createOccupationDto);
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }

    async findAll() {
        try {
            return await this.occupationRepository.findAll();
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }

    async findOne(id: number) {
        try {
            return await this.occupationRepository.findOne(id);
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.NOT_FOUND,
                message: error.message,
            });
        }
    }
    
}