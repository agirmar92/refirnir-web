import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <mat-progress-spinner
      *ngIf="shouldSpin"
      class="spinner"
      color="primary"
      mode="indeterminate"
      [diameter]="size" >
    </mat-progress-spinner>
  `,
  styles: [
    '.spinner { margin: auto; }'
  ]
})
export class SpinnerComponent implements OnInit {

  @Input() shouldSpin: boolean;
  @Input() size: number;

  constructor() { }

  ngOnInit() {
    this.size = this.size || 50;
  }

}
