import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { WordRegionRepository } from "src/Region/domain/repositories/WordRegionRepository";
import { WordRegionEntity } from "../entities/word_region.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { WordEntity } from "src/Words/data/entities/word.entity";
import { RegionEntity } from "../entities/region.entity";
import { WordRegionI } from "src/Region/domain/entitiesI/WordRegionI";
import { CreateWordRegionDto } from "../dtos/create-word-region.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class WordRegionRepositoryImpl implements WordRegionRepository {
    constructor(
        @InjectRepository(WordRegionEntity)
        private readonly wordRegionRepository: Repository<WordRegionEntity>,
        @InjectRepository(WordEntity)
        private readonly wordRepository: Repository<WordEntity>,
        @InjectRepository(RegionEntity)
        private readonly regionRepository: Repository<RegionEntity>,
    ) {}

    async create(createWordRegionDto: CreateWordRegionDto): Promise<WordRegionI> {
        try {
            const word = await this.wordRepository.findOneOrFail({ where: { id: createWordRegionDto.wordId } });
            const region = await this.regionRepository.findOneOrFail({ where: { id: createWordRegionDto.regionId } });
            const wordRegion = this.wordRegionRepository.create({
                ...createWordRegionDto,
                word: word,
                region: region,
            });
            return await this.wordRegionRepository.save(wordRegion);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
    
    async findAll(): Promise<WordRegionI[]> {
        try {
            return await this.wordRegionRepository.find({
                relations: ['word', 'region'],
            });
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

}