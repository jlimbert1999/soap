import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicantService, EndorserService, OrganizationService } from './services';
import { ApplicantController, EndorserController, OrganizationController } from './controllers';
import { Applicant, ApplicantSchema, Endorser, EndorserSchema, Organization, OrganizationSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
      { name: Endorser.name, schema: EndorserSchema },
      { name: Applicant.name, schema: ApplicantSchema },
    ]),
  ],
  controllers: [OrganizationController, EndorserController, ApplicantController],
  providers: [OrganizationService, EndorserService, ApplicantService],
})
export class ApplicantsModule {}
