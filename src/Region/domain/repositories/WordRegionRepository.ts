import { CreateWordRegionDto } from "src/Region/data/dtos/create-word-region.dto";
import { WordRegionI } from "../entitiesI/WordRegionI";

export interface WordRegionRepository {
    create(createWordRegionDto: CreateWordRegionDto): Promise<WordRegionI>;
    findAll(): Promise<WordRegionI[]>;
}