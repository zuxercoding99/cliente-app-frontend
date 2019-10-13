import { Component, OnInit } from '@angular/core';
import { Factura } from '../factura';
import { FacturaService } from '../services/factura.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css'],
})
export class DetalleFacturaComponent implements OnInit {
  factura: Factura;
  constructor(private facturaService: FacturaService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let facturaId: number = +params.get('id');
      if (facturaId) {
        this.facturaService.findById(facturaId).subscribe((factura: Factura) => {
          this.factura = factura;
        });
      }
    });
  }
}
