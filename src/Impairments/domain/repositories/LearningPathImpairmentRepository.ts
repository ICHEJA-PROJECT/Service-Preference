import { CreateLearningPathImpairmentDto } from "src/Impairments/data/dtos/create-learning-path-impairment.dto";
import { LearningPathImpairmentI } from "../entitiesI/LearningPathImpairmentI";

export interface LearningPathImpairmentRepository {
    create(createLearningPathImpairmentDto: CreateLearningPathImpairmentDto): Promise<LearningPathImpairmentI>;
    findAll(): Promise<LearningPathImpairmentI[]>;
    findByLearningPath(learningPathId: number): Promise<string[]>;
    findByImpairment(impairmentId: number): Promise<LearningPathImpairmentI[]>;
}