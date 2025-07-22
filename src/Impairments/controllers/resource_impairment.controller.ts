import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ResourceImpairmentService } from "../services/resource_impairment.service";
import { CreateResourceImpairmentDto } from "../data/dtos/create-resource-impairment.dto";

@Controller('resource-impairments')
export class ResourceImpairmentController {
    constructor(private readonly resourceImpairmentService: ResourceImpairmentService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createResourceImpairmentDto: CreateResourceImpairmentDto) {
        return await this.resourceImpairmentService.create(createResourceImpairmentDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return await this.resourceImpairmentService.findAll();
    }

    @Get('resources/:id')
    @HttpCode(HttpStatus.OK)
    async findByResource(@Param('id') resourceId: number) {
        return await this.resourceImpairmentService.findByResource(resourceId);
    }

    @Get('impairments/:id')
    @HttpCode(HttpStatus.OK)
    async findByImpairment(@Param('id') impairmentId: number) {
        return await this.resourceImpairmentService.findByImpairment(impairmentId);
    }
}