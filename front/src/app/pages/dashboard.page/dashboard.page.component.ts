import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Post} from "../../models/post";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-dashboard.page',
  templateUrl: './dashboard.page.component.html',
  styleUrls: ['./dashboard.page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  posts: Post[] = [];
  maxPost!: number;
  user: User | undefined;
  postHasLoaded: boolean = false;

  constructor(private router: Router, private postService: PostService, private userService: UserService) { }

  async ngOnInit() {
    this.user = await this.userService.getUser();
    const posts = await this.postService.getUserPosts(0, 100);
    this.posts = [...posts];
    this.postHasLoaded = true;
    console.log(posts);
  }

  async deletePost(event: string) {
    await this.postService.deletePost(event);
  }
}
