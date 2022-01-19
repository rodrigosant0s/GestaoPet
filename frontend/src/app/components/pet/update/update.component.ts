import { ShowSnackBarService } from './../../../services/showSnackBar.service';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router'
import { PetService } from '../../../services/pet.service';

import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})

export class UpdatePetComponent implements OnInit {


  isDisabled = false;

  pet: Pet = {
    id: 0,
    animal_type: "",
    name: ""
  }


  constructor(
    private service: PetService,
    private serviceSnackBar: ShowSnackBarService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id") || "";
    this.service.getPetById(id).subscribe(res => {
      this.pet = res;
    })
  }


  update(): void {
    this.service.updatePet(this.pet).subscribe(() => {

      this.isDisabled = true;
      setTimeout(() => {
        this.serviceSnackBar.openSucessSnackBar('Pet atualizado com sucesso!')
        this.router.navigate(["/pet/read"]);
      }, 1000);
    })
  }

  cancel(): void {
    this.router.navigate(["/pet/read"])
  }

}
