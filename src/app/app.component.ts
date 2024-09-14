import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiClientServiceService } from './services/api-client-service.service';
import { Observable } from 'rxjs';
import { Data } from './interface/data';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from "./components/posts-list/posts-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PostsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'api-master';

  posts: Data[] = [];

  constructor(public apiService: ApiClientServiceService) {}

}
