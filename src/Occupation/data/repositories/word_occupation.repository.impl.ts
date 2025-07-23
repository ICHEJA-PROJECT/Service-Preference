import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WordOccupationRepository } from "src/Occupation/domain/repositories/WordOccupationRepository";
import { Repository } from "typeorm";
import { WordOccupationEntity } from "../entities/word_occupation.entity";
import { WordOccupationI } from "src/Occupation/domain/entitiesI/WordOccupationI";
import { CreateWordOccupationDto } from "../dtos/create-word-occupation.dto";
import { RpcException } from "@nestjs/microservices";
import { OccupationEntity } from "../entities/occupation.entity";
import { WordEntity } from "src/Words/data/entities/word.entity";

@Injectable()
export class WordOccupationRepositoryImpl implements WordOccupationRepository {
    constructor(
        @InjectRepository(WordOccupationEntity) 
        private readonly wordOccupationRepository: Repository<WordOccupationEntity>,
        @InjectRepository(OccupationEntity)
        private readonly occupationRepository: Repository<OccupationEntity>,
        @InjectRepository(WordEntity)
        private readonly wordRepository: Repository<WordEntity>
    ) {}


    async create(createWordOccupationDto: CreateWordOccupationDto): Promise<WordOccupationI> {
        try {
            const occupation = await this.occupationRepository.findOneBy({ id: createWordOccupationDto.occupationId });
            if (!occupation) {
                throw new RpcException({
                    message: "La ocupación asociada no existe",
                    status: HttpStatus.NOT_FOUND
                });
            }
            const word = await this.wordRepository.findOneBy({ id: createWordOccupationDto.wordId });
            if (!word) {
                throw new RpcException({
                    message: "La palabra asociada no existe",
                    status: HttpStatus.NOT_FOUND
                });
            }
            const wordOccupation = this.wordOccupationRepository.create({
                ...createWordOccupationDto,
                occupation: occupation,
                word: word
            });
            return await this.wordOccupationRepository.save(wordOccupation);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }


    async findAll(): Promise<WordOccupationI[]> {
        try {
            return await this.wordOccupationRepository.find({ relations: { word: true, occupation: true } });
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
            
        }
    }

}