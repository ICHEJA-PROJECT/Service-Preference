import { Controller } from "@nestjs/common";
import { StudentRegionService } from "../services/student_region.service";
import { CreateStudentRegionDto } from "../data/dtos/create-student-region.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";

@Controller('student-regions')
export class StudentRegionController {
    constructor(private readonly studentRegionService: StudentRegionService) {}

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_REGION_CREATE })
    async create(@Payload() createStudentRegionDto: CreateStudentRegionDto) {
        return await this.studentRegionService.create(createStudentRegionDto);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_REGION_FIND_BY_STUDENT_ONLY_IDS })
    async getIdsByStudentOnlyIds(@Payload('id') id: number) {
        return await this.studentRegionService.findByStudentOnlyIds(id);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_REGION_FIND_BY_STUDENT })
    async getByStudentId(@Payload('id') id: number) {
        return await this.studentRegionService.findByStudent(id);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_REGION_FIND_BY_REGION_ONLY_IDS })
    async getByRegionOnlyIds(@Payload('id') id: number) {
        return await this.studentRegionService.findByRegionOnlyIds(id);
    }
}