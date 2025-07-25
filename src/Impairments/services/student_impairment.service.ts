import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { StudentImpairmentRepositoryImpl } from "../data/repositories/student_impairment.repository.impl";
import { StudentImpairmentRepository } from "../domain/repositories/StudentImpairmentRepository";
import { CreateStudentImpairmentDto } from "../data/dtos/create-student-impairment.dto";
import { RpcException } from "@nestjs/microservices";
import { LearningPathImpairmentService } from "./learning_path_impairment.service";
import { ImpairmentService } from "./impairment.service";

@Injectable()
export class StudentImpairmentService {
    constructor(
        @Inject(StudentImpairmentRepositoryImpl) private readonly studentImpairmentRepository: StudentImpairmentRepository,
        private readonly impairmentService: ImpairmentService,
        private readonly learningPathImpairmentService: LearningPathImpairmentService
    ) {}

    async create(createStudentImpairmentDto: CreateStudentImpairmentDto) {
        try {
            const studentImpairment = await this.studentImpairmentRepository.create(createStudentImpairmentDto);
            return studentImpairment;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll() {
        try {
            const studentsImpairments = await this.studentImpairmentRepository.findAll();
            return studentsImpairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByStudent(studentId: number) {
        try {
            const impairments = await this.studentImpairmentRepository.findByStudent(studentId);
            return impairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByStudentOnlyIds(studentId: number) {
        try {
            const impairments = await this.studentImpairmentRepository.findByStudentOnlyIds(studentId);
            return impairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByImpairmentOnlyIds(impairmentId: number) {
        try {
            const students = await this.studentImpairmentRepository.findByImpairmentOnlyIds(impairmentId);
            return students;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByStudentWithDetails(studentId: number) {
        try {
            const impairmentId = await this.studentImpairmentRepository.findByStudentWithDetails(studentId);
            const impairment = await this.impairmentService.findOne(impairmentId);
            const learningPath = await this.learningPathImpairmentService.findByImpairment(impairmentId);

            console.log(learningPath);

            return {
                impairmentId,
                impairmentName: impairment.name,
                learningPathId: learningPath[0]
            }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}