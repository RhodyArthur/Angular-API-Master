import { Component, OnInit } from '@angular/core';
import { ApiClientServiceService } from '../../services/api-client-service.service';
import { Data } from '../../interface/data';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements OnInit {

  posts$!: Observable<Data[]>;
  loading:boolean = false;

  constructor(private apiService: ApiClientServiceService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loading = false;
  }

  // load all posts
  loadPosts() {
    this.loading = true;
    this.posts$ = this.apiService.getPosts(); 
  }

// view post details
  viewPost(postId: number) {
    this.router.navigate(['/details', postId])
  }
}
