import { WordOccupationI } from "src/Occupation/domain/entitiesI/WordOccupationI";
import { WordMeaningI } from "./WordMeaningI";

export interface WordI {
    id: number;
    word: string;
    meanings: WordMeaningI[];
    occupations: WordOccupationI[];
}