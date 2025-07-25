import { Controller } from "@nestjs/common";
import { OccupationService } from "../services/occupation.service";
import { CreateOccupationDto } from "../data/dtos/create-occupation.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";

@Controller('occupations')
export class OccupationController {
    constructor(private readonly occupationService: OccupationService) {}
    
    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.OCCUPATION_CREATE })
    async create(@Payload()createOccupationDto: CreateOccupationDto) {
        return await this.occupationService.create(createOccupationDto);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.OCCUPATION_FIND_ALL })
    async findAll() {
        return await this.occupationService.findAll();
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.OCCUPATION_FIND_BY_ID })
    async findOne(@Payload('id') id: number) {
        return await this.occupationService.findOne(id);
    }
    
}
