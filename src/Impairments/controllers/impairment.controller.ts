import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ImpairmentService } from "../services/impairment.service";
import { CreateImpairmentDto } from "../data/dtos/create-impairment.dto";

@Controller('impairments')
export class ImpairmentController {
    constructor(private readonly impairmentService: ImpairmentService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createImpairmentDto: CreateImpairmentDto) {
        return await this.impairmentService.create(createImpairmentDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.impairmentService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: number) {
        return await this.impairmentService.findOne(id);
    }
}