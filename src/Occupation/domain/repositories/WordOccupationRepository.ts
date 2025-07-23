import { CreateWordOccupationDto } from "src/Occupation/data/dtos/create-word-occupation.dto";
import { WordOccupationI } from "../entitiesI/WordOccupationI";

export interface WordOccupationRepository {
    create(createWordOccupationDto: CreateWordOccupationDto): Promise<WordOccupationI>;
    findAll(): Promise<WordOccupationI[]>;
}