import { CreateStudentOccupationDto } from "src/Occupation/data/dtos/create-student-occupation.dto";
import { StudentOccupationI } from "../entitiesI/StudentOccupationI";

export interface StudentOccupationRepository {
    create(createStudentOccupationDto: CreateStudentOccupationDto): Promise<StudentOccupationI>;
    findByStudent(studentId: number): Promise<StudentOccupationI[]>;
    findByStudentOnlyIds(studentId: number): Promise<number[]>;
    findByOccupationOnlyIds(occupationId: number): Promise<number[]>;
}