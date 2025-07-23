import { CreateRegionDto } from "src/Region/data/dtos/create-region.dto";
import { RegionI } from "../entitiesI/RegionI";

export interface RegionRepository {
    create(createRegionDTO: CreateRegionDto): Promise<RegionI>;
    findAll(): Promise<RegionI[]>;
    findOne(id: number): Promise<RegionI>;
}