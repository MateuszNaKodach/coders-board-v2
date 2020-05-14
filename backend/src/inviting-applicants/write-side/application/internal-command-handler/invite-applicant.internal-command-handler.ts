import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TIME_PROVIDER } from '@coders-board-library/time-provider';
import { TimeProviderPort } from '../../../../shared-kernel/write-side/domain/time-provider.port';
import {
  APPLICANT_INVITATION_REPOSITORY,
  ApplicantInvitationRepository,
} from '../../domain/applicant-invitation.repository';
import { ApplicantInvitation } from '../../domain/applicant-invitation.aggregate-root';
import { ApplicantInvitationId } from '../../domain/applicant-invitation-id.valueobject';
import { PersonalEmail } from '../../domain/personal-email.valueobject';
import { FirstName } from '../../domain/first-name.value-object';
import { LastName } from '../../domain/last-name.value-object';
import { InviteApplicant } from '../internal-command/invite-applicant.internal-command';

@CommandHandler(InviteApplicant)
export class InviteApplicantInternalCommandHandler implements ICommandHandler<InviteApplicant> {
  constructor(
    @Inject(TIME_PROVIDER) private readonly timeProvider: TimeProviderPort,
    @Inject(APPLICANT_INVITATION_REPOSITORY)
    private readonly repository: ApplicantInvitationRepository,
  ) {}

  async execute({ applicantInvitationId, firstName, lastName, personalEmail }: InviteApplicant): Promise<void> {
    const invitation = new ApplicantInvitation(this.timeProvider);
    const id = ApplicantInvitationId.of(applicantInvitationId);
    invitation.forApplicant(id, {
      personalEmail: PersonalEmail.from(personalEmail),
      firstName: FirstName.from(firstName),
      lastName: LastName.from(lastName),
    });
    return this.repository.save(invitation).then();
  }
}
