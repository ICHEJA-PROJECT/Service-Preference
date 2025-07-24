import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { PreferencesService } from "../services/preferences.service";

@Controller('preferences')
export class PreferencesController {
    constructor(private readonly preferencesService: PreferencesService) {}

    @Get('students/:id')
    @HttpCode(HttpStatus.OK)
    async getByStudent(@Param('id') studentId: number) {
        return await this.preferencesService.getByStudent(studentId);
    }
    
}