import { Controller} from "@nestjs/common";
import { ReactiveImpairmentService } from "../services/reactive_impairment.service";
import { CreateReactiveImpairmentDto } from "../data/dtos/create-reactive-impairment.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";

@Controller('reactive-impairments')
export class ReactiveImpairmentController {
    constructor(private readonly reactiveImpairmentService: ReactiveImpairmentService) {}

    @MessagePattern({  cmd: PREFERENCES_SERVICE_OPTIONS.REACTIVE_IMPAIRMENT_CREATE })
    async create(@Payload() createReactiveImpairmentDto: CreateReactiveImpairmentDto) {
        return await this.reactiveImpairmentService.create(createReactiveImpairmentDto);
    }

    @MessagePattern({  cmd: PREFERENCES_SERVICE_OPTIONS.REACTIVE_IMPAIRMENT_FIND_ALL })
    async findAll() {
        return await this.reactiveImpairmentService.findAll();
    }

    @MessagePattern({  cmd: PREFERENCES_SERVICE_OPTIONS.REACTIVE_IMPAIRMENT_FIND_BY_REACTIVE })
    async findByReactive(@Payload('id') reactiveId: number) {
        return await this.reactiveImpairmentService.findByReactive(reactiveId);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.REACTIVE_IMPAIRMENT_FIND_BY_IMPAIRMENT })
    async findByImpairment(@Payload('id') impairmentId: number) {
        return await this.reactiveImpairmentService.findeByImpairment(impairmentId);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.REACTIVE_IMPAIRMENT_FIND_BY_LEARNING_PATH })
    async findByLearningPath(@Payload('id') learningPathId: number) {
        return await this.reactiveImpairmentService.findByLearningPath(learningPathId);
    }
}