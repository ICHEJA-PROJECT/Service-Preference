import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { WordRegionRepository } from "../domain/repositories/WordRegionRepository";
import { WordRegionRepositoryImpl } from "../data/repositories/word_region.repository.impl";
import { RpcException } from "@nestjs/microservices";
import { CreateWordRegionDto } from "../data/dtos/create-word-region.dto";

@Injectable()
export class WordRegionService {
    constructor(@Inject(WordRegionRepositoryImpl) private readonly wordRegionRepository: WordRegionRepository) {}

    async create(createWordRegionDto: CreateWordRegionDto) {
        try {
            return await this.wordRegionRepository.create(createWordRegionDto);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
    
    async findAll() {
        try {
            return await this.wordRegionRepository.findAll();
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}