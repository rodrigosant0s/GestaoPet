import { Component, OnInit } from '@angular/core';

import { SpendingService } from '../../../services/spending.service';
import { Spending } from '../../../models/spending.model';
import { PetService } from '../../../services/pet.service';

import compareById from 'src/app/utils/SortSpendingById';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})

export class ReadSpendingComponent implements OnInit {

  spendingData: Spending[] = [];
  spendingWithPetsData: Spending[] = [];
  displayedColumns = ['id', 'title', 'cost', 'pet', 'action'];

  constructor(
    private Spending: SpendingService,
    private Pet: PetService,
  ) { }

  ngOnInit(): void {

    this.Spending.getSpending().subscribe(res => {
      this.spendingData = res.sort(compareById);

      this.spendingData.map((spend, index) => {
        this.Pet.getPetById(String(spend.pet_id)).subscribe(pet => {
          this.spendingData[index].pet = pet!;

          if (index === this.spendingData.length - 1) {
            this.spendingWithPetsData = this.spendingData.sort(compareById)!;
          }
        })
      })
    })
  }
}
