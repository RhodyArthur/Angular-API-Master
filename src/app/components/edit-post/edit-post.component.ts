import { Component } from '@angular/core';
import { Data } from '../../interface/data';
import { ApiClientServiceService } from '../../services/api-client-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent {
loading:boolean = false;
error: string | null = null;
post!: Data;
postId!: number;

postForm: FormGroup;

constructor (private apiService: ApiClientServiceService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router
) {
      this.postForm = fb.group({
        title: [this.post?.title || '', [Validators.required, Validators.minLength(3)]],
        body: [this.post?.body || '', [Validators.required]]
      })
}

ngOnInit() {
  // get id of selected post and use for routing
  this.route.paramMap.subscribe(params => {
    this.postId = +params.get('id')!;
    this.loadPost();
  });
}

// load post by id
loadPost() {
  this.loading = true;
  this.apiService.getPostById(this.postId)
  .subscribe({
    next: data => {
      this.post = data;
      this.loading = false;
      this.error = null;
       // Populate the form with post data
       this.postForm.patchValue({
        title: this.post.title,
        body: this.post.body
      });
    },
    error: err => {
      this.error = 'Failed to update post details after changes';
      this.loading = false;
    }
  })
}


  // Save changes to the post
  save() {
    if (this.postForm.valid) {
      this.loading = true;
  
      const updatedPost: Data = {
        id: this.postId,
        userId: this.post.userId,
        ...this.postForm.value
      };
  
      this.apiService.updatePost(updatedPost).subscribe({
        next: () => {
          this.loading = false;
          this.post = updatedPost;
          this.loadPost();
          this.router.navigate(['/details', this.postId]);
        },
        error: err => {
          this.error = 'Failed to save post';
          this.loading = false;
        }
      });

    }
  }
  

  // Discard changes
  discard() {
    this.router.navigate(['/details', this.postId]);
  }

}
