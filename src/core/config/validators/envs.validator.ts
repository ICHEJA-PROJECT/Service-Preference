import * as Joi from "joi";
import { EnvsI } from "../domain/interfaces/EnvsI";

export const envsValidator = Joi.object<EnvsI>({
    PORT: Joi.number().required(),
    DB_NAME: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
}).unknown(true);