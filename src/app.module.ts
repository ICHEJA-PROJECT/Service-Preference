import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envsValues } from './core/getEnvs';
import { ImpairmentModule } from './Impairments/impairment.module';
import { WordModule } from './Words/word.module';
import { OccupationModule } from './Occupation/occupation.module';
import { RegionModule } from './Region/region.module';
import { PreferencesModule } from './Preferences/preferences.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envsValues.DB_HOST,
      port: envsValues.DB_PORT,
      password: envsValues.DB_PASSWORD,
      username: envsValues.DB_USERNAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      database: envsValues.DB_NAME,
      synchronize: true,
      logging: true
    }),
    ImpairmentModule,
    WordModule,
    OccupationModule,
    RegionModule,
    PreferencesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}