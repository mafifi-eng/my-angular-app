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
import { ParserCarrefoureComponent} from './parser-carrefoure/parser-carrefoure.component'
import { TranslationService } from './services/translation-service.service';
import { LoginComponent } from './login/login.component';
import { SpinneysParserComponent } from './spinneys-parser/spinneys-parser.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { SeoudiParserComponent } from './seoudi-parser/seoudi-parser.component';
import { MetroParserComponent } from './metro-parser/metro-parser.component';
import { ScraperService } from './services/scraper-service';
import { OscarParserComponent } from './oscar-parser/oscar-parser.component';
import { ShoppingListService } from './services/shopping-list.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
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
    ParserCarrefoureComponent,
    LoginComponent,
    SpinneysParserComponent,
    SeoudiParserComponent,
    MetroParserComponent,
    OscarParserComponent,
    ShoppingListComponent,
    WeeklyadComponent
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
