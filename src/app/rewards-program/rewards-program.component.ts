import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/connection.service';

@Component({
  selector: 'app-rewards-program',
  templateUrl: './rewards-program.component.html',
  styleUrl: './rewards-program.component.css'
})
export class RewardsProgramComponent implements OnInit {

  products: any[] = [];
  page: number = 0;
  pageSize: number = 6;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getRewards(this.page, this.pageSize).subscribe(
      (data: any) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
