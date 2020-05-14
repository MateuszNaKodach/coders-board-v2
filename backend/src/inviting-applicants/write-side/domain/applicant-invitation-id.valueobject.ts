import { v4 as uuid } from 'uuid';
import { AggregateId } from '../../../shared-kernel/write-side/domain/aggregate-id.valueobject';

export class ApplicantInvitationId implements AggregateId {
  private readonly TYPE = 'ApplicantInvitationId';

  private constructor(readonly raw: string) {}

  static generate() {
    return new ApplicantInvitationId(uuid());
  }

  static of(raw: string) {
    return new ApplicantInvitationId(raw);
  }

  toString() {
    return this.raw;
  }
}
