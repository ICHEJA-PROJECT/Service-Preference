import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OccupationRepository } from "src/Occupation/domain/repositories/OccupationRepository";
import { Repository } from "typeorm";
import { OccupationEntity } from "../entities/occupation.entity";
import { OccupationI } from "src/Occupation/domain/entitiesI/OccupationI";
import { CreateOccupationDto } from "../dtos/create-occupation.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class OccupationRepositoryImpl implements OccupationRepository {
    constructor(@InjectRepository(OccupationEntity) private readonly occupationRepository: Repository<OccupationEntity>) {}

    async create(createOccupationDto: CreateOccupationDto): Promise<OccupationI> {
        try {
            const occupation = this.occupationRepository.create(createOccupationDto);
            return await this.occupationRepository.save(occupation);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll(): Promise<OccupationI[]> {
        try {
            return await this.occupationRepository.find();
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findOne(id: number): Promise<OccupationI> {
        try {
            const occupation = await this.occupationRepository.findOne({ where: { id } });
            if (!occupation) {
                throw new RpcException({
                    message: "La ocupación solicitada no existe",
                    status: HttpStatus.NOT_FOUND
                });
            }
            return occupation;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}