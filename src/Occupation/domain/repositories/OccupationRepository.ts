import { CreateOccupationDto } from "src/Occupation/data/dtos/create-occupation.dto";
import { OccupationI } from "../entitiesI/OccupationI";

export interface OccupationRepository {
    create(createOccupationDto: CreateOccupationDto): Promise<OccupationI>;
    findAll(): Promise<OccupationI[]>;
    findOne(id: number): Promise<OccupationI>;
}