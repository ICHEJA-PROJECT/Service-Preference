import { Controller } from "@nestjs/common";
import { StudentOccupationService } from "../services/student_occupation.service";
import { CreateStudentOccupationDto } from "../data/dtos/create-student-occupation.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";

@Controller('student-occupations')
export class StudentOccupationController {
    constructor(private readonly studentOccupationService: StudentOccupationService) {}

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_OCCUPATION_CREATE })
    async create(@Payload() createStudentOccupationDto: CreateStudentOccupationDto) {
        return await this.studentOccupationService.create(createStudentOccupationDto);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_OCCUPATION_FIND_BY_STUDENT_ONLY_IDS })
    async findIdsByStudentOnlyIds(@Payload('id') id: number) {
        return await this.studentOccupationService.findByStudentOnlyIds(id);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_OCCUPATION_FIND_BY_ID })
    async findById(@Payload('id') id: number) {
        return await this.studentOccupationService.findByStudent(id);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_OCCUPATION_FIND_BY_OCCUPATION_ONLY_IDS })
    async findIdsByOccupationOnlyIds(@Payload('id') id: number) {
        return await this.studentOccupationService.findByOccupationOnlyIds(id);
    }
}