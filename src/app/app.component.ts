import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from "./components/posts-list/posts-list.component";
import { PostDetailsComponent } from "./components/post-details/post-details.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PostsListComponent, PostDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'api-master';

 

}
