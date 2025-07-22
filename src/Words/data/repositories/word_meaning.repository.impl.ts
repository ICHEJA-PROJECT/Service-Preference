import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WordMeaningRepository } from "src/Words/domain/repositories/WordMeaningRepository";
import { WordMeaningEntity } from "../entities/word_meaning.entity";
import { Repository } from "typeorm";
import { WordMeaningI } from "src/Words/domain/entitiesI/WordMeaningI";
import { CreateWordMeaningDto } from "../dtos/create-word-meaning.dto";
import { RpcException } from "@nestjs/microservices";
import { WordEntity } from "../entities/word.entity";

@Injectable()
export class WordMeaningRepositoryImpl implements WordMeaningRepository {
    constructor(
        @InjectRepository(WordMeaningEntity) 
        private readonly wordMeaningRepository: Repository<WordMeaningEntity>,
        @InjectRepository(WordEntity)
        private readonly wordRepository: Repository<WordEntity>
    ) {}

    async create(createWordMeaningDto: CreateWordMeaningDto): Promise<WordMeaningI> {
        try {
            const word = await this.wordRepository.findOne({where:{id: createWordMeaningDto.wordId}});
            if(!word) throw new RpcException({
                message: "La palabra solicitada no existe.",
                status: HttpStatus.NOT_FOUND
            });
            const wordMeaning = this.wordMeaningRepository.create({
                ...createWordMeaningDto,
                word: word
            });
            return await this.wordMeaningRepository.save(wordMeaning);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll(): Promise<WordMeaningI[]> {
        try {
            const wordsMeanings = await this.wordMeaningRepository.find();
            return wordsMeanings;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

}