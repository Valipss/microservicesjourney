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
  user: User | undefined;
  post!: Post;
  title: string = '';
  body: string = '';
  image!: File;
  isUserPost: boolean = false;
  showEdit: boolean = false;
  from!: string;
  mode: 'view' | 'edit' | 'create' = 'view';
  isLoading: boolean = true;

  constructor(private router: Router,
              private postService: PostService,
              private userService: UserService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
    const postId = this.route.snapshot.paramMap.get('id');
    const navigation = this.router.getCurrentNavigation();
    if (postId && postId != 'create') {
      if (navigation?.extras?.state && 'post' in navigation.extras.state) {
        this.post = (this.router.getCurrentNavigation()?.extras.state as { post: Post }).post;
        this.isLoading = false;
      } else {
        this.postService.getPost(postId!).then((post) => {
          this.post = post;
          this.userService.getUser().then((user) => {
            this.user = user;
            this.isUserPost = this.post.userId === this.user?.id;
          });
          this.isLoading = false;
        });
      }
    } else {
      this.isLoading = false;
    }
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (this.router.url.includes('edit')) {
        this.showEdit = false;
        this.mode = 'edit';
      } else if (this.router.url.includes('create')) {
        this.showEdit = false;
        this.mode = 'create';
      } else {
        this.showEdit = this.isUserPost;
      }
      this.from = this.router.url.split('?')[1]?.split('from=')[1];
    });
  }

  async createPost(event: Post) {
    await this.postService.createPost(event);
  }

  async editPost(event: Post) {
    await this.postService.editPost(event);
  }

  async deletePost(event: string) {
    await this.postService.deletePost(event);
    this.router.navigate([this.from ? this.from : 'dashboard']);
  }
}
