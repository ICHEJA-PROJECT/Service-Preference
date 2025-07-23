import { Injectable, HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentOccupationI } from "src/Occupation/domain/entitiesI/StudentOccupationI";
import { StudentOccupationRepository } from "src/Occupation/domain/repositories/StudentOccupationRepository";
import { Repository } from "typeorm";
import { CreateStudentOccupationDto } from "../dtos/create-student-occupation.dto";
import { StudentOccupationEntity } from "../entities/student_occupation.entity";
import { OccupationEntity } from "../entities/occupation.entity";

@Injectable()
export class StudentOccupationRepositoryImpl implements StudentOccupationRepository {
    constructor(
        @InjectRepository(StudentOccupationEntity)
        private readonly studentOccupationRepository: Repository<StudentOccupationEntity>,
        @InjectRepository(OccupationEntity)
        private readonly occupationRepository: Repository<OccupationEntity>,
    ) {}

    async create(createStudentOccupationDto: CreateStudentOccupationDto): Promise<StudentOccupationI> {
        try {
            const occupation = await this.occupationRepository.findOne({
                where: { id: createStudentOccupationDto.occupationId },
            });
            if (!occupation) {
                throw new RpcException({
                    status: HttpStatus.NOT_FOUND,
                    message: "La ocupación asociada no existe",
                });
            }
            const studentOccupation = this.studentOccupationRepository.create({
                ...createStudentOccupationDto,
                occupation: occupation,
            });
            return await this.studentOccupationRepository.save(studentOccupation);
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
            
        }
    }
    findByStudent(studentId: number): Promise<StudentOccupationI[]> {
        try {
            return this.studentOccupationRepository.find({
                where: { studentId },
                relations: ['occupation'],
            });
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }

    findByStudentOnlyIds(studentId: number): Promise<number[]> {
        try {
            const occupationIds = this.studentOccupationRepository.createQueryBuilder("studentOccupation")
                .select("studentOccupation.occupationId")
                .where("studentOccupation.studentId = :studentId", { studentId })
                .getMany()
                .then(results => results.map(result => result.occupationId));

            return occupationIds;
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }

    findByOccupationOnlyIds(occupationId: number): Promise<number[]> {
        try {
            const studentIds = this.studentOccupationRepository.createQueryBuilder("studentOccupation")
                .select("studentOccupation.studentId")
                .where("studentOccupation.occupationId = :occupationId", { occupationId })
                .getMany()
                .then(results => results.map(result => result.studentId));

            return studentIds;
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
    }

}