import { Component } from '@angular/core';
import { ApiClientServiceService } from '../../services/api-client-service.service';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent {

  constructor(private apiService: ApiClientServiceService) {}
}
