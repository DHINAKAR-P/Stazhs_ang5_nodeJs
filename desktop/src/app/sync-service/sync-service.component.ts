import { Component, OnInit } from '@angular/core';
import { SyncService } from './sync-service.service';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-sync-service',
  templateUrl: './sync-service.component.html',
  styleUrls: ['./sync-service.component.css']
})
export class SyncServiceComponent implements OnInit {

  // sliderValue(arg0: any, arg1: any): any {
  //   throw new Error("Method not implemented.");
  // }
  constructor(private syncService: SyncService, private dailog: MatDialog) { }

  private frequency: any;

  private time: number;

  private enable: boolean;
  private sliderValue: Number;

  ngOnInit() {
    // this.enable=false
    this.timeFrequency();
    // this.sliderValue = 50;
  }

  timeFrequency() {
    this.syncService.getFrequency().subscribe(
      data => {
        console.log('success to frequency --- ', data);
        this.frequency = data;
        this.sliderValue = data.value;
      },
      error => {
        // if (error.status === 404) {
          this.OpenDialog();
        // }
        console.log('something went wrong');
      }
    );
  }
  OpenDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.position = {
      bottom: '18%',
    };
    dialogConfig.direction = 'rtl';
    dialogConfig.data = 'Sync-Service is Down';
    const dialogRef = this.dailog.open(AlertDialogComponent, dialogConfig);
  }

  updateTime() {
    console.log('testing update time values are ------ ', this.sliderValue);
    this.frequency.value = this.sliderValue;
    this.syncService.updateFrequency(this.frequency).subscribe(
      data => {
        console.log('success updated', data);
        this.enable = false;
      },
      error => {
        console.log('something went wrong');
      }
    );
  }

}

export interface DialogPosition {
  /** Override for the dialog's top position. */
  top?: '50%';

  /** Override for the dialog's bottom position. */
  bottom?: '50%';

  /** Override for the dialog's left position. */
  // left?: string;

  /** Override for the dialog's right position. */
  // right?: string;
}

