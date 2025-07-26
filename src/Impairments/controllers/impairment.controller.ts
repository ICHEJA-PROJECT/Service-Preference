import { Controller } from "@nestjs/common";
import { ImpairmentService } from "../services/impairment.service";
import { CreateImpairmentDto } from "../data/dtos/create-impairment.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";

@Controller('impairments')
export class ImpairmentController {
    constructor(private readonly impairmentService: ImpairmentService) {}

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.IMPAIRMENT_CREATE })
    async create(@Payload() createImpairmentDto: CreateImpairmentDto) {
        return await this.impairmentService.create(createImpairmentDto);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.IMPAIRMENT_FIND_ALL })
    async getAll() {
        return await this.impairmentService.findAll();
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.IMPAIRMENT_FIND_BY_ID })
    async getById(@Payload('id') id: number) {
        return await this.impairmentService.findOne(id);
    }
}