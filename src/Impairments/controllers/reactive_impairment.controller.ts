import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ReactiveImpairmentService } from "../services/reactive_impairment.service";
import { CreateReactiveImpairmentDto } from "../data/dtos/create-reactive-impairment.dto";

@Controller('reactive-impairments')
export class ReactiveImpairmentController {
    constructor(private readonly reactiveImpairmentService: ReactiveImpairmentService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createReactiveImpairmentDto: CreateReactiveImpairmentDto) {
        return await this.reactiveImpairmentService.create(createReactiveImpairmentDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return await this.reactiveImpairmentService.findAll();
    }

    @Get('reactives/:id')
    @HttpCode(HttpStatus.OK)
    async findByReactive(@Param('id') reactiveId: number) {
        return await this.reactiveImpairmentService.findByReactive(reactiveId);
    }

    @Get('impairments/:id')
    @HttpCode(HttpStatus.OK)
    async findByImpairment(@Param('id') impairmentId: number) {
        return await this.reactiveImpairmentService.findeByImpairment(impairmentId);
    }
}