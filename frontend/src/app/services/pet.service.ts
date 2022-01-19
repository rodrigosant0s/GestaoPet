import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


import { Pet } from '../models/pet.model';



@Injectable({
  providedIn: 'root'
})

export class PetService {

  constructor(private _http:HttpClient) { }


  baseUrl = 'http://localhost:3000/pet';
  



  getPets():Observable<Pet[]> {
    return this._http.get<Pet[]>(`${this.baseUrl}`);
  }
  
  getPetById(id: string):Observable<Pet> {
    return this._http.get<Pet>(`${this.baseUrl}/${id}`)
  }

  createPet(data: Pet) {

    const error = {
      animal_type: '',
      name: '',
    }

    const dataReq = {
      animal_type: data.animal_type ? data.animal_type.trim() : (error.animal_type = 'Selecione um Animal!'),
      name: data.name ? data.name.trim() : (error.name = 'Nome inválido!'),
    }

    
    if(error.animal_type !== '') {
      return new Error(error.animal_type);
    }
    if(error.name !== '') {
      return new Error(error.name);
    }

    return this._http.post<Pet>(this.baseUrl, dataReq).subscribe();
  }
  

  deletePet(id: string | undefined) {
    return this._http.delete<Pet>(`${this.baseUrl}/${id}`);
  }

  updatePet(data: Pet) {
    const id = data.id;
    return this._http.put<Pet>(`${this.baseUrl}/${id}`, data);
  }

}

