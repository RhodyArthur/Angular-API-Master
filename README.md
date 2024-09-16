# ApiMaster

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.


## Key Features

- **API Client Service:** Handles GET, POST, PUT, and DELETE requests to the JSONPlaceholder API with proper error handling and retry logic.

- **Components:**
  - **Post List:** Displays a paginated list of posts.
  - **Post Details:** Shows a single post with comments.
  - **Create Post:** Allows users to create a new post.
  - **Edit Post:** Allows users to edit an existing post.

- **Error Handling:** Provides user-friendly messages and handles network issues and API errors.

- **HTTP Interceptor:** Adds mock authentication tokens to requests and logs HTTP transactions.

- **Pagination:** Implements paginated data fetching with a reusable pagination component.

- **Caching:** Caches GET requests for improved performance and includes a method to clear the cache.

- **Environment Configuration:** Supports multiple environments with different API URLs and build configurations.

- **Lazy Loading:** Uses Angular’s lazy loading feature to load the post detail module only when needed.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
