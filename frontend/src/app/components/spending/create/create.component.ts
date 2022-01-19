import { ShowSnackBarService } from './../../../services/showSnackBar.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'

import { Pet } from '../../../models/pet.model';
import { PetService } from './../../../services/pet.service';

import { Spending } from 'src/app/models/spending.model';
import { SpendingService } from 'src/app/services/spending.service';

import compareByName from 'src/app/utils/SortByName';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})


export class CreateSpendingComponent implements OnInit {

  isDisabled = false;

  sucessMsg = "Gasto registrado com sucesso!";
  failureMsg = "Não foi possivel registrar o gasto";

  pets: Pet[] = []

  outlay: Spending = {
    title: '',
    cost: null,
    pet: 'default'
  };


  constructor(
    private router: Router,
    private PetService: PetService,
    private SpendingService: SpendingService,
    private serviceSnackBar: ShowSnackBarService,
  ) { }

  ngOnInit(): void {
    this.PetService.getPets().subscribe((res) => {
      this.pets = res.sort(compareByName);
    })
  }

  create() {
    const result = this.SpendingService.createSpending({
      title: this.outlay.title,
      cost: this.outlay.cost,
      pet: <Pet>this.outlay.pet,
    });

    this.isDisabled = true;
    setTimeout(() => {
      if (result instanceof Error) {
        this.serviceSnackBar.openFailureSnackBar(this.failureMsg)
        this.isDisabled = false;

      } else {

        this.serviceSnackBar.openSucessSnackBar(this.sucessMsg);

        this.outlay = {
          title: '',
          cost: null,
          pet: 'default'
        }

        this.isDisabled = false;

      }
    }, 500);
  };

  cancel(): void {
    this.router.navigate(['/spending/read'])
  };

}
