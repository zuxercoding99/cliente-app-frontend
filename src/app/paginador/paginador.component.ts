import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
})
export class PaginadorComponent implements OnInit, OnChanges {
  @Input() paginador: any;
  paginas: number[];

  desde: number;
  hasta: number;

  constructor() {}

  ngOnInit() {
    this.initPagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updatedPaginator = changes['paginador'];
    if (updatedPaginator.previousValue) {
      this.initPagination();
    }
  }

  private initPagination(): void {
    if (this.paginador.totalPages > 5) {
      this.desde = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);
      this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);

      this.paginas = new Array(this.hasta - this.desde + 1)
        .fill(0)
        .map((value, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((value, index) => index + 1);
    }
  }
}
