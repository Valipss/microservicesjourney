import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Post} from "../../models/post";
import {PostService} from "../../services/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../models/user";

@Component({
  selector: 'app-post.page',
  templateUrl: './post.page.component.html',
  styleUrls: ['./post.page.component.scss']
})
export class PostPageComponent implements OnInit {
  user!: User;
  post!: Post;
  title: string = '';
  body: string = '';
  image!: File;
  isUserPost: boolean = true;
  showEdit: boolean = true;
  from!: string;
  mode: 'view' | 'edit' | 'create' = 'view';

  constructor(private router: Router,
              private userService: UserService,
              private route: ActivatedRoute,
              private postService: PostService,
              private snackBar: MatSnackBar) {}

  async ngOnInit() {
    this.user = await this.userService.getUser();
    this.route.paramMap.subscribe(async params => {
      if (this.router.url.includes('edit')) {
        this.showEdit = false;
        this.mode = 'edit';

        const postId = this.route.snapshot.paramMap.get('id');
        this.post = await this.postService.getPost(postId!);
      } else if (this.router.url.includes('create')) {
        this.showEdit = false;
        this.mode = 'create';
      } else {
        //TODO get the fact that the post belong to the user
        this.showEdit = true;
      }
      this.from = this.router.url.split('?')[1]?.split('from=')[1];
    });
  }

  async createPost(event: Post) {
    await this.postService.createPost(event);
  }

  editPost(event: any) {
    this.snackBar.open('The modifications has been saved', '', {
      duration: 4000,
      panelClass: ['success-snackbar']
    });
  }
}
