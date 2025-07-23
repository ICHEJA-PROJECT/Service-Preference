import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { RegionRepositoryImpl } from "../data/repositories/region.repository.impl";
import { RegionRepository } from "../domain/repositories/RegionRepository";
import { CreateRegionDto } from "../data/dtos/create-region.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class RegionService {
    constructor(@Inject(RegionRepositoryImpl) private readonly regionRepository: RegionRepository) {}

    async create(createRegionDto: CreateRegionDto) {
        try {
            return await this.regionRepository.create(createRegionDto);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findAll() {
        try {
            return await this.regionRepository.findAll();
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findOne(id: number) {
        try {
            return await this.regionRepository.findOne(id);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.NOT_FOUND,
            });
            
        }
    }
}