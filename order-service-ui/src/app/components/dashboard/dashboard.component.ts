import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
constructor(
    private router: Router
  ) {}

  storedValue!: any;
  ngOnInit(): void {
    this.storedValue = sessionStorage.getItem('admin');
  }

  searchProducts(data: NgForm){

  }

  logOut(){
    sessionStorage.removeItem('admin');
    this.router.navigate(['/login']);

  }
}
