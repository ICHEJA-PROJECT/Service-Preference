import { CreateStudentImpairmentDto } from "src/Impairments/data/dtos/create-student-impairment.dto";
import { StudentImpairmentI } from "../entitiesI/StudentImpairmentI";

export interface StudentImpairmentRepository {
    create(createStudentImpairmentDto: CreateStudentImpairmentDto): Promise<StudentImpairmentI>;
    findAll(): Promise<StudentImpairmentI[]>;
    findByStudent(studentId: number): Promise<string[]>;
    findByStudentOnlyIds(studentId: number): Promise<StudentImpairmentI[]>;
    findByImpairmentOnlyIds(impairmentIdd: number): Promise<StudentImpairmentI[]>;
    findByStudentWithDetails(studentId: number): Promise<any>;
}