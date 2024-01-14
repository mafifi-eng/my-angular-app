import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent {
  response: any = '';

  constructor(private subscriptionService: SubscriptionService, private router: Router) { }

  subscribe() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    this.subscriptionService.subscribe(email).subscribe(
  {
      error: error => {
        if (error.status != '200')
        this.response = error.error ;
        else
        this.router.navigate(['/success']);
      }}
    );
  }
}
