import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiClientServiceService } from '../../services/api-client-service.service';
import { Data } from '../../interface/data';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  loading:boolean = false;
  error: string | null = null;
  post!: Data;
  postId!: number;
  
  postForm: FormGroup;
  
  constructor (private apiService: ApiClientServiceService,
                private storageService: StorageService,
                private fb: FormBuilder,
                private router: Router
  ) {
        this.postForm = fb.group({
          title: [ '', [Validators.required, Validators.minLength(3)]],
          body: ['', [Validators.required]]
        })
  }
  
  ngOnInit() {
  
  }
  
    // Save changes to the post
    send() {
      if (this.postForm.valid) {    
        const newPost: Data = {
          id: this.storageService.getNextUniqueId(),
          userId: 1,
          ...this.postForm.value
        };
    
        this.loading = true;

        this.apiService.createPost(newPost).subscribe({
          next: () => {
            this.post = newPost;
            this.clearForm();
            this.router.navigate(['']);
          },
          error: err => {
            this.error = 'Failed to create post';
          },

          complete: () => {
            this.loading = false;
          }
        });
  
        console.log(newPost);
      }
    }
    
  
    // Discard changes
    discard() {
      this.clearForm();
      this.router.navigate(['']);
    }

    // clear form
    clearForm() {
      this.postForm.reset();
    }
}
