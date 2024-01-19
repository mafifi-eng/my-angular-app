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
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
