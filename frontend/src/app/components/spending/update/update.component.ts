import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Spending } from 'src/app/models/spending.model';
import { SpendingService } from './../../../services/spending.service';
import { ShowSnackBarService } from './../../../services/showSnackBar.service';



@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateSpendingComponent implements OnInit {

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


  update() {
    this.service.updateSpending(this.outlay).subscribe(() => {

      this.isDisabled = true;
      setTimeout(() => {
        this.serviceSnackBar.openSucessSnackBar('Gasto Atualizado com sucesso!')
        this.router.navigate(["/spending/read"]);
      }, 1000);
    });
  }


  cancel(): void{
    this.router.navigate(['/spending/read'])
  };

}
