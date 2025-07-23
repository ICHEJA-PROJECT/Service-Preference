import { WordOccupationI } from "src/Occupation/domain/entitiesI/WordOccupationI";
import { WordMeaningI } from "./WordMeaningI";
import { WordRegionI } from "src/Region/domain/entitiesI/WordRegionI";

export interface WordI {
    id: number;
    word: string;
    meanings: WordMeaningI[];
    occupations: WordOccupationI[];
    regions: WordRegionI[];
}