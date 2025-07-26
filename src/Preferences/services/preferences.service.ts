import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ExerciseOccupationService } from "src/Occupation/services/exercise_occupation.service";
import { StudentOccupationService } from "src/Occupation/services/student_occupation.service";
import { ExerciseRegionService } from "src/Region/services/exercise_region.service";
import { StudentRegionService } from "src/Region/services/student_region.service";

@Injectable()
export class PreferencesService {
    constructor(
        private readonly studentRegionService: StudentRegionService,
        private readonly studentOccupationService: StudentOccupationService,
        private readonly exerciseRegionService: ExerciseRegionService,
        private readonly exerciseOccupationService: ExerciseOccupationService,
    ) {}

    async getByStudent(studentId: number) {
        try {
            const studentRegionsIds = await this.studentRegionService.findByStudentOnlyIds(studentId);
            const studentOccupationsIds = await this.studentOccupationService.findByStudentOnlyIds(studentId);

            const exercisesRegionIds = await this.exerciseRegionService.findByRegionsOnlyIds(studentRegionsIds);
            const exercisesOccupationIds = await this.exerciseOccupationService.findByOccupationsOnlyIds(studentOccupationsIds);

            const setExercisesOccupation = new Set(exercisesOccupationIds);
            return exercisesRegionIds.filter(id => setExercisesOccupation.has(id));
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}