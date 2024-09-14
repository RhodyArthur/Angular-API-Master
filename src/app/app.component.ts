import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiClientServiceService } from './services/api-client-service.service';
import { Comment, Data } from './interface/data';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from "./components/posts-list/posts-list.component";
import { CommentsService } from './services/comments.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PostsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'api-master';

  constructor(private commentService: CommentsService,
    private apiService: ApiClientServiceService
  ) {}

  posts: Data[] = [];
  comments: Comment[] = [];

ngOnInit() {
  combineLatest([
    this.commentService.getComments(),
    this.apiService.getPosts()
  ]).subscribe(([comments, posts]) => {
    console.log('Comments:', comments); // Debugging statement
    console.log('Posts:', posts);      // Debugging statement

    this.comments = comments;
    this.posts = posts;
    this.getPostComments(this.posts, this.comments);
  });
}


  // get posts comments
  getPostComments(posts: Data[], comments: Comment[]) {

    posts.forEach(post => {
      let postComments = comments.filter(comment => comment.postId === post.id)
      console.log(`Comments for post ID ${post.id}:`, postComments.map(comment => comment.body));
    })
  }

}
