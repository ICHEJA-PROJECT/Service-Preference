import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OccupationEntity } from "./data/entities/occupation.entity";
import { StudentOccupationEntity } from "./data/entities/student_occupation.entity";
import { WordOccupationEntity } from "./data/entities/word_occupation.entity";
import { ExerciseOccupationEntity } from "./data/entities/exercise_occupation.entity";
import { OccupationController } from "./controllers/occupation.controller";
import { StudentOccupationController } from "./controllers/student_occupation.controller";
import { WordOccupationController } from "./controllers/word_occupation.controller";
import { ExerciseOccupationController } from "./controllers/exercise_occupation.controller";
import { OccupationRepositoryImpl } from "./data/repositories/occupation.repository.impl";
import { OccupationService } from "./services/occupation.service";
import { StudentOccupationService } from "./services/student_occupation.service";
import { WordOccupationRepositoryImpl } from "./data/repositories/word_occupation.repository.impl";
import { StudentOccupationRepositoryImpl } from "./data/repositories/student_occupation.repository.impl";
import { ExerciseOccupationRepositoryImpl } from "./data/repositories/exercise_occupation.repository.impl";
import { WordOccupationService } from "./services/word_occupation.service";
import { ExerciseOccupationService } from "./services/exercise_occupation.service";
import { WordEntity } from "src/Words/data/entities/word.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OccupationEntity,
            StudentOccupationEntity,
            WordEntity,
            WordOccupationEntity,
            ExerciseOccupationEntity,
        ]),
    ],
    controllers: [
        OccupationController,
        StudentOccupationController,
        WordOccupationController,
        ExerciseOccupationController,
    ],
    providers: [
        OccupationRepositoryImpl,
        StudentOccupationRepositoryImpl,
        WordOccupationRepositoryImpl,
        ExerciseOccupationRepositoryImpl,
        OccupationService,
        StudentOccupationService,
        WordOccupationService,
        ExerciseOccupationService,
    ],
    exports: [
        StudentOccupationService,
        ExerciseOccupationService,
    ],
})
export class OccupationModule {}