import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-post-dialog',
  templateUrl: './delete-post-dialog.component.html',
  styleUrls: ['./delete-post-dialog.component.scss']
})
export class DeletePostDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  returnNo() {
    this.dialogRef.close(false);
  }

  returnYes() {
    this.dialogRef.close(true);
  }
}
