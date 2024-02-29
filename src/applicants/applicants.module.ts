import { Module } from '@nestjs/common';
import { OrganizationService } from './services';
import { OrganizationController } from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { Organization, OrganizationSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class ApplicantsModule {}
