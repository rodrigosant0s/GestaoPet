import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router'

import { Spending } from 'src/app/models/spending.model';
import { SpendingService } from 'src/app/services/spending.service';
import { ShowSnackBarService } from './../../../services/showSnackBar.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteSpendingComponent implements OnInit {

  isDisabled = false;

  outlay: Spending = {
    id: 0,
    title: '',
    cost: null,
    pet: 'default'
  };

  constructor(
    private service: SpendingService,
    private serviceSnackBar: ShowSnackBarService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id") || "";

    this.service.getSpendingById(id).subscribe((res) => {
      this.outlay = res;
    })
  }


  delete() {
    this.service.deleteSpending(String(this.outlay.id)).subscribe(() => {

      this.isDisabled = true;
      setTimeout(() => {
        this.serviceSnackBar.openSucessSnackBar('Gasto excluído com sucesso!')
        this.router.navigate(['/spending/read']);
      }, 300);
    });
  };

  cancel(): void {
    this.router.navigate(['/spending/read'])
  };
}
