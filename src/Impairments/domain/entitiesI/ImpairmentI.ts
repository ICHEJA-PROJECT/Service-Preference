import { LearningPathImpairmentI } from "./LearningPathImpairmentI";
import { ReactiveImpairmentI } from "./ReactiveImpairmentI";
import { ResourceImpairmentI } from "./ResourceImpairmentI";
import { StudentImpairmentI } from "./StudentImpairmentI";

export interface ImpairmentI {
    id: number;
    name: string;
    students: StudentImpairmentI[];
    reactives: ReactiveImpairmentI[];
    resources: ResourceImpairmentI[];
    learningPaths: LearningPathImpairmentI[];
}