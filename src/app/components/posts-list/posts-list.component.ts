import { Component, OnInit } from '@angular/core';
import { ApiClientServiceService } from '../../services/api-client-service.service';
import { Data } from '../../interface/data';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements OnInit {

  posts$!: Observable<Data[]>

  constructor(private apiService: ApiClientServiceService) {}

  ngOnInit(): void {
    this.loadPosts()
  }

  // load all posts
  loadPosts() {
    this.posts$ = this.apiService.getPosts(); 
  }
}
