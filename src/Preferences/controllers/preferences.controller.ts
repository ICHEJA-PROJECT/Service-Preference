import { Controller } from "@nestjs/common";
import { PreferencesService } from "../services/preferences.service";
import { PREFERENCES_SERVICE_OPTIONS } from "src/shared/constants/preferences_service_options";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller('preferences')
export class PreferencesController {
    constructor(private readonly preferencesService: PreferencesService) {}

    @MessagePattern({ cmd: PREFERENCES_SERVICE_OPTIONS.PREFERENCES_FIND_BY_STUDENT })
    async getByStudent(@Payload('id') studentId: number) {
        return await this.preferencesService.getByStudent(studentId);
    }
    
}