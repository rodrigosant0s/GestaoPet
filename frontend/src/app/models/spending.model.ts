import { Pet } from "./pet.model";

export interface Spending {
  id?: number;
  title: string;
  cost: number | null;
  pet_id?: number;
  pet: Pet | string;
}

export interface SpendingRequest {
  title: string;
  cost: number | null;
  pet: Pet;
}
