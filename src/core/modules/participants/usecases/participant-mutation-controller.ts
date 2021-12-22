import { ParticipantRepository } from "../infrastructure/participant-repository.interface";
import { Persons as Participant } from "models";
import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export class ParticipantMutationController {
  constructor(private readonly participantRepository: ParticipantRepository) {}

  async createParticipant(
    participant: ModelInit<Participant>
  ): Promise<Participant> {
    return await this.participantRepository.create(participant);
  }

  async updateParticipant(
    id: string,
    participant: Partial<ModelInit<Participant>>
  ): Promise<Participant | undefined> {
    return await this.participantRepository.update(id, participant);
  }

  async deleteParticipant(id: string): Promise<void> {
    await this.participantRepository.delete(id);
  }
}
