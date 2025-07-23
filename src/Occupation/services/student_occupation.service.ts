import { Injectable, Inject, HttpStatus } from "@nestjs/common";
import { StudentOccupationRepositoryImpl } from "../data/repositories/student_occupation.repository.impl";
import { StudentOccupationRepository } from "../domain/repositories/StudentOccupationRepository";
import { CreateStudentOccupationDto } from "../data/dtos/create-student-occupation.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class StudentOccupationService {
    constructor(@Inject(StudentOccupationRepositoryImpl) private readonly studentOccupationRepository: StudentOccupationRepository) {}

    async create(createStudentOccupationDto: CreateStudentOccupationDto) {
        try {
            return await this.studentOccupationRepository.create(createStudentOccupationDto);
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
            
        }
    }

    async findByStudent(studentId: number) {
        try {
            return await this.studentOccupationRepository.findByStudent(studentId);
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }

    async findByStudentOnlyIds(studentId: number) {
        try {
            return await this.studentOccupationRepository.findByStudentOnlyIds(studentId);
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }

    async findByOccupationOnlyIds(occupationId: number) {
        try {
            return await this.studentOccupationRepository.findByOccupationOnlyIds(occupationId);
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }
}