import { Module } from "@nestjs/common";
import { OccupationModule } from "src/Occupation/occupation.module";
import { RegionModule } from "src/Region/region.module";
import { PreferencesController } from "./controllers/preferences.controller";
import { PreferencesService } from "./services/preferences.service";

@Module({
    imports: [
        OccupationModule,
        RegionModule,
    ],
    controllers: [PreferencesController],
    providers: [PreferencesService]
})
export class PreferencesModule {}