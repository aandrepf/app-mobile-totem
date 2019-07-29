import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'app-confirm-dialog',
    template: `
        <p style="font-size: 20px;font-weight: 700;color: #cd0a2f;">{{ title }}</p>
        <hr/>
        <p style="font-size: 20px;color: #333;">{{ message }}</p>
        <hr/>
        <br/>
        <div style="float:right;width:100%">
            <button type="button" mat-button color="warn"
                (click)="dialogRef.close(false)">Cancel</button>
            <button type="button" mat-raised-button color="info"
                (click)="dialogRef.close(true)">OK</button>
        </div>
    `,
})
export class ConfirmDialogComponent {

    public title: string;
    public message: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {

    }
}
