import { Controller } from "@nestjs/common";
import { CreateStudentImpairmentDto } from "../data/dtos/create-student-impairment.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";
import { StudentImpairmentService } from "../services/student_impairment.service";

@Controller('students-impairments')
export class StudentImpairmentController {
    constructor(private readonly studentImpairmentService: StudentImpairmentService) {}

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_IMPAIRMENT_CREATE })
    async create(@Payload() createStudentImpairmentDto: CreateStudentImpairmentDto) {
        return await this.studentImpairmentService.create(createStudentImpairmentDto);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_IMPAIRMENT_FIND_ALL })
    async getAll() {
        return await this.studentImpairmentService.findAll();
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_IMPAIRMENT_FIND_BY_IMPAIRMENT_ONLY_IDS })
    async getByImpairmentOnlyIds(@Payload('id') impairmentId: number) {
        return await this.studentImpairmentService.findByImpairmentOnlyIds(impairmentId);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_IMPAIRMENT_FIND_BY_STUDENT_ONLY_IDS })
    async getByStudentOnlyIds(@Payload('id') studentId: number) {
        return await this.studentImpairmentService.findByStudentOnlyIds(studentId);
    }

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_IMPAIRMENT_FIND_BY_STUDENT })
    async getByStudent(@Payload('id') studentId: number) {
        return await this.studentImpairmentService.findByStudent(studentId);
    }
}