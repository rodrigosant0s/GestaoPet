import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'
import { MatListModule }from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { PetService } from './services/pet.service';
import { HeaderComponent } from './components/template/header/header.component';
import { CreatePetComponent } from './components/pet/create/create.component';
import { ReadPetComponent } from './components/pet/read/read.component';
import { DeletePetComponent } from './components/pet/delete/delete.component';
import { UpdatePetComponent } from './components/pet/update/update.component';

import { CreateSpendingComponent } from './components/spending/create/create.component';
import { ReadSpendingComponent } from './components/spending/read/read.component';
import { DeleteSpendingComponent } from './components/spending/delete/delete.component';
import { UpdateSpendingComponent } from './components/spending/update/update.component';

import { ChartComponent } from './components/chart/chart.component';





@NgModule({
  declarations: [
    AppComponent,
    CreatePetComponent,
    ReadPetComponent,
    HeaderComponent,
    DeletePetComponent,
    UpdatePetComponent,
    CreateSpendingComponent,
    ReadSpendingComponent,
    DeleteSpendingComponent,
    UpdateSpendingComponent,
    ChartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    

  ],
  providers: [PetService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
