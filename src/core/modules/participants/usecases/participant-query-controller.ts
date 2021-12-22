import { ParticipantRepository } from "../infrastructure/participant-repository.interface";
import { Persons as Participant } from "models";

export class ParticipantsQueryController {
  constructor(private readonly participantRepository: ParticipantRepository) {}

  async getAllByProjectId(projectId: string): Promise<Participant[]> {
    const participants = await this.participantRepository.getAllByProjectId(
      projectId
    );
    return participants;
  }

  async getById(id: string): Promise<Participant | undefined> {
    const participant = await this.participantRepository.getById(id);
    return participant;
  }
}
