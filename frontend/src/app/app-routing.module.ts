import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePetComponent } from './components/pet/create/create.component';
import { UpdatePetComponent } from './components/pet/update/update.component';
import { ReadPetComponent } from './components/pet/read/read.component';
import { DeletePetComponent } from './components/pet/delete/delete.component';

import { CreateSpendingComponent } from './components/spending/create/create.component';
import { DeleteSpendingComponent } from './components/spending/delete/delete.component';
import { UpdateSpendingComponent } from './components/spending/update/update.component';
import { ReadSpendingComponent } from './components/spending/read/read.component';

import { ChartComponent } from './components/chart/chart.component'

const routes: Routes = [

  { path: "", component: CreatePetComponent },
  { path: "pet/create", component: CreatePetComponent },
  { path: "pet/read", component: ReadPetComponent },
  { path: "pet/update/:id", component: UpdatePetComponent },
  { path: "pet/delete/:id", component: DeletePetComponent },

  { path: "spending/create", component: CreateSpendingComponent },
  { path: "spending/read", component: ReadSpendingComponent },
  { path: "spending/delete/:id", component: DeleteSpendingComponent },
  { path: "spending/update/:id", component: UpdateSpendingComponent},

  { path: "chart", component: ChartComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
