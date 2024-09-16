import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  // define pagination state
  @Input() currentPage:number = 1;
  @Input() pageSize:number = 10;
  @Input() totalPosts:number = 0;

  @Output() pageChange = new EventEmitter<number>();


  // get total pages
  get totalPages(): number {
    return Math.ceil(this.totalPosts / this.pageSize)
  }

  // go to page
  onPageChange(page: number) {
    if(page >= 1 && page <= this.totalPages){
      this.pageChange.emit(page);
    }
  }
}
