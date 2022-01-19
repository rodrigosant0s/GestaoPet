import { Pet } from '../models/pet.model';

export default function compareById(a: Pet, b: Pet) {
  if (a.id! < b.id!) {
    return -1;
  }
  if (a.id! > b.id!) {
    return 1;
  }
  return 0;
}
