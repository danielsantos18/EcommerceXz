import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product/product-detail/product-detail.component';
import { Product } from '../../models/product.interface';
import { AuthService } from '../../core/auth.service';

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

  products: Product[] = []; // Lista de productos
  filteredProducts: Product[] = []; // Productos filtrados
  searchQuery: string = ''; // Cadena de búsqueda
  showProductDetail = false;
  selectedProduct: Product | null = null;
  selectedCategory: string | null = null;
  selectedSubcategory: string | null = null;
  openFilters: boolean = false;

  categories: string[] = [
    'Ropa de mujer', 'Ropa para hombre', 'Ropa de Playa', 'Ropa interior',
    'Niños', 'Zapatos', 'Pijamas', 'Accesorios'
  ];

  showCategories: boolean = false;

  constructor(
    private productService: ProductService, // Inyectamos el servicio
    private authService: AuthService,
    private _matDialog: MatDialog // Inyectamos el MatDialog
  ) { }

  ngOnInit() {
    // Cargar los productos desde el API
    this.loadProducts();

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
    // Llamamos al servicio para obtener los detalles del producto (si es necesario)
    this.productService.getProductDetail(product.id.toString()).subscribe({
      next: (response) => {
        if (response.status === 200) {
          console.log(response)
          const productDetail = response.data[0];  // Asumimos que la respuesta tiene este formato
          const dialogRef = this._matDialog.open(ProductDetailComponent, {
            maxWidth: '1500px',
            maxHeight: '1000px',
            height: 'auto',
            data: { product: productDetail }  // Pasamos el producto completo, incluyendo las categorías
          });
        } else {
          console.error('Error al obtener el producto', response.message);
        }
      },
      error: (error) => {
        console.error('Error al obtener el producto', error);
      }
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

  //cargar los productos
  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        if (response.status === 200) {
          // Primero, obtenemos los productos
          this.products = response.data;

          // Luego, parseamos las imágenes que están en formato JSON
          this.products.forEach((product: any) => {
            if (product.images) {
              product.images = JSON.parse(product.images);  // Convertimos la cadena JSON en un array
              console.log('Primera imagen:', product.images[0]);  // Esto debería mostrar solo la primera imagen
            }
          });

          // Inicializamos los productos filtrados
          this.filteredProducts = [...this.products];

          console.log(this.products);  // Imprimir productos con las imágenes ya parseadas
        } else {
          console.error('Error al cargar productos', response.message);
        }
      },
      error: (error) => {
        console.error('Error de conexión con la API', error);
      }
    });
  }

  getFirstImageUrl(product: Product): string | null {
    if (product.images && product.images.length > 0) {
      console.log(product.images[0]);
      return product.images[0];  // Devuelve la primera imagen del producto
    }
    return null;
  }

  // Filtrar productos según categoría y subcategoría
  filterProducts(category: string, subcategory?: string): void {
    this.selectedCategory = category;
    this.selectedSubcategory = subcategory || null;
    this.filteredProducts = this.products.filter(product =>
      (category ? category === category : true) &&
      (subcategory ? subcategory === subcategory : true)
    );
  }

  // Filtrar productos según la búsqueda
  searchProducts(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery = query;

    // Filtrar productos por nombre
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
  }

  // Ver detalles del producto
  viewProductDetail(product: Product): void {
    this.selectedProduct = product;
    this.showProductDetail = true;
  }

  // Cerrar el detalle del producto
  closeProductDetail(): void {
    this.showProductDetail = false;
    this.selectedProduct = null;
  }

  // Agregar producto al carrito
  addToCart(product: Product): void {
    console.log('Producto agregado al carrito:', product);
  }

  // Mostrar/ocultar filtros
  toggleFilters(): void {
    this.openFilters = !this.openFilters;
  }

  // Mostrar categorías al hacer hover sobre el botón
  toggleCategoriesDropdown(isHovering: boolean): void {
    this.showCategories = isHovering;
  }

  logout(): void {
    this.authService.logout();
  }
}
