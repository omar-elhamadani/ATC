import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Product } from '../dashboard-page';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.html',
})
export class Card {
  @Input() product!: Product;
  isLogin = localStorage['token'];

  constructor(private router: Router) {}

  goToDetails(): void {
    this.router.navigate(['/product', this.product.id]);
  }
  gotoLogin() {
    this.router.navigate(['/login']);
  }
}
