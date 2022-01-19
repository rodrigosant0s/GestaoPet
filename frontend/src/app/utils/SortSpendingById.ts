import { Spending } from './../models/spending.model';

export default function compareById(a: Spending, b: Spending) {
  if (a.id! < b.id!) {
    return -1;
  }
  if (a.id! > b.id!) {
    return 1;
  }
  return 0;
}
