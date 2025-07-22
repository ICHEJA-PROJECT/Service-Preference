import { CreateWordMeaningDto } from "src/Words/data/dtos/create-word-meaning.dto";
import { WordMeaningI } from "../entitiesI/WordMeaningI";

export interface WordMeaningRepository {
    create(createWordMeaningDto: CreateWordMeaningDto): Promise<WordMeaningI>;
    findAll(): Promise<WordMeaningI[]>;
}