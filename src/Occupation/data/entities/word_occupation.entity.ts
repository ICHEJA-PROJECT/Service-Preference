import { OccupationI } from "src/Occupation/domain/entitiesI/OccupationI";
import { WordOccupationI } from "src/Occupation/domain/entitiesI/WordOccupationI";
import { WordEntity } from "src/Words/data/entities/word.entity";
import { WordI } from "src/Words/domain/entitiesI/WordI";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { OccupationEntity } from "./occupation.entity";

@Entity('ocupacion_palabras')
export class WordOccupationEntity implements WordOccupationI {
    @PrimaryColumn({name: 'id_palabra', type: 'int', nullable: false})
    wordId: number;
    @PrimaryColumn({name: 'id_ocupacion', type: 'int'})
    occupationId: number;
    @ManyToOne(() => WordEntity, word => word.occupations)
    word: WordI;
    @ManyToOne(() => OccupationEntity, occupation => occupation.words)
    occupation: OccupationI;
}