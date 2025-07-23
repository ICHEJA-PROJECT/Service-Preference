import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { StudentOccupationService } from "../services/student_occupation.service";
import { CreateStudentOccupationDto } from "../data/dtos/create-student-occupation.dto";

@Controller('student-occupations')
export class StudentOccupationController {
    constructor(private readonly studentOccupationService: StudentOccupationService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createStudentOccupationDto: CreateStudentOccupationDto) {
        return await this.studentOccupationService.create(createStudentOccupationDto);
    }

    @Get('students/:id/ids')
    @HttpCode(HttpStatus.OK)
    async findIdsByStudentOnlyIds(@Param('id') id: number) {
        return await this.studentOccupationService.findByStudentOnlyIds(id);
    }

    @Get('students/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: number) {
        return await this.studentOccupationService.findByStudent(id);
    }

    @Get('occupations/:id/ids')
    @HttpCode(HttpStatus.OK)
    async findIdsByOccupationOnlyIds(@Param('id') id: number) {
        return await this.studentOccupationService.findByOccupationOnlyIds(id);
    }
}