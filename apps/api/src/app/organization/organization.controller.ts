import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Organization } from '@turbovets-challenge/data/entities/organization.entity';
import { CreateOrganizationDto } from '@turbovets-challenge/data/dtos/create-organization.dto';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(@Body() dto: CreateOrganizationDto): Promise<Organization> {
    return this.organizationService.create(dto);
  }

  @Get()
  findAll(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }
}
