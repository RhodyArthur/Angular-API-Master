import { Component, OnInit } from '@angular/core';
import { ApiClientServiceService } from '../../services/api-client-service.service';
import { Data } from '../../interface/data';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements OnInit {

  posts$!: Observable<Data[]>;
  loading:boolean = false;
  currentPage:number = 1;
  pageSize:number = 10;
  totalPosts:number = 100;

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
    this.posts$ = this.apiService.getPosts(this.currentPage, this.pageSize); 
    // this.posts$.subscribe(data => this.totalPosts = 100);
    
  }

  // handle pagination
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPosts();
    console.log(page)
  }

  // view post details
  viewPost(postId: number) {
    this.router.navigate(['/details', postId])
  }
  }
