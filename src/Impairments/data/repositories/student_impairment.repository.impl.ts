import { InjectRepository } from "@nestjs/typeorm";
import { StudentImpairmentRepository } from "src/Impairments/domain/repositories/StudentImpairmentRepository";
import { Repository } from "typeorm";
import { StudentImpairmentEntity } from "../entities/student_impairment.entity";
import { StudentImpairmentI } from "src/Impairments/domain/entitiesI/StudentImpairmentI";
import { CreateStudentImpairmentDto } from "../dtos/create-student-impairment.dto";
import { RpcException } from "@nestjs/microservices";
import { HttpStatus, Injectable } from "@nestjs/common";
import { ImpairmentEntity } from "../entities/impairment.entity";

@Injectable()
export class StudentImpairmentRepositoryImpl implements StudentImpairmentRepository {
    constructor(
        @InjectRepository(StudentImpairmentEntity) private readonly studentImpairmentRepository: Repository<StudentImpairmentEntity>,
        @InjectRepository(ImpairmentEntity) private readonly impairmentRepository: Repository<ImpairmentEntity>
    ) {}

    async create(createStudentImpairmentDto: CreateStudentImpairmentDto): Promise<StudentImpairmentI> {
        try {
            const impairment = await this.impairmentRepository.findOne({where:{id: createStudentImpairmentDto.impairmentId}});
            if(!impairment) throw new RpcException({
                message: "Discapacidad solicitada no registrada",
                status: HttpStatus.NOT_FOUND
            });

            const studentImpairment = this.studentImpairmentRepository.create({
                impairment: impairment,
                impairmentId: createStudentImpairmentDto.impairmentId,
                studentId: createStudentImpairmentDto.studentId
            });

            return await this.studentImpairmentRepository.save(studentImpairment);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll(): Promise<StudentImpairmentI[]> {
        try {
            const studentsImpairments = await this.studentImpairmentRepository.find({relations: ['impairment']});
            return studentsImpairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByStudentOnlyIds(studentId: number): Promise<StudentImpairmentI[]> {
        try {
            const studenImpairments = await this.studentImpairmentRepository
                .createQueryBuilder('si')
                .select('si.impairmentId', 'impairmentId')
                .where('si.studentId = :id', { id: studentId})
                .getRawMany()
                .then(results => results.map((studentImpairment) => studentImpairment.impairmentId));
            return studenImpairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByImpairmentOnlyIds(impairmentId: number): Promise<StudentImpairmentI[]> {
        try {
            const students = await this.studentImpairmentRepository
                .createQueryBuilder('si')
                .select('si.studentId', 'studentId')
                .where('si.impairmentId = :id', {id: impairmentId})
                .getRawMany()
                .then(results => results.map((studentImpairment) => studentImpairment.studentId));
            return students;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByStudent(studentId: number): Promise<string[]> {
        try {
            const impairments = await this.studentImpairmentRepository
                .find({
                    where:{ studentId },
                    relations: ['impairment']
                })
                .then(results => results.map(result => result.impairment.name));
            return impairments;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findByStudentWithDetails(studentId: number): Promise<StudentImpairmentI> {
        try {
            const impairment = await this.studentImpairmentRepository.findOneOrFail({where: {studentId}, relations: {impairment: {learningPaths: true}}});
            return impairment;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}