import { WordI } from "src/Words/domain/entitiesI/WordI";
import { WordMeaningI } from "src/Words/domain/entitiesI/WordMeaningI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WordMeaningEntity } from "./word_meaning.entity";
import { WordOccupationI } from "src/Occupation/domain/entitiesI/WordOccupationI";
import { WordOccupationEntity } from "src/Occupation/data/entities/word_occupation.entity";

@Entity('palabra')
export class WordEntity implements WordI {
    @PrimaryGeneratedColumn('increment', { name: 'id_palabra', type: 'int'})
    id: number;
    @Column({name: 'nombre', type: 'text', nullable: false})
    word: string;
    @OneToMany(() => WordMeaningEntity, wordMeaning => wordMeaning.word)
    meanings: WordMeaningI[];
    @OneToMany(() => WordOccupationEntity, wordOccupation => wordOccupation.word)
    occupations: WordOccupationI[];
}