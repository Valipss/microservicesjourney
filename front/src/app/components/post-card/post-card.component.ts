import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DeletePostDialogComponent} from "../delete-post-dialog/delete-post-dialog.component";
import {Post} from "../../models/post";
import {Clipboard} from "@angular/cdk/clipboard"

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
    @Input() post!: Post;
    @Input() isUserPost!: boolean;
    @Input() showEdit!: boolean;
    @Input() mode: 'view' | 'edit' | 'create' = 'view';
    @Input() isCreate: boolean = false;
    @Input() fromFeed!: boolean;
    @Output() emitEdition: EventEmitter<Post> = new EventEmitter<Post>();
    @Output() emitCreation: EventEmitter<Post> = new EventEmitter<Post>();
    @Output() emitDeletion: EventEmitter<string> = new EventEmitter<string>();

    imageUrl!: string;
    imageHash : string | undefined = undefined;
    image!: File;
    isSubmit: boolean = false;
    createOrEditPostForm = new FormGroup({
        title: new FormControl('', Validators.required),
        body: new FormControl('', Validators.required)
    });

    @HostListener('click', ['$event.target'])
    onClick(_: any) {
        if (this.mode !== 'create') {
            this.router.navigate(['/post/' + this.post.id], {
                state: {
                    post: this.post
                },
                queryParams: {
                    'from': this.fromFeed ? 'feed' : 'dashboard'
                }
            });
        }
    }

    @HostBinding('class.cursor-pointer') get className() {
        return this.mode !== 'create';
    }

    constructor(private snackBar: MatSnackBar,
                private router: Router,
                private dialog: MatDialog,
                private elementRef: ElementRef,
                private clipboard: Clipboard) {
        this.isCreate = router.url.includes('create');
    }

    ngOnInit(): void {
        this.imageHash = this.post && this.post.image ? 'http://localhost:3001/' + this.post.image.hash : undefined;
        this.createOrEditPostForm.patchValue({
            title: this.post ? this.post.title : '',
            body: this.post ? this.post.body : ''
        });
    }

    openLinkCopiedSnackBar(e: Event) {
        e.stopImmediatePropagation();
        this.clipboard.copy('http://localhost:4200/post/' + this.post.id);
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
                    this.elementRef.nativeElement.classList.add('d-none');
                    this.emitDeletion.emit(this.post.id);
                } else {
                    this.emitDeletion.emit(this.post.id);
                }
            }
        });
    }

    openSaveModifSnackBar(e: Event) {
        e.stopImmediatePropagation();
        this.isSubmit = true;

        if (this.createOrEditPostForm.valid) {
            this.mode === 'edit' ? this.emitEdition.emit({...this.createOrEditPostForm.getRawValue(), file: this.image, id: this.post.id}) :
                                   this.emitCreation.emit({...this.createOrEditPostForm.getRawValue(), file: this.image});
        }
    }

    navToPostEdition() {
        this.router.navigate(['/post/edit/' + this.post.id], {
            state: {
                post: this.post
            },
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
