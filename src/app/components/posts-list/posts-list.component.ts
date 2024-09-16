import { Component, OnInit } from '@angular/core';
import { ApiClientServiceService } from '../../services/api-client-service.service';
import { Data } from '../../interface/data';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PaginationComponent } from "../pagination/pagination.component";
import { CreatePostComponent } from "../create-post/create-post.component";
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent, CreatePostComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements OnInit {

  posts$!: Observable<Data[]>;
  loading:boolean = false;
  error:string | null = null;
  currentPage:number = 1;
  pageSize:number = 10;
  totalPosts:number = 0;

  constructor(private apiService: ApiClientServiceService,
              private storageService: StorageService,
              private router: Router
  ) {}

  ngOnInit(): void {
    // this.posts$ = this.storageService.post$;
    this.loadPosts();
  }

  // load all posts
  loadPosts() {
    this.loading = true;
    this.posts$ = this.apiService.getPosts(this.currentPage, this.pageSize); 
    this.posts$.subscribe({
      next: data => {
        this.totalPosts = 150;
        this.error = null;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load posts, check your connection';
      }
    });
    
  }

  // handle pagination
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPosts();
  }

  // view post details
  viewPost(postId: number) {
    this.router.navigate(['/details', postId])
  }
  }
