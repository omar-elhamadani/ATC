import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Product } from '../dashboard-page/dashboard-page';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [ProductService],
  templateUrl: './product-details-page.html',
})
export class ProductDetailsPage implements OnInit {
  product?: Product;
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'Invalid product ID';
      this.loading = false;
      return;
    }

    this.productService.getProduct(id).subscribe({
      next: (res) => {
        this.product = res;
      },
    });
  }
}
