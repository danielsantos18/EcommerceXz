import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Product {
  name: string;
  description: string;
  price: number;
  categories: string[];
}

export interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class AppChipsComponent {
  displayedColumns: string[] = ['name', 'description', 'price', 'actions'];
  uploadedFileNames: string[] = [];
  imagePreviews: string[] = [];
  currentImageIndex: number = 0;
  currentCategory: string = '';
  searchQuery: string = '';

  products: Product[] = [
    { name: 'Producto A', description: 'Descripción A', price: 120, categories: ['Ropa', 'Zapatos'] },
    { name: 'Producto B', description: 'Descripción B', price: 150, categories: ['Electrónica'] },
  ];

  categories: Category[] = [
    { id: 1, name: 'Ropa' },
    { id: 2, name: 'Zapatos' },
    { id: 3, name: 'Accesorios' },
    { id: 4, name: 'Electrónica' },
  ];

  productCategoryMap = new Map<string, number[]>([
    ['Producto A', [1, 2]],
    ['Producto B', [4]],
  ]);

  productForm: FormGroup;
  filteredProducts: Product[] = [];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      category: [[], Validators.required],
    });

    this.filteredProducts = [...this.products];
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;

      // Agregar el nuevo producto
      this.products.push(newProduct);

      // Mapear categorías seleccionadas
      const selectedCategories: number[] = this.productForm.value.category;
      this.productCategoryMap.set(newProduct.name, selectedCategories);

      // Reiniciar el formulario y actualizar los productos filtrados
      this.productForm.reset();
      this.filteredProducts = [...this.products];
    }
  }

  createNewCategory(): void {
    const newCategory: Category = { id: this.categories.length + 1, name: 'Nueva Categoría' };
    this.categories.push(newCategory);
  }

  editProduct(product: Product): void {
    const productCategories = this.productCategoryMap.get(product.name) || [];
    this.productForm.patchValue({
      ...product,
      category: productCategories,
    });
  }

  deleteProduct(product: Product): void {
    const index = this.products.indexOf(product);
    if (index >= 0) {
      this.products.splice(index, 1);
      this.productCategoryMap.delete(product.name);
      this.filteredProducts = [...this.products];
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchQuery = filterValue;
    this.filterProducts();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterProducts();
  }

  filterByCategory(event: any): void {
    const categoryId = event.value;
    this.currentCategory = categoryId;
    this.filterProducts();
  }

  filterProducts(): void {
    const nameFilter = this.searchQuery.toLowerCase();
    const categoryId = this.currentCategory ? +this.currentCategory : 0;

    this.filteredProducts = this.products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(nameFilter);
      const productCategories = this.productCategoryMap.get(product.name) || [];
      const matchesCategory = categoryId ? productCategories.includes(categoryId) : true;
      return matchesName && matchesCategory;
    });
  }

  onMultipleFilesChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      this.uploadedFileNames = Array.from(input.files).map((file) => file.name);

      Array.from(input.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  setCurrentImage(index: number): void {
    if (index >= 0 && index < this.imagePreviews.length) {
      this.currentImageIndex = index;
    }
  }


  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage(): void {
    if (this.currentImageIndex < this.imagePreviews.length - 1) {
      this.currentImageIndex++;
    }
  }

  uploadImages(): void {
    console.log('Imágenes subidas:', this.imagePreviews);
    alert('¡Imágenes subidas correctamente!');
  }
}
