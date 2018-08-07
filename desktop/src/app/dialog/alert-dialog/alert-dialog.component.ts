import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
    selector: 'alert-dialog',
    templateUrl: './alert-dialog.component.html',
    styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {
    private dataToDel: Object = {};
    private alert: any;
    constructor(
        public dialogRef: MatDialogRef<AlertDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.dataToDel = data;
    }

    ngOnInit() {
        this.alert = this.dialogRef.componentInstance.data;
    }

    close() {
        this.dialogRef.close();
    }
}
