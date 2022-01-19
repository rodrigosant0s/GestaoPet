import { Component, OnInit } from '@angular/core';
import { PetService } from '../../../services/pet.service';

import { Pet } from '../../../models/pet.model';

import compareById from 'src/app/utils/SortById';



@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})

export class ReadPetComponent implements OnInit {

  constructor(private service: PetService) { }


  petsData: Pet[] = [];
  displayedColumns = ['id', 'animal_type', 'name', 'action'];


  ngOnInit(): void {
    this.service.getPets().subscribe(res => {
      this.petsData = res.sort(compareById);
    })
  }
}
