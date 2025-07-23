import { WordI } from "src/Words/domain/entitiesI/WordI";
import { OccupationI } from "./OccupationI";

export interface WordOccupationI {
    word: WordI;
    occupation: OccupationI;
}