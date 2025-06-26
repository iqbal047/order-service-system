import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})


export class OrderListComponent implements OnInit {
  orders: Order[] = [];
    customerName = '';
    products: Product[] = [];
    items: OrderItem[] = [];

  
  constructor(private orderService: OrderService) {}

  ngOnInit() {
          this.orderService.getAll().subscribe({
      next: r => {
        this.orders = r;
        console.log('Backend response:', r);
      },
      error: err => {
        console.error(err);
      }
    });
  }

    
newOrder = {
   id: 0,
  customerName: '',
  customerEmail: '',
  orderDate: '',
  status: '',
  items: [
    {
      id: 0,
      productId: 0,
      productName: '',
      quantity: 1,
      price: 0
    }
  ],
  totalPrice: 0
};

addItem() {
  this.newOrder.items.push({
    id: this.newOrder.items.length + 1,
    productId: 0,
    productName: '',
    quantity: 1,
    price: 0
  });
}

addOrder() {
 
  this.newOrder.totalPrice = this.newOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if(this.editFlag = true){
    this.update();
  }else{
      this.orderService.create(this.newOrder).subscribe({
        next: r => {
           alert("Saved Successfully");
     this.newOrder = {
       id: 0,
    customerName: '',
    customerEmail: '',
    orderDate: '',
    status: '',
    items: [
      {
        id: 0,
        productId: 0,
        productName: '',
        quantity: 1,
        price: 0
      }
    ],
    totalPrice: 0
  };
    this.ngOnInit();
      },
      error: err => {
        alert("Has an error please try again!")
        console.error(err);
      }
    });
  }
}


update() {
  this.newOrder.totalPrice = this.newOrder.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!this.newOrder.id || this.newOrder.id === 0) {
    alert("Invalid ID! Cannot update.");
    return;
  }

  this.orderService.update(this.newOrder).subscribe({
    next: () => {
      alert("Order updated successfully");
      this.resetForm();
      this.ngOnInit(); 
    },
    error: err => {
      alert("Error occurred during update");
      console.error(err);
    }
  });
}

resetForm() {
  this.editFlag = false;
  this.newOrder = {
    id: 0, 
    customerName: '',
    customerEmail: '',
    orderDate: '',
    status: '',
    items: [
      {
        id: 0,
        productId: 0,
        productName: '',
        quantity: 1,
        price: 0
      }
    ],
    totalPrice: 0
  };
}


editFlag =false;

editOrder(order: any): void {
  this.newOrder = order;
  this.editFlag = true;
}

deleteOrder(order: any): void {
      this.orderService.delete(order.id).subscribe({
        next: r => {
         alert("Delete Successfully");
         this.editFlag = false;
         this.ngOnInit();
      },
      error: err => {
        alert("Hsas an error please try again!")
        console.error(err);
      }
    });
}
  
}

