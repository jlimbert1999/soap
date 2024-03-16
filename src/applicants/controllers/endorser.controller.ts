import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEndorserDto } from '../dtos/endorser-create.dto';
import { EndorserService } from '../services';

@Controller('endorsers')
export class EndorserController {
  constructor(private endorserService: EndorserService) {}

  @Get()
  findAll() {
    return this.endorserService.findAll();
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
