import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-create-page.html',
})
export class ProductCreateComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    stock: new FormControl('', [Validators.required, Validators.min(0)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    currency: new FormControl('', [Validators.required, Validators.minLength(3)]),
    is_active: new FormControl(false),
  });
  error: string | null = null;
  constructor(private api: ProductService, private router: Router) {}
  submit() {
    if (this.form.invalid) return;
    this.api.createProduct(this.form.value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => (this.error = err?.error?.message || 'Create failed'),
    });
  }
  back() {
    this.router.navigate(['/dashboard']);
  }
}
