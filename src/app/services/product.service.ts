import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getProducts(page = 1, per_page = 15, q: string | null = null, is_active: boolean | null = null) {
    // let headers: any = {};
    let params = new HttpParams();
    try {
      params = params.set('page', String(page)).set('per_page', String(per_page));
      if (q) params = params.set('search', q);
      if (is_active === true) params = params.set('is_active', is_active);
    } catch (e) {
      console.error('Error setting request parameters or headers:', e);
    }

    return this.http.get<any>(`${this.apiUrl}/products`, { params });
  }
  getProduct(id: string) {
    return this.http.get<any>(`${this.apiUrl}/products` + `/${id}`).pipe(map((res) => res.data));
  }
  createProduct(payload: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/products`, payload);
  }
}
