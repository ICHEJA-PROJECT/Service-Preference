import { ExerciseOccupationI } from "./ExerciseOccupationI";
import { StudentOccupationI } from "./StudentOccupationI";
import { WordOccupationI } from "./WordOccupationI";

export interface OccupationI {
    id: number;
    name: string;
    students: StudentOccupationI[];
    words: WordOccupationI[];
    exercises: ExerciseOccupationI[];
}