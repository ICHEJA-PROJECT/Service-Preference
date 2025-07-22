import { CreateReactiveImpairmentDto } from "src/Impairments/data/dtos/create-reactive-impairment.dto";
import { ReactiveImpairmentI } from "../entitiesI/ReactiveImpairmentI";

export interface ReactiveImpairmentRepository {
    create(createReactiveImpairmentDto: CreateReactiveImpairmentDto): Promise<ReactiveImpairmentI>;
    findAll(): Promise<ReactiveImpairmentI[]>;
    findByReactive(reactiveId: number): Promise<ReactiveImpairmentI[]>;
    findByImpairment(impairmentId: number): Promise<ReactiveImpairmentI[]>;
}