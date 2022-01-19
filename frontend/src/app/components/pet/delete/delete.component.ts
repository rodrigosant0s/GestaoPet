import { ShowSnackBarService } from './../../../services/showSnackBar.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { PetService } from '../../../services/pet.service';

import { Pet } from '../../../models/pet.model';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeletePetComponent implements OnInit {

  isDisabled = false;

  sucessMsg = 'Pet excluído com sucesso!';

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
    const id = this.route.snapshot.paramMap.get('id') || "";

    this.service.getPetById(id).subscribe((res) => {
      this.pet = res;
    })
  };

  delete() {
    this.service.deletePet(String(this.pet.id)).subscribe(() => {

      this.isDisabled = true;
      setTimeout(() => {
        this.serviceSnackBar.openSucessSnackBar(this.sucessMsg);
        this.router.navigate(['/pet/read'])
      }, 300);
    });
  };

  cancel(): void {
    this.router.navigate(['/pet/read'])
  };


}
