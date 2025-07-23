import { CreateStudentRegionDto } from "src/Region/data/dtos/create-student-region.dto";
import { StudentRegionI } from "../entitiesI/StudentRegionI";

export interface StudentRegionRepository {
    create(createStudentRegionDto: CreateStudentRegionDto): Promise<StudentRegionI>;
    findByStudent(studentId: number): Promise<StudentRegionI[]>;
    findByStudentOnlyIds(studentId: number): Promise<number[]>;
    findByRegionOnlyIds(regionId: number): Promise<number[]>;
}