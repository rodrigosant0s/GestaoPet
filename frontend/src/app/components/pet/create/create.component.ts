import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router'

import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../models/pet.model';

import { ShowSnackBarService } from './../../../services/showSnackBar.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreatePetComponent implements OnInit {

  @ViewChild('firstInput') firstInput: any;
  @ViewChild('secondInput') secondInput: any;

  sucessMsg = "Pet registrado com sucesso!";
  failureMsg = "Não foi possível registrar o pet";

  isDisabled = false;

  pet: Pet = {
    animal_type: '',
    name: ''
  }


  myControl = new FormControl();
  options: string[] = ["Cachorro", "Gato", "Furão", "Cavalo", "Coelho", "Hamster", "Rato", "Camundongo", "Porquinho-da-índia", "Porco doméstico", "Piriquito", "Canário", "Caturra (Calopsita)", "Cacatua", "Papagaio", "Galinha (Galo)", "Peru", "Pato", "Arara", "Pardal doméstico", "Canário", "Trinca-Ferro", "Cágado", "Tartaruga", "Jabuti", "Lagarto (Iguana)", "Cobra (Serpente)", "Sapo", "Salamandra", "Peixe"].sort((a: string, b: string) => { if (a < b) { return -1; } if (a > b) { return 1; } return 0; });
  filteredOptions: Observable<string[]>;


  constructor(
    private service: PetService,
    private serviceSnackBar: ShowSnackBarService,
    private router: Router,
  ) { }



  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  enterEvent(event: any) {
    if (event.key === "Enter") {
      this.create();
      this.removeFocus();
    }
  }

  removeFocus() {
    this.firstInput.nativeElement.blur();
    this.secondInput.nativeElement.blur();
  }


  create() {
    const result = this.service.createPet(this.pet);
    this.isDisabled = true;

    setTimeout(() => {
      if (result instanceof Error) {
        this.serviceSnackBar.openFailureSnackBar(this.failureMsg)
        this.isDisabled = false;

      } else {
        this.serviceSnackBar.openSucessSnackBar(this.sucessMsg);

        this.pet = {
          animal_type: '',
          name: ''
        }

        this.isDisabled = false;
      }

    }, 500);
  }


  cancel(): void {
    this.router.navigate(['/pet/read'])
  };




}
