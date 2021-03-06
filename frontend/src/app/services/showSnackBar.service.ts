import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ShowSnackBarService {

  constructor(private snackBar: MatSnackBar) { }

openSucessSnackBar(msg: string): void {

  this.snackBar.open(msg, '✖', {
      duration: 3000, 
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
    })
  }


openFailureSnackBar(msg: string): void {

  this.snackBar.open(msg,  '✖', {
    duration: 3000, 
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['red-snackbar'],
  })
}
}