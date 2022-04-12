import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DeletePostDialogComponent} from "../delete-post-dialog/delete-post-dialog.component";

interface dataToSend {
    title: string,
    body: string,
}

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
    @Input() title!: string;
    @Input() body!: string;
    @Input() imageUrl?: string;
    @Input() isUserPost!: boolean;
    @Input() showEdit!: boolean;
    @Input() mode: 'view' | 'edit' | 'create' = 'view';
    @Input() isCreate: boolean = false;
    @Input() fromFeed!: boolean;
    @Output() emitEdition: EventEmitter<dataToSend> = new EventEmitter<dataToSend>();
    @Output() emitCreation: EventEmitter<dataToSend> = new EventEmitter<dataToSend>();

    image!: File;
    isSubmit: boolean = false;
    createOrEditPostForm = new FormGroup({
        title: new FormControl('', Validators.required),
        body: new FormControl('', Validators.required)
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

    @HostBinding('class.cursor-pointer') get className() {
        return this.showEdit;
    }

    constructor(private snackBar: MatSnackBar,
                private router: Router,
                private dialog: MatDialog,
                private elementRef: ElementRef) {
        this.isCreate = router.url.includes('create');
    }

    ngOnInit(): void {
        this.createOrEditPostForm.patchValue({
            title: this.title,
            body: this.body
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
            if (isConfirm === true) {
                if (this.router.url === '/dashboard' || this.router.url === '/feed') {
                    console.log('dd');
                    this.elementRef.nativeElement.classList.add('d-none');
                    //TODO delete post really
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
            this.mode === 'edit' ? this.emitEdition.emit({...this.createOrEditPostForm.getRawValue(), image: this.image}) : this.emitCreation.emit({...this.createOrEditPostForm.getRawValue(), image: this.image});
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
        console.log(imageInput);
        const file: File = imageInput.files[0];
        this.image = file;
        console.log(this.image);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.imageUrl = reader.result as string;
        };
    }
}
