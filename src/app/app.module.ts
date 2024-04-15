// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/connection.service';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { ContactComponent } from './contact/contact.component';
import { RewardsProgramComponent } from './rewards-program/rewards-program.component';
import { AllrewardsComponent } from './allrewards/allrewards.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { SuccessSubscribeComponent } from './success-subscribe/success-subscribe.component';
import { SubscriptionService } from './services/subscription.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { KnowSubscribeComponent } from './know-subscribe/know-subscribe.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { TranslationService } from './services/translation-service.service';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ScraperService } from './services/scraper-service';
import { ShoppingListService } from './services/shopping-list.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { BabyProductsComponent } from './baby-products/baby-products.component';
import { BakeryComponent } from './bakery/bakery.component';
import { BeautyAndPersonalCareComponent } from './beauty-and-personal-care/beauty-and-personal-care.component';
import { BeveragesComponent } from './beverages/beverages.component';
import { BioAndOrganicFoodComponent } from './bio-and-organic-food/bio-and-organic-food.component';
import { CleaningAndHouseholdComponent } from './cleaning-and-household/cleaning-and-household.component';
import { ElectronicsAndAppliancesComponent } from './electronics-and-appliances/electronics-and-appliances.component';
import { FoodCupboardComponent } from './food-cupboard/food-cupboard.component';
import { FreshFoodComponent } from './fresh-food/fresh-food.component';
import { FrozenFoodComponent } from './frozen-food/frozen-food.component';
import { FruitsAndVegetablesComponent } from './fruits-and-vegetables/fruits-and-vegetables.component';
import { HealthAndFitnessComponent } from './health-and-fitness/health-and-fitness.component';
import { PetSuppliesComponent } from './pet-supplies/pet-supplies.component';
import { SmartphonesTabletsAndWearablesComponent } from './smartphones-tablets-and-wearables/smartphones-tablets-and-wearables.component';
import { WeeklyadComponent } from './weeklyad/weeklyad.component';



@NgModule({
  declarations: [
    ProductComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent,
    ContactComponent,
    RewardsProgramComponent,
    AllrewardsComponent,
    SubscribeComponent,
    SuccessSubscribeComponent,
    MainComponent,
    KnowSubscribeComponent,
    SearchResultComponent,
    ShoppingListComponent,
    BabyProductsComponent,
    BakeryComponent,
    BeautyAndPersonalCareComponent,
    BeveragesComponent,
    BioAndOrganicFoodComponent,
    CleaningAndHouseholdComponent,
    ElectronicsAndAppliancesComponent,
    FoodCupboardComponent,
    FreshFoodComponent,
    FrozenFoodComponent,
    FruitsAndVegetablesComponent,
    HealthAndFitnessComponent,
    PetSuppliesComponent,
    SmartphonesTabletsAndWearablesComponent,
    WeeklyadComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
  providers: [ProductService, SubscriptionService, TranslationService, ScraperService, ShoppingListService],
  bootstrap: [MainComponent]
})
export class AppModule { }
