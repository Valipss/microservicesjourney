import {Component, ElementRef, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DeletePostDialogComponent} from "../delete-post-dialog/delete-post-dialog.component";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() title!: string;
  @Input() content!: string;
  @Input() imageUrl?: string;
  @Input() isUserPost!: boolean;
  @Input() showEdit!: boolean;
  @Input() isEdition: boolean = false;
  @Input() isCreate: boolean = false;
  @Input() fromFeed!: boolean;

  isSubmit: boolean = false;
  createOrEditPostForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  @HostListener('click', ['$event.target'])
  onClick(_: any) {
    if (this.showEdit) {
      this.router.navigate(['/post/:id'], {
        queryParams: {
          'from': this.fromFeed ? 'feed' : 'dashboard'
        }
      });
    }
  }

  @HostBinding('class.cursor-pointer') get className() { return this.showEdit; }

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog,
              private elementRef: ElementRef) {
    this.isCreate = router.url.includes('create');
  }

  ngOnInit(): void {
    this.createOrEditPostForm.patchValue({
      title: this.title,
      content: this.content
    });
  }

  openLinkCopiedSnackBar(e: Event) {
    e.stopImmediatePropagation();
    this.snackBar.open('Post link copied in the clipboard !', '', {
      duration: 4000,
      panelClass: ['success-snackbar']
    });
  }

  openDeleteSnackbar(e: any, id: string) {
    e.stopImmediatePropagation();

    let ref = this.dialog.open(DeletePostDialogComponent);
    ref.afterClosed().subscribe(isConfirm => {
      if (isConfirm) {
        if (this.router.url === '/dashboard' || this.router.url === '/feed') {
          this.elementRef.nativeElement.classList.add('d-none');
          this.snackBar.open('The post has been deleted', '', {
            duration: 4000,
            panelClass: ['danger-snackbar']
          });
        } else {
          this.router.navigate([this.fromFeed ? 'feed' : 'dashboard']).then(() => {
            this.snackBar.open('The post has been deleted', '', {
              duration: 4000,
              panelClass: ['danger-snackbar']
            });
          });
        }
      }
    });


  }

  openSaveModifSnackBar(e: Event) {
    e.stopImmediatePropagation();
    this.isSubmit = true;
    if (this.createOrEditPostForm.valid) {
      this.snackBar.open('The modifications has been saved', '', {
        duration: 4000,
        panelClass: ['success-snackbar']
      });
    }
  }

  navToPostEdition() {
    this.router.navigate(['/post/edit/:id'], {
      queryParams: {
        'from': this.fromFeed ? 'feed' : 'dashboard'
      }
    });
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
  }
}
