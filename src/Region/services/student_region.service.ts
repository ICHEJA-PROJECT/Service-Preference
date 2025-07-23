import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { StudentRegionRepositoryImpl } from "../data/repositories/student_region.reposiotry.impl";
import { StudentRegionRepository } from "../domain/repositories/StudentRegionRepository";
import { CreateStudentRegionDto } from "../data/dtos/create-student-region.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class StudentRegionService {
    constructor(@Inject(StudentRegionRepositoryImpl) private readonly studentRegionRepository: StudentRegionRepository) {}

    async create(createStudentRegionDto: CreateStudentRegionDto) {
        try {
            return await this.studentRegionRepository.create(createStudentRegionDto);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByStudent(studentId: number) {
        try {
            return await this.studentRegionRepository.findByStudent(studentId);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByStudentOnlyIds(studentId: number) {
        try {
            return await this.studentRegionRepository.findByStudentOnlyIds(studentId);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByRegionOnlyIds(regionId: number) {
        try {
            return await this.studentRegionRepository.findByRegionOnlyIds(regionId);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}