import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { OrganizationService } from '../services';
import { CreateOrganizationDto, UpdateOrganizationDto } from '../dtos';
import { PaginationParamsDto } from 'src/common/dtos';

@Controller('organizations')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post()
  create(@Body() organization: CreateOrganizationDto) {
    return this.organizationService.create(organization);
  }

  @Get()
  findAll(@Query() params: PaginationParamsDto) {
    return this.organizationService.findAll(params);
  }

  @Get('search/:term')
  search(@Param('term') term: string, @Query() params: PaginationParamsDto) {
    return this.organizationService.search(term, params);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() organization: UpdateOrganizationDto) {
    return this.organizationService.update(id, organization);
  }

  @Get('available/:term')
  searchAvailable(@Param('term') term: string) {
    return this.organizationService.searchAvailable(term);
  }
}
