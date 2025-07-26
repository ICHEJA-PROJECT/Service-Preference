import { Controller, } from "@nestjs/common";
import { ResourceImpairmentService } from "../services/resource_impairment.service";
import { CreateResourceImpairmentDto } from "../data/dtos/create-resource-impairment.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";

@Controller('resource-impairments')
export class ResourceImpairmentController {
    constructor(private readonly resourceImpairmentService: ResourceImpairmentService) {}

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.RESOURCE_IMPAIRMENT_CREATE })
    async create(@Payload() createResourceImpairmentDto: CreateResourceImpairmentDto) {
        return await this.resourceImpairmentService.create(createResourceImpairmentDto);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.RESOURCE_IMPAIRMENT_FIND_ALL })
    async findAll() {
        return await this.resourceImpairmentService.findAll();
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.RESOURCE_IMPAIRMENT_FIND_BY_RESOURCE })
    async findByResource(@Payload('id') resourceId: number) {
        return await this.resourceImpairmentService.findByResource(resourceId);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.RESOURCE_IMPAIRMENT_FIND_BY_IMPAIRMENT })
    async findByImpairment(@Payload('id') impairmentId: number) {
        return await this.resourceImpairmentService.findByImpairment(impairmentId);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.RESOURCE_IMPAIRMENT_FIND_BY_LEARNING_PATH })
    async findByLearningPath(@Payload('id') learningPathId: number) {
        return await this.resourceImpairmentService.findeByLearningPath(learningPathId);
    }
}