import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentRegionRepository } from "src/Region/domain/repositories/StudentRegionRepository";
import { StudentRegionEntity } from "../entities/student_region.entity";
import { Repository } from "typeorm";
import { StudentRegionI } from "src/Region/domain/entitiesI/StudentRegionI";
import { CreateStudentRegionDto } from "../dtos/create-student-region.dto";
import { RpcException } from "@nestjs/microservices";
import { RegionEntity } from "../entities/region.entity";

@Injectable()
export class StudentRegionRepositoryImpl implements StudentRegionRepository {
    constructor(
        @InjectRepository(StudentRegionEntity) 
        private readonly studentRegionRepository: Repository<StudentRegionEntity>,
        @InjectRepository(RegionEntity)
        private readonly regionRepository: Repository<RegionEntity>,
    ) {}

    async create(createStudentRegionDto: CreateStudentRegionDto): Promise<StudentRegionI> {
        try {
            const region = await this.regionRepository.findOneOrFail({ where: { id: createStudentRegionDto.regionId } });
            const studentRegion = this.studentRegionRepository.create({
                ...createStudentRegionDto,
                region: region,
            });
            return await this.studentRegionRepository.save(studentRegion);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByStudent(studentId: number): Promise<StudentRegionI[]> {
        try {
            return await this.studentRegionRepository.find({ where: { studentId }, relations: ['region'] });
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
            
        }
    }

    async findByStudentOnlyIds(studentId: number): Promise<number[]> {
        try {
            return await this.studentRegionRepository.find({ where: { studentId } })
                .then((regions) => regions.map((region) => region.regionId));
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

    async findByRegionOnlyIds(regionId: number): Promise<number[]> {
        try {
            return await this.studentRegionRepository.find({ where: { regionId } })
                .then((regions) => regions.map((region) => region.studentId));
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }

}