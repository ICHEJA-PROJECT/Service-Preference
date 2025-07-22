import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from "@nestjs/common";
import { StudentImpairmentRepositoryImpl } from "../data/repositories/student_impairment.repository.impl";
import { StudentImpairmentRepository } from "../domain/repositories/StudentImpairmentRepository";
import { CreateStudentImpairmentDto } from "../data/dtos/create-student-impairment.dto";
import { RpcException } from "@nestjs/microservices";

@Controller('students-impairments')
export class StudentImpairmentController {
    constructor(@Inject(StudentImpairmentRepositoryImpl) private readonly studentImpairmentRepository: StudentImpairmentRepository) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createStudentImpairmentDto: CreateStudentImpairmentDto) {
        return await this.studentImpairmentRepository.create(createStudentImpairmentDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.studentImpairmentRepository.findAll();
    }

    @Get('impairments/:id/ids')
    @HttpCode(HttpStatus.OK)
    async getByImpairmentOnlyIds(@Param('id') impairmentId: number) {
        return await this.studentImpairmentRepository.findByImpairmentOnlyIds(impairmentId);
    }

    @Get('students/:id/ids')
    @HttpCode(HttpStatus.OK)
    async getByStudentOnlyIds(@Param('id') studentId: number) {
        return await this.studentImpairmentRepository.findByStudentOnlyIds(studentId);
    }

    @Get('students/:id')
    @HttpCode(HttpStatus.OK)
    async getByStudent(@Param('id') studentId: number) {
        return await this.studentImpairmentRepository.findByStudent(studentId);
    }
}