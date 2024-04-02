import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { EndorserService } from '../services';
import { PaginationParamsDto } from 'src/common/dtos';
import { UpdateEndorserDto, CreateEndorserDto } from '../dtos';

@Controller('endorsers')
export class EndorserController {
  constructor(private endorserService: EndorserService) {}

  @Get()
  findAll(@Query() params: PaginationParamsDto) {
    return this.endorserService.findAll(params);
  }

  @Get('search/:term')
  search(@Param('term') term: string, @Query() params: PaginationParamsDto) {
    return this.endorserService.search(term, params);
  }

  @Post()
  create(@Body() organization: CreateEndorserDto) {
    return this.endorserService.create(organization);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() organization: UpdateEndorserDto) {
    return this.endorserService.update(id, organization);
  }

  @Get('available/:term')
  searchAvailable(@Param('term') term: string) {
    return this.endorserService.searchAvailable(term);
  }
}
