import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})


export class ProductListComponent implements OnInit {
  products: Product[] = [];

constructor(private productService: ProductService) {}

product: Product = { name: '', description: '', price: 0, stock: 0 };
  ngOnInit() {
      this.productService.getAll().subscribe({
      next: r => {
        this.products = r;
        console.log('Backend response:', r);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  save() {
    if(this.editFlag){
      this.productService.update(this.product).subscribe({
      next: r => {
        alert("Update Successfully");
    this.editFlag = false;
    this.product = { name: '', description: '', price: 0, stock: 0 };
    this.ngOnInit();
      },
      error: err => {
        alert("Hsas an error please try again!")
        console.error(err);
      }
    });
    } else{
      this.productService.create(this.product).subscribe({
      next: r => {
        alert("Saved Successfully");
    this.product = { name: '', description: '', price: 0, stock: 0 };
    this.ngOnInit();
      },
      error: err => {
        alert("Hsas an error please try again!")
        console.error(err);
      }
    });
    }

  }

 editFlag = false;


  edit(product: Product){
    this.product = product;
    this.editFlag = true;
  }

  delete(product: Product){
    console.log(product.id);
      this.productService.delete(product.id).subscribe({
      next: r => {
       alert("Delete Sucessfully");
       this.ngOnInit();
      },
      error: err => {
        alert("You can't delete this item because there is an Ordered product.")
        console.error(err);
      }
    });
  }
}

