import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/connection.service';

@Component({
  selector: 'app-allrewards',
  templateUrl: './allrewards.component.html',
  styleUrl: './allrewards.component.css'
})
export class AllrewardsComponent implements OnInit {

  products: any[] = [];
  page: number = 0;
  pageSize: number = 10;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadResults();
  }

  onLoadMore() {
    this.page++;
    this.loadResults();
  }

  loadResults() {
    this.productService.getRewards(this.page, this.pageSize).subscribe(
      (data: any) => {
        this.products = this.products.concat(data);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    ); 
   }

}
