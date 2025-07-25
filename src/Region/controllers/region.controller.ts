import { Controller } from "@nestjs/common";
import { RegionService } from "../services/region.service";
import { CreateRegionDto } from "../data/dtos/create-region.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";

@Controller('regions')
export class RegionController {
    constructor(private readonly regionService: RegionService) {}

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.REGION_CREATE })
    async create(@Payload() createRegionDto: CreateRegionDto) {
        return await this.regionService.create(createRegionDto);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.REGION_FIND_ALL })
    async getAll() {
        return await this.regionService.findAll();
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.REGION_FIND_BY_ID })
    async getById(@Payload('id') id: number) {
        return await this.regionService.findOne(id);
    }
}