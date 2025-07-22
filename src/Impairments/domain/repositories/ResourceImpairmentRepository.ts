import { CreateResourceImpairmentDto } from "src/Impairments/data/dtos/create-resource-impairment.dto";
import { ResourceImpairmentI } from "../entitiesI/ResourceImpairmentI";

export interface ResourceImpairmentRepository {
    create(createResourceImpairmentDto: CreateResourceImpairmentDto): Promise<ResourceImpairmentI>;
    findAll(): Promise<ResourceImpairmentI[]>;
    findByResource(resourceId: number): Promise<ResourceImpairmentI[]>;
    findByImpairment(impairmentId: number): Promise<ResourceImpairmentI[]>;
}