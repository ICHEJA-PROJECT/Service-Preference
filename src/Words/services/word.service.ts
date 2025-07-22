import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { WordRepositoryImpl } from "../data/repositories/word.repository.impl";
import { WordRepository } from "../domain/repositories/WordRepository";
import { RpcException } from "@nestjs/microservices";
import { CreateWordDto } from "../data/dtos/create-word.dto";

@Injectable()
export class WordService {
    constructor(@Inject(WordRepositoryImpl) private readonly wordRepository: WordRepository) {}

    async create(createWordDto: CreateWordDto) {
        try {
            const word = await this.wordRepository.create(createWordDto);
            return word;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll() {
        try {
            const words = await this.wordRepository.findAll();
            return words;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findOne(id: number) {
        try {
            const word = await this.wordRepository.findOne(id);
            return word;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}