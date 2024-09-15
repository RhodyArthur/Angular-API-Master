import { Component } from '@angular/core';
import { Data, Comment } from '../../interface/data';
import { forkJoin } from 'rxjs';
import { ApiClientServiceService } from '../../services/api-client-service.service';
import { CommentsService } from '../../services/comments.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent {
  constructor(private commentService: CommentsService,
    private apiService: ApiClientServiceService,
    private route: ActivatedRoute,
  ) {}

  post!: Data;
  comments: Comment[] = [];
  postId!:number;

ngOnInit() {
  // get id of selected post and use for routing
  this.route.paramMap.subscribe(params => {
    this.postId = +params.get('id')!;
    this.loadPostDetails();
  });


  
}

  // load post details
  loadPostDetails() {
    if(this.postId) {
      // fetch post details and its comments
      forkJoin([
        this.apiService.getPostById(this.postId),
        this.commentService.getPostComments(this.postId)
      ])
      .subscribe(([post, comments]) => {
        this.post = post;
        this.comments = comments;
        console.log('post', post)
        console.log('comments', comments)
      })
    }
  }

}
