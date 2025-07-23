import { WordI } from "src/Words/domain/entitiesI/WordI";
import { RegionI } from "./RegionI";

export interface WordRegionI {
    word: WordI;
    region: RegionI;
}