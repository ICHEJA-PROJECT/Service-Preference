import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { WordOccupationRepositoryImpl } from "../data/repositories/word_occupation.repository.impl";
import { WordOccupationRepository } from "../domain/repositories/WordOccupationRepository";
import { CreateWordOccupationDto } from "../data/dtos/create-word-occupation.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class WordOccupationService {
    constructor(
        @Inject(WordOccupationRepositoryImpl) 
        private readonly wordOccupationRepository: WordOccupationRepository
    ) {}

    async create(createWordOccupationDto: CreateWordOccupationDto) {
        try {
            return await this.wordOccupationRepository.create(createWordOccupationDto);
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }

    async findAll() {
        try {
            return await this.wordOccupationRepository.findAll();
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }
}