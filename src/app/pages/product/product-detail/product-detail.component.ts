import { Component, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../../models/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements AfterViewInit {

  product: Product;
  categories: string[] = [];  // Para almacenar las categorías del producto

  // Declaración de las referencias @ViewChild con '!' para evitar el error de inicialización
  @ViewChild('sliderBlockItems') sliderBlockItems!: ElementRef;
  @ViewChild('slides') slides!: ElementRef;
  @ViewChild('next') next!: ElementRef;
  @ViewChild('previous') previous!: ElementRef;
  @ViewChild('items') items!: ElementRef;
  @ViewChild('currentSlideItem') currentSlideItem!: ElementRef;

  currentSlide: number = 0;
  slideInterval: any;

  @ViewChild('buttonFullSpecification') buttonFullSpecification!: ElementRef;
  @ViewChild('buttonSpecification') buttonSpecification!: ElementRef;
  @ViewChild('buttonInformation') buttonInformation!: ElementRef;
  @ViewChild('blockCharacteristiic') blockCharacteristiic!: ElementRef;

  @ViewChild('up') up!: ElementRef;
  @ViewChild('down') down!: ElementRef;
  @ViewChild('input') input!: ElementRef;

  constructor(public dialogRef: MatDialogRef<ProductDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // Inicializa el producto y las categorías desde los datos inyectados
    this.product = data.product;
    console.log(this.product);
    this.categories = data.product.categories;
  }

  // Este método se ejecuta después de que la vista y los elementos del DOM estén completamente inicializados
  ngAfterViewInit(): void {
    // Ahora las referencias están disponibles
    this.initializeSlider();
    this.initializeSpecificationToggle();
    this.initializeQuantityControls();
  }

  close(): void {
    this.dialogRef.close(); // Cierra el modal
  }

  addToCart(): void {
    console.log("Producto añadido al carrito:", this.data);
    this.dialogRef.close(); // Cierra el modal después de agregar al carrito
  }

  // Inicializa el slider
  initializeSlider() {
    const slider = this.sliderBlockItems.nativeElement;
    const slides = this.slides.nativeElement.getElementsByClassName("sliderBlock_items__itemPhoto");
    const next = this.next.nativeElement;
    const previous = this.previous.nativeElement;
    const items = this.items.nativeElement;
    const currentSlideItem = this.currentSlideItem.nativeElement.getElementsByClassName("sliderBlock_positionControls__paginatorItem");

    const goToSlide = (n: number) => {
      slides[this.currentSlide].className = 'sliderBlock_items__itemPhoto';
      items.children[this.currentSlide].className = 'sliderBlock_positionControls__paginatorItem';
      this.currentSlide = (n + slides.length) % slides.length;
      slides[this.currentSlide].className = 'sliderBlock_items__itemPhoto sliderBlock_items__showing';
      items.children[this.currentSlide].className = 'sliderBlock_positionControls__paginatorItem sliderBlock_positionControls__active';
    };

    const nextSlide = () => goToSlide(this.currentSlide + 1);
    const previousSlide = () => goToSlide(this.currentSlide - 1);

    const goToSlideAfterPushTheMiniBlock = () => {
      for (let i = 0; i < currentSlideItem.length; i++) {
        currentSlideItem[i].onclick = () => {
          const index = Array.prototype.indexOf.call(currentSlideItem, this);
          goToSlide(index);
        };
      }
    };

    // Set interval for slide change
    this.slideInterval = setInterval(nextSlide, 5000);  // Change slide every 5 seconds

    next.onclick = () => nextSlide();
    previous.onclick = () => previousSlide();

    goToSlideAfterPushTheMiniBlock();
  }

  // Inicializa el cambio de especificaciones
  initializeSpecificationToggle() {
    const buttonSpecification = this.buttonSpecification.nativeElement;
    const buttonInformation = this.buttonInformation.nativeElement;
    const buttonFullSpecification = this.buttonFullSpecification.nativeElement;
    const blockCharacteristiic = this.blockCharacteristiic.nativeElement;

    buttonFullSpecification.onclick = () => {
      console.log("OK");
      buttonSpecification.classList.toggle("hide");
      buttonInformation.classList.toggle("hide");
      blockCharacteristiic.classList.toggle("block_descriptionCharacteristic__active");
    };
  }

  // Inicializa los controles de cantidad
  initializeQuantityControls() {
    const up = this.up.nativeElement;
    const down = this.down.nativeElement;
    const input = this.input.nativeElement;

    const getValue = () => parseInt(input.value);

    up.onclick = () => {
      input.value = getValue() + 1;
    };

    down.onclick = () => {
      if (input.value <= 1) {
        input.value = '1';  // Asegúrate de que el valor no sea menor que 1
      } else {
        input.value = (getValue() - 1).toString();  // Decrementa el valor
      }
    };
  }
}
