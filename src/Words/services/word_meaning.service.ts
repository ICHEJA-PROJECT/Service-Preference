import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { WordRepository } from "../domain/repositories/WordRepository";
import { WordMeaningRepositoryImpl } from "../data/repositories/word_meaning.repository.impl";
import { WordMeaningRepository } from "../domain/repositories/WordMeaningRepository";
import { CreateWordMeaningDto } from "../data/dtos/create-word-meaning.dto";
import { RpcException } from "@nestjs/microservices";


@Injectable()
export class WordMeaningService {
    constructor(@Inject(WordMeaningRepositoryImpl) private readonly wordMeaningRepository: WordMeaningRepository) {}

    async create(createWordMeaningDto: CreateWordMeaningDto) {
        try {
            const wordMeaning = await this.wordMeaningRepository.create(createWordMeaningDto);
            return wordMeaning;
        } catch (error) {
            throw new RpcException ({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll() {
        try {
            const wordMeanings = await this.wordMeaningRepository.findAll();
            return wordMeanings;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
    
}