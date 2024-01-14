import { Component } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-success-subscribe',
  templateUrl: './success-subscribe.component.html',
  styleUrl: './success-subscribe.component.css'
})
export class SuccessSubscribeComponent {

  response: any = '';

  constructor (private subscriptionService: SubscriptionService){
    this.response = this.subscriptionService.response;
  }

}
