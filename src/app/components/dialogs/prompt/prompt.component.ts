import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-prompt',
  template: `
    <h2 mat-dialog-title>Afskráning <i class="material-icons">thumb_down</i></h2>
    <mat-dialog-content>Ertu viss um að þú viljir beila?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Já</button>
      <button mat-raised-button [mat-dialog-close]="false">Nei</button>
    </mat-dialog-actions>
  `,
  styles: [
    'h2 { position: relative }',
    'i { position: absolute; bottom: 3px; margin-left: 8px; }'
  ]
})
export class PromptComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PromptComponent>) { }

  ngOnInit() { }

  closeDialog() {
    this.dialogRef.close();
  }
}
