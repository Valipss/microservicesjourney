import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-post.page',
  templateUrl: './post.page.component.html',
  styleUrls: ['./post.page.component.scss']
})
export class PostPageComponent implements OnInit {
  isUserPost: boolean = true;
  showEdit: boolean = true;
  from!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.showEdit = false;
    }
    this.from = this.router.url.split('?')[1].split('from=')[1];
  }

}
