import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/connection.service';

@Component({
  selector: 'app-allrewards',
  templateUrl: './allrewards.component.html',
  styleUrl: './allrewards.component.css'
})
export class AllrewardsComponent implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getRewards().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

}
