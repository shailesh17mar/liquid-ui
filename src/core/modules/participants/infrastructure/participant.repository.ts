import { MutableModel, ModelInit } from "@aws-amplify/datastore";
import { DataStore } from "aws-amplify";
import { Persons as Person } from "models";
import { ParticipantRepository } from "./participant-repository.interface";

export class ParticipantRepositoryImpl implements ParticipantRepository {
  async getAllByProjectId(projectId: string): Promise<Person[]> {
    const participants = await DataStore.query(Person);
    return participants;
  }

  async getById(id: string): Promise<Person | undefined> {
    const story = await DataStore.query(Person, id);
    return story;
  }

  async create(participant: MutableModel<Person>): Promise<Person> {
    const newParticipant = await DataStore.save(participant);
    return newParticipant;
  }

  async update(
    id: string,
    participant: Partial<ModelInit<Person>>
  ): Promise<Person | undefined> {
    const original = await DataStore.query(Person, id);
    if (original) {
      const updatedParticipant = await DataStore.save(
        Person.copyOf(original, (updated) => {
          updated.name = participant.name;
          updated.email = participant.email;
          updated.business = participant.business;
          updated.persona = participant.persona;
        })
      );
      return updatedParticipant;
    }
  }

  async delete(id: string): Promise<void> {
    const participant = await DataStore.query(Person, id);
    if (participant) await DataStore.delete(participant);
  }
}
