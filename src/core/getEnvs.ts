import 'dotenv/config';
import { EnvsI } from "./config/domain/interfaces/EnvsI";
import { envsValidator } from "./config/validators/envs.validator";

const getEnvs = (): EnvsI => {
    const { error, value } = envsValidator.validate({
        ...process.env,
    });

    if (error) {
        throw new Error(`Invalid enviroment variables: ${error.message}`);
    }

    return {
        PORT: value.PORT,
        DB_NAME: value.DB_NAME,
        DB_HOST: value.DB_HOST,
        DB_PORT: value.DB_PORT,
        DB_USERNAME: value.DB_USERNAME,
        DB_PASSWORD: value.DB_PASSWORD,
    };
};

export const envsValues = getEnvs();