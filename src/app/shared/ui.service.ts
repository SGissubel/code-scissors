import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {

  constructor(private snackBar: MatSnackBar) {}

  showSnackbar(message, action, duration) {
    this.snackBar.open(message, action, {
          duration: duration
        });
  }

}
