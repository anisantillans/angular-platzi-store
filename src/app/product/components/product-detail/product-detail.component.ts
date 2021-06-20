import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from './../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    //implementar observables para evitar
    //usar doble suscriber
    this.product$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.productsService.getProduct(params.id);
      })
    );
  }

  createProduct() {
    const newProduct: Product = {
      _id: '222',
      name: 'nuevo desde angular',
      image: 'assets/images/banner-1.jpg',
      price: 3000,
      description: 'nuevo producto',
    };
    this.productsService.createProduct(newProduct).subscribe((product) => {
      console.log(product);
    });
  }

  updateProduct() {
    const updateProduct: Partial<Product> = {
      price: 555555,
      description: 'edicion titulo',
    };
    this.productsService
      .updateProduct('2', updateProduct)
      .subscribe((product) => {
        console.log(product);
      });
  }

  deleteProduct() {
    this.productsService.deleteProduct('222').subscribe((rta) => {
      console.log(rta);
    });
  }

  getRandomUsers() {
    this.productsService.getRandomUsers().subscribe(
      (users) => {
        console.log(users);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getFile() {
    this.productsService.getFile().subscribe((content) => console.log(content));
  }
}
