import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post";
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-feed.page',
  templateUrl: './feed.page.component.html',
  styleUrls: ['./feed.page.component.scss']
})
export class FeedPageComponent implements OnInit {
  posts: Post[] = [];
  skip: number = 0;
  limit: number = 10;
  maxPost!: number;
  user: User |undefined;
  postHasLoaded: boolean = false;

  constructor(private router: Router, private postService: PostService, private userService: UserService) { }

  async ngOnInit() {
    this.user = await this.userService.getUser();
    const posts = await this.postService.getPosts(this.skip, this.limit);
    this.posts = [...posts.data.reverse()];
    this.postHasLoaded = true;
    console.log(posts);
  }


  async deletePost(event: string) {
    this.posts = this.posts.filter((post) => post.id != event);
    await this.postService.deletePost(event);
  }
}
