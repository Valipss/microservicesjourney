import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DeletePostDialogComponent} from "../delete-post-dialog/delete-post-dialog.component";
import {Post} from "../../models/post";
import {Clipboard} from "@angular/cdk/clipboard"
import {UserService} from "../../services/user.service";
import {PostService} from "../../services/post.service";
import * as moment from "moment";
import {Comment} from "../../models/comment";
import {User} from "../../models/user";

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
    @ViewChild('comments') comments: ElementRef | undefined;
    @Input() post!: Post;
    @Input() isUserPost!: boolean;
    @Input() showEdit!: boolean;
    @Input() mode: 'view' | 'edit' | 'create' = 'view';
    @Input() isCreate: boolean = false;
    @Input() fromFeed!: boolean;
    @Output() emitEdition: EventEmitter<Post> = new EventEmitter<Post>();
    @Output() emitCreation: EventEmitter<Post> = new EventEmitter<Post>();
    @Output() emitDeletion: EventEmitter<string> = new EventEmitter<string>();

    username: string | null = null;
    date: string | null = null;
    currentUser: User | undefined;

    imageUrl: string | undefined = undefined;
    imageHash: string | undefined = undefined;
    image!: File;
    isSubmit: boolean = false;
    createOrEditPostForm = new FormGroup({
        title: new FormControl('', Validators.required),
        body: new FormControl('', Validators.required)
    });
    commentForm = new FormGroup({
        text: new FormControl('', [Validators.required])
    });

    @HostListener('click', ['$event.target'])
    onClick(_: any) {
        if (this.mode !== 'create' && this.mode !== "edit") {
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
        return this.mode !== 'create' && this.mode !== "edit";
    }

    constructor(private snackBar: MatSnackBar,
                private router: Router,
                private dialog: MatDialog,
                private elementRef: ElementRef,
                private clipboard: Clipboard,
                private userService: UserService,
                private postService: PostService) {
        this.isCreate = router.url.includes('create');
    }

    async ngOnInit() {
        this.imageHash = this.post && this.post.image ? 'http://localhost:3001/' + this.post.image.hash : undefined;
        this.createOrEditPostForm.patchValue({
            title: this.post ? this.post.title : '',
            body: this.post ? this.post.body : ''
        });
        this.username = await this.getPostAuthor(this.post?.userId);
        this.currentUser = await this.userService.getUser();
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
                    this.emitDeletion.emit(this.post?.id);
                } else {
                    this.emitDeletion.emit(this.post?.id);
                }
            }
        });
    }

    openSaveModifSnackBar(e: Event) {
        e.stopImmediatePropagation();
        this.isSubmit = true;

        if (this.createOrEditPostForm.valid) {
            this.mode === 'edit' ? this.emitEdition.emit({
                    ...this.createOrEditPostForm.getRawValue(),
                    file: this.image,
                    id: this.post.id
                }) :
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

    async getPostAuthor(id: string) {
        let user = await this.userService.getUserById(id);

        return user?.lastname + ' ' + user?.firstname;
    }

    async submitComment() {
        const value = this.commentForm.get('text')?.value;
        const comment: Comment = await this.postService.addComment(this.post?.id, value);
        this.post.comments?.push({
            ...comment,
            // @ts-ignore
            user: {
                id: this.currentUser?.id,
                firstname: this.currentUser?.firstname,
                lastname: this.currentUser?.lastname,
            },
        });
        this.commentForm.reset();
    }

    getDate(createdAt: string) {
        return moment(new Date(createdAt)).format('LLL')
    }

    deleteImage() {
        this.imageHash = undefined;
        this.imageUrl = undefined;
    }

    deleteComment(event: any, id: string) {
        event.stopImmediatePropagation();
        this.post.comments = this.post?.comments?.filter(comment => (comment.id !== id));
        console.log(event.target.parentElement.parentElement.classList.add('d-none'));
        this.postService.deleteComment(id);
    }
}
