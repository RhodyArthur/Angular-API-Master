import { Component } from '@angular/core';
import { Data, Comment } from '../../interface/data';
import { forkJoin } from 'rxjs';
import { ApiClientServiceService } from '../../services/api-client-service.service';
import { CommentsService } from '../../services/comments.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router
  ) {}

  post!: Data;
  comments: Comment[] = [];
  postId!:number;
  loading:boolean = false;
  error: string | null = null;

ngOnInit() {
  // get id of selected post and use for routing
  this.route.paramMap.subscribe(params => {
    this.postId = +params.get('id')!;

    this.loadPostDetails();
  });

}

  // load post details
  loadPostDetails() {
    this.loading = true;
    if(this.postId) {
      // fetch post details and its comments
      forkJoin([
        this.apiService.getPostById(this.postId),
        this.commentService.getPostComments(this.postId)
      ])
      .subscribe({
        next: ([post, comments]) => {
            this.post = post;
            this.comments = comments;
            this.loading = false;
            this.error = null;

        }, 
        error: err => {
          this.error = 'Failed to fetch post details';
          this.loading = false;
        }
    })
    }
  }


  // navigate to edit page
  navigateToEdit(postId: number) {
    this.router.navigate(['/edit', postId]);
  }

  //delete selected post
  deletePost(postId: number) {
    this.apiService.deletePost(postId)
      .subscribe({
        next: () => {
          this.loading = false;
          this.loadPostDetails();
          this.router.navigate(['']);
        },
        error: (error) => {
          // Handle error
          console.error('Error deleting post:', error);
          this.error = 'Failed to delete post';
          this.loading = false;
        }
      });
  }
}
