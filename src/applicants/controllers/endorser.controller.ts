import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateEndorserDto } from '../dtos/endorser-create.dto';
import { EndorserService } from '../services';
import { PaginationParamsDto } from 'src/common/dtos';

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

  @Get('available/:term')
  searchAvailable(@Param('term') term: string) {
    return this.endorserService.searchAvailable(term);
  }
}
