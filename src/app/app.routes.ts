import { Routes } from '@angular/router';
import { PostsListComponent } from './components/posts-list/posts-list.component';

export const routes: Routes = [

    {
        // display post list
        path: '', component: PostsListComponent
    },

    {
        // lazy load post details
        path: 'details/:id',
        loadComponent: () => import('./components/post-details/post-details.component').then
        (m => m.PostDetailsComponent)
    },

    {
        path: 'edit/:id',
        loadComponent: () => import('./components/edit-post/edit-post.component').then
        (m => m.EditPostComponent)
    }
];
