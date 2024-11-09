import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del producto
  ) { }

  close(): void {
    this.dialogRef.close(); // Cierra el modal
  }

  addToCart(): void {
    console.log("Producto añadido al carrito:", this.data);
    this.dialogRef.close(); // Cierra el modal después de agregar al carrito
  }
}
