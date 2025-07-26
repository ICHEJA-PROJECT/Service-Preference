import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegionEntity } from "./data/entities/region.entity";
import { WordEntity } from "src/Words/data/entities/word.entity";
import { StudentRegionEntity } from "./data/entities/student_region.entity";
import { WordRegionEntity } from "./data/entities/word_region.entity";
import { ExerciseRegionEntity } from "./data/entities/exercise_region.entity";
import { RegionController } from "./controllers/region.controller";
import { StudentRegionController } from "./controllers/student_region.controller";
import { WordRegionController } from "./controllers/word_region.controller";
import { ExerciseRegionController } from "./controllers/exercise_region.controller";
import { RegionRepositoryImpl } from "./data/repositories/region.repository.impl";
import { WordRegionRepositoryImpl } from "./data/repositories/word_region.repository.impl";
import { StudentRegionRepositoryImpl } from "./data/repositories/student_region.reposiotry.impl";
import { ExerciseRegionRepositoryImpl } from "./data/repositories/exercise_region.repository.impl";
import { RegionService } from "./services/region.service";
import { WordRegionService } from "./services/word_region.service";
import { ExerciseRegionService } from "./services/exercise_region.service";
import { StudentRegionService } from "./services/student_region.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RegionEntity,
            WordEntity,
            StudentRegionEntity,
            WordRegionEntity,
            ExerciseRegionEntity,
        ])
    ],
    controllers: [
        RegionController,
        WordRegionController,
        StudentRegionController,
        ExerciseRegionController,
    ],
    providers: [
        RegionRepositoryImpl,
        WordRegionRepositoryImpl,
        StudentRegionRepositoryImpl,
        ExerciseRegionRepositoryImpl,
        RegionService,
        WordRegionService,
        StudentRegionService,
        ExerciseRegionService
    ],
    exports: [
        StudentRegionService,
        ExerciseRegionService,
    ]
})
export class RegionModule {}