import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Spending } from '../models/spending.model';
import { SpendingRequest } from '../models/spending.model';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {

  constructor(
    private _http: HttpClient,
  ) { }

  baseUrl = "http://localhost:3000/spending";



  getSpending():Observable<Spending[]> {
    return this._http.get<Spending[]>(`${this.baseUrl}`);
  }


  getSpendingById(id: string):Observable<Spending> {
      return this._http.get<Spending>(`${this.baseUrl}/${id}`);
  }


  createSpending(data: SpendingRequest) {

    const error = {
      title: '',
      cost: '',
      pet: '',
    };

      const dataReq = {
        title: data.title ? data.title.trim() : (error.title = 'titulo invalido'),
        cost: data.cost ? data.cost : (error.cost = 'preço invalido'),
        pet_id: typeof data.pet !== 'string' ? data.pet.id : (error.pet = 'Selecione um pet')
    }

    if (error.title !== '') {
      return new Error(error.title);
    }
    if (error.cost !== '') {
      return new Error(error.cost);
    }
    if (error.pet !== '') {
      return new Error(error.pet);
    }



    return this._http.post(`${this.baseUrl}`, dataReq).subscribe();
   
  }


  deleteSpending(id: string | undefined) {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }


  updateSpending(data: Spending):Observable<Spending> {
      const id = data.id;
      return this._http.put<Spending>(`${this.baseUrl}/${id}`, data);
  }
 
  
}
