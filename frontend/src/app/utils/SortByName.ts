import { Pet } from '../models/pet.model';

export default function compareById(a: Pet, b: Pet) {
  if (a.name! < b.name!) {
    return -1;
  }
  if (a.name! > b.name!) {
    return 1;
  }
  return 0;
}
