import { WordI } from "src/Words/domain/entitiesI/WordI";
import { WordMeaningI } from "src/Words/domain/entitiesI/WordMeaningI";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WordEntity } from "./word.entity";

@Entity('palabra_acepciones')
export class WordMeaningEntity implements WordMeaningI {
    @PrimaryGeneratedColumn('increment', {name: 'id_acepcion', type: 'int'})
    meaningId: number;
    @ManyToOne(() => WordEntity, word => word.meanings)
    @JoinColumn({name: 'id_palabra'})
    word: WordI;
    @Column({name: 'descripcion', type: 'text', nullable: false})
    meaning: string;
}