import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { SuccessSubscribeComponent } from './success-subscribe/success-subscribe.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { AllrewardsComponent } from './allrewards/allrewards.component';
import { ContactComponent } from './contact/contact.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { KnowSubscribeComponent } from './know-subscribe/know-subscribe.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ParserCarrefoureComponent } from './parser-carrefoure/parser-carrefoure.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SpinneysParserComponent } from './spinneys-parser/spinneys-parser.component';
import { SeoudiParserComponent } from './seoudi-parser/seoudi-parser.component';
import { MetroParserComponent } from './metro-parser/metro-parser.component';
import { OscarParserComponent } from './oscar-parser/oscar-parser.component';
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
import { HomeAndGardenComponent } from './home-and-garden/home-and-garden.component';
import { PetSuppliesComponent } from './pet-supplies/pet-supplies.component';
import { SmartphonesTabletsAndWearablesComponent } from './smartphones-tablets-and-wearables/smartphones-tablets-and-wearables.component';
import { StationeryAndSchoolSuppliesComponent } from './stationery-and-school-supplies/stationery-and-school-supplies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { WeeklyadComponent } from './weeklyad/weeklyad.component';

const routes: Routes = [
  {path: 'home', component: ProductComponent},
  {path: 'main', component: ProductComponent},
  {path: 'about', component: AboutComponent},
  {path: 'allrewards', component: AllrewardsComponent},
  {path: 'contact', component: ContactComponent},
  { path: 'terms-of-use', component: TermsOfUseComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'know-subscribe', component: KnowSubscribeComponent },
  { path: 'success', component: SuccessSubscribeComponent },
  { path: 'search-page', component: SearchResultComponent },
  { path: 'admin', component: LoginComponent },
  { path: 'dashboard', component: AdminComponent },
  { path: 'ParserCarrefoure', component: ParserCarrefoureComponent },
  { path: 'SpinneysParser', component: SpinneysParserComponent },
  { path: 'SeoudiParser', component: SeoudiParserComponent },
  { path: 'metroParser', component: MetroParserComponent },
  { path: 'oscarParser', component: OscarParserComponent },
  { path: 'baby-products', component: BabyProductsComponent },
  { path: 'bakery', component: BakeryComponent },
  { path: 'beauty-and-personal-care', component: BeautyAndPersonalCareComponent },
  { path: 'beverages', component: BeveragesComponent },
  { path: 'bio-and-organic-food', component: BioAndOrganicFoodComponent },
  { path: 'cleaning-and-household', component: CleaningAndHouseholdComponent },
  { path: 'electronics-and-appliances', component: ElectronicsAndAppliancesComponent },
  { path: 'food-cupboard', component: FoodCupboardComponent },
  { path: 'fresh-food', component: FreshFoodComponent },
  { path: 'frozen-food', component: FrozenFoodComponent },
  { path: 'fruits-and-vegetables', component: FruitsAndVegetablesComponent },
  { path: 'health-and-fitness', component: HealthAndFitnessComponent },
  { path: 'home-and-garden', component: HomeAndGardenComponent },
  { path: 'pet-supplies', component: PetSuppliesComponent },
  { path: 'smartphones-tablets-and-wearables', component: SmartphonesTabletsAndWearablesComponent },
  { path: 'stationery-and-school-supplies', component: StationeryAndSchoolSuppliesComponent },
  { path: 'shoppingList', component: ShoppingListComponent },
  { path: 'weeklyad', component: WeeklyadComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
