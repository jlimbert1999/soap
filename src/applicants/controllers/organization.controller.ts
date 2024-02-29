import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrganizationService } from '../services';
import { CreateOrganizationDto } from '../dtos';

@Controller('organizations')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post()
  create(@Body() organization: CreateOrganizationDto) {
    return this.organizationService.create(organization);
  }

  @Get()
  findAll() {
    return this.organizationService.findAll();
  }
}
