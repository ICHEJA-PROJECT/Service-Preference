import { CreateImpairmentDto } from "src/Impairments/data/dtos/create-impairment.dto";
import { ImpairmentI } from "../entitiesI/ImpairmentI";

export interface ImpairmentRepository {
    create(createImpairmentDto: CreateImpairmentDto): Promise<ImpairmentI>;
    findAll(): Promise<ImpairmentI[]>;
    findOne(id: number): Promise<ImpairmentI>;
}