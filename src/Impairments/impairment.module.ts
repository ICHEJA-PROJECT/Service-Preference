import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImpairmentEntity } from "./data/entities/impairment.entity";
import { StudentImpairmentEntity } from "./data/entities/student_impairment.entity";
import { ImpairmentController } from "./controllers/impairment.controller";
import { StudentImpairmentController } from "./controllers/student_impairment.controller";
import { ImpairmentRepositoryImpl } from "./data/repositories/impairment.repository.impl";
import { StudentImpairmentRepositoryImpl } from "./data/repositories/student_impairment.repository.impl";
import { ImpairmentService } from "./services/impairment.service";
import { StudentImpairmentService } from "./services/student_impairment.service";
import { ReactiveImpairmentEntity } from "./data/entities/reactive_impairment.entity";
import { ReactiveImpairmentController } from "./controllers/reactive_impairment.controller";
import { ReactiveImpairmentRepositoryImpl } from "./data/repositories/reactive_impairment.repository.impl";
import { ReactiveImpairmentService } from "./services/reactive_impairment.service";
import { ResourceImpairmentEntity } from "./data/entities/resource_impairment.entity";
import { ResourceImpairmentController } from "./controllers/resource_impairment.controller";
import { ResourceImpairmentRepositoryImpl } from "./data/repositories/resource_impairment.repository.impl";
import { ResourceImpairmentService } from "./services/resource_impairment.service";
import { LearningPathImpairmentEntity } from "./data/entities/learning_path_impairment.entity";
import { LearningPathImpairmentController } from "./controllers/learning_path_impairment.controller";
import { LearningPathImpairmentRepositoryImpl } from "./data/repositories/learning_path_impairment.repository.impl";
import { LearningPathImpairmentService } from "./services/learning_path_impairment.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ImpairmentEntity,
            StudentImpairmentEntity,
            ReactiveImpairmentEntity,
            ResourceImpairmentEntity,
            LearningPathImpairmentEntity,
        ])
    ], 
    controllers: [
        ImpairmentController,
        StudentImpairmentController,
        ReactiveImpairmentController,
        ResourceImpairmentController,
        LearningPathImpairmentController,
    ],
    providers: [
        ImpairmentRepositoryImpl,
        StudentImpairmentRepositoryImpl,
        ReactiveImpairmentRepositoryImpl,
        ResourceImpairmentRepositoryImpl,
        LearningPathImpairmentRepositoryImpl,
        ImpairmentService,
        StudentImpairmentService,
        ReactiveImpairmentService,
        ResourceImpairmentService,
        LearningPathImpairmentService,
    ],
    exports: []
})
export class ImpairmentModule {}