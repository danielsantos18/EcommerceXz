import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product/product-detail/product-detail.component';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  available: boolean;
  category: string; // "men", "women", "kids", "accessories"
  subcategory: string; // "tshirt", "pants", etc.
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  images: string[] = [
    'assets/images/Hombre/camisa1.jpg',
    'assets/images/Hombre/camisa2.jpg',
    'assets/images/Hombre/niño.jpg',
    'assets/images/Hombre/pantalon1.jpg'
  ]; // Ruta de las imágenes del carrusel

  currentImageIndex: number = 0;
  isImageChanging: boolean = false;
  private imageChangeInterval: any; // Para guardar el intervalo
  direction: 'left' | 'right' = 'right'; // Dirección del deslizamiento

  constructor(private _matDialog: MatDialog) {}

  ngOnInit() {
    // Iniciar el cambio automático de imágenes
    this.startAutoImageChange();
  }

  ngOnDestroy() {
    // Limpiar el intervalo cuando el componente se destruya
    if (this.imageChangeInterval) {
      clearInterval(this.imageChangeInterval);
    }
  }

  //===================MODAL======================================
  openModal(product: Product): void {
    const dialogRef = this._matDialog.open(ProductDetailComponent, {
      width: '700px',
      data: product // Pasamos el producto al modal
    });
  }

  // Cambiar imagen hacia la izquierda
  previousImage() {
    this.direction = 'left';  // Cambiar la dirección a izquierda
    if (this.currentImageIndex > 0) {
      this.isImageChanging = true;
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.images.length - 1; // Volver a la última imagen
    }
    setTimeout(() => this.isImageChanging = false, 500); // Animación de 0.5s
  }

  // Cambiar imagen hacia la derecha
  nextImage() {
    this.direction = 'right';  // Cambiar la dirección a derecha
    if (this.currentImageIndex < this.images.length - 1) {
      this.isImageChanging = true;
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0; // Volver a la primera imagen
    }
    setTimeout(() => this.isImageChanging = false, 500); // Animación de 0.5s
  }

  // Función que se activa cuando se mueve el slider
  onSliderChange(event: any) {
    this.isImageChanging = true;
    this.currentImageIndex = event.target.value;
    setTimeout(() => this.isImageChanging = false, 500); // Temporizador para animación
  }

  // Iniciar el cambio automático de imágenes
  startAutoImageChange() {
    this.imageChangeInterval = setInterval(() => {
      this.nextImage(); // Llamar a nextImage() que ahora maneja el ciclo continuo
    }, 5000); // Cambiar cada 5 segundos
  }

  // Ir directamente a la imagen correspondiente cuando se hace clic en un punto
  goToImage(index: number) {
    this.isImageChanging = true;
    this.currentImageIndex = index;
    setTimeout(() => this.isImageChanging = false, 500); // Temporizador para animación
  }

  // Productos de ejemplo
  products: Product[] = [
    { id: 1, name: 'Camiseta Hombre', price: 29.99, image: 'assets/images/Hombre/camisa1.jpg', description: 'Camiseta de algodón', available: true, category: 'men', subcategory: 'tshirt' },
    { id: 2, name: 'Pantalones Mujer', price: 49.99, image: 'assets/images/Mujer/3.jpg', description: 'Pantalones de mezclilla', available: false, category: 'women', subcategory: 'pants' },
    { id: 3, name: 'Camiseta Niño', price: 19.99, image: 'assets/images/Hombre/niño.jpg', description: 'Camiseta divertida', available: true, category: 'kids', subcategory: 'tshirt' },
    { id: 4, name: 'Accesorios Hombre', price: 15.99, image: 'assets/images/Hombre/accesorio.jpg', description: 'Accesorio de moda', available: true, category: 'accessories', subcategory: 'accessory' },
    { id: 5, name: 'Camiseta Mujer', price: 25.99, image: 'assets/images/Mujer/camisa1.webp', description: 'Camiseta de verano', available: true, category: 'women', subcategory: 'tshirt' },
  ];

  filteredProducts: Product[] = [...this.products];
  showProductDetail = false;
  selectedProduct: Product | null = null;
  selectedCategory: string | null = null;
  selectedSubcategory: string | null = null;
  openFilters: boolean = false;

  searchProducts(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query) &&
      (this.selectedCategory ? product.category === this.selectedCategory : true) &&
      (this.selectedSubcategory ? product.subcategory === this.selectedSubcategory : true)
    );
  }

  filterProducts(category: string, subcategory?: string): void {
    this.selectedCategory = category;
    this.selectedSubcategory = subcategory || null;
    this.filteredProducts = this.products.filter(product =>
      (category ? product.category === category : true) &&
      (subcategory ? product.subcategory === subcategory : true)
    );
  }

  viewProductDetail(product: Product): void {
    this.selectedProduct = product;
    this.showProductDetail = true;
  }

  closeProductDetail(): void {
    this.showProductDetail = false;
    this.selectedProduct = null;
  }

  addToCart(product: Product): void {
    console.log("Producto agregado al carrito:", product);
  }

  toggleFilters(): void {
    this.openFilters = !this.openFilters;
  }
}
