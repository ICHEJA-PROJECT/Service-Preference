import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WordRepository } from "src/Words/domain/repositories/WordRepository";
import { WordEntity } from "../entities/word.entity";
import { Repository } from "typeorm";
import { WordI } from "src/Words/domain/entitiesI/WordI";
import { CreateWordDto } from "../dtos/create-word.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class WordRepositoryImpl implements WordRepository {
    constructor(
        @InjectRepository(WordEntity) 
        private readonly wordRepository: Repository<WordEntity>
    ) {}

    async create(createWordDto: CreateWordDto): Promise<WordI> {
        try {
            const word = this.wordRepository.create(createWordDto);
            return await this.wordRepository.save(word);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll(): Promise<WordI[]> {
        try {
            const words = await this.wordRepository.find();
            return words;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findOne(id: number): Promise<WordI> {
        try {
            const word = await this.wordRepository.findOne({where: {id}, relations: {meanings: true}});
            if(!word) throw new RpcException({
                message: "La palabra solicitada no existe.",
                status: HttpStatus.NOT_FOUND
            });
            return word;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}