import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { StudentRegionService } from "../services/student_region.service";
import { CreateStudentRegionDto } from "../data/dtos/create-student-region.dto";

@Controller('student-regions')
export class StudentRegionController {
    constructor(private readonly studentRegionService: StudentRegionService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createStudentRegionDto: CreateStudentRegionDto) {
        return await this.studentRegionService.create(createStudentRegionDto);
    }

    @Get('students/:id/ids')
    @HttpCode(HttpStatus.OK)
    async getIdsByStudentOnlyIds(@Param('id') id: number) {
        return await this.studentRegionService.findByStudentOnlyIds(id);
    }

    @Get('students/:id')
    @HttpCode(HttpStatus.OK)
    async getByStudentId(@Param('id') id: number) {
        return await this.studentRegionService.findByStudent(id);
    }

    @Get('regions/:id/ids')
    @HttpCode(HttpStatus.OK)
    async getByRegionOnlyIds(@Param('id') id: number) {
        return await this.studentRegionService.findByRegionOnlyIds(id);
    }
}