import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post";
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";

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

  constructor(private router: Router, private postService: PostService) { }

  async ngOnInit() {
    const post = await this.postService.getPost('21');
    console.log(post);
    const posts = await this.postService.getPosts(this.skip, this.limit);
    console.log(posts);
    this.posts = [...posts.data];
  }


  async loadMorePosts() {

  }
}
