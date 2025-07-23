import { ExerciseRegionI } from "./ExerciseRegionI";
import { StudentRegionI } from "./StudentRegionI";
import { WordRegionI } from "./WordRegionI";

export interface RegionI {
    id: number;
    name: string;
    students: StudentRegionI[];
    words: WordRegionI[];
    exercises: ExerciseRegionI[];
}