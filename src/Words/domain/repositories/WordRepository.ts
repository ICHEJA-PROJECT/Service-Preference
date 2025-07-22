import { CreateWordDto } from "src/Words/data/dtos/create-word.dto";
import { WordI } from "../entitiesI/WordI";

export interface WordRepository {
    create(createWordDto: CreateWordDto): Promise<WordI>;
    findAll(): Promise<WordI[]>;
    findOne(id: number): Promise<WordI>;
}