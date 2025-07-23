import { HttpStatus, Injectable } from "@nestjs/common";
import { RegionRepository } from "src/Region/domain/repositories/RegionRepository";
import { RegionEntity } from "../entities/region.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RegionI } from "src/Region/domain/entitiesI/RegionI";
import { CreateRegionDto } from "../dtos/create-region.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class RegionRepositoryImpl implements RegionRepository {
    constructor(@InjectRepository(RegionEntity) private readonly regionRepository: Repository<RegionEntity>) {}

    async create(createRegionDTO: CreateRegionDto): Promise<RegionI> {
        try {
            const region = this.regionRepository.create(createRegionDTO);
            return await this.regionRepository.save(region);
        } catch (error) {
            throw new RpcException({
                message: error.message, 
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findAll(): Promise<RegionI[]> {
        try {
            return await this.regionRepository.find();
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findOne(id: number): Promise<RegionI> {
        try {
            return await this.regionRepository.findOneOrFail({ where: { id } });
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.NOT_FOUND,
            });
        }
    }

}