import { WordMeaningI } from "./WordMeaningI";

export interface WordI {
    id: number;
    word: string;
    meanings: WordMeaningI[];
}