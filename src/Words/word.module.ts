import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WordEntity } from "./data/entities/word.entity";
import { WordMeaningEntity } from "./data/entities/word_meaning.entity";
import { WordController } from "./controllers/word.controller";
import { WordMeaningController } from "./controllers/word_meaning.controller";
import { WordRepositoryImpl } from "./data/repositories/word.repository.impl";
import { WordService } from "./services/word.service";
import { WordMeaningRepositoryImpl } from "./data/repositories/word_meaning.repository.impl";
import { WordMeaningService } from "./services/word_meaning.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            WordEntity,
            WordMeaningEntity,
        ])
    ],
    controllers: [
        WordController,
        WordMeaningController,
    ],
    providers: [
        WordRepositoryImpl,
        WordMeaningRepositoryImpl,
        WordService,
        WordMeaningService,
    ],
    exports: []
})
export class WordModule {}