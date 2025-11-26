import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Card } from './card/card';
export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string;
  stock: number;
  price: number;
  currency: string;
  thumbnail_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, Card, FormsModule],
  providers: [ProductService],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage implements OnInit {
  products: Product[] = [];
  page = 1;
  perPage = 15;
  lastPage = 1;
  total = 0;
  q: string | null = null;
  is_active: boolean | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.page, this.perPage, this.q, this.is_active).subscribe({
      next: (res) => {
        this.total = res.meta.total;

        this.products = res.data;
        this.lastPage = res.meta.last_page;
      },
      error: (error) => {
        console.error('Error loading books:', error);
      },
    });
  }
  prev() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }
  next() {
    if (this.page < this.lastPage) {
      this.page++;
      this.loadProducts();
    }
  }
  open(id: any) {
    this.router.navigate(['/product', id]);
  }

  toCreate() {
    this.router.navigate(['/create']);
  }
}
