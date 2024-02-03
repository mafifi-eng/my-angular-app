import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { ProductService } from '../services/connection.service';
import { startWith, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { Block } from '@angular/compiler';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  listCount: any = 0;

  constructor(private productService: ProductService, @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router, private renderer: Renderer2, private el: ElementRef, private shoppingListService: ShoppingListService) { }


  ngAfterViewInit(): void {
    this.shoppingListService.customEvent.subscribe(() => {
      this.listCount = this.shoppingListService.getProductList().length;
    });
    setTimeout(() => {
      this.listCount = this.shoppingListService.getProductList().length;
    });
    document.addEventListener('DOMContentLoaded', () => {
      const mainDiv = this.el.nativeElement.querySelector('#mainContent');

      // Add a click event listener to the main div
      this.renderer.listen(mainDiv, 'click', (event) => {
        // Check if the clicked element is not one of the excluded divs
        if (
          event.target !== this.el.nativeElement.querySelector('#menu-ico') &&
          event.target !== this.el.nativeElement.querySelector('#nav-links')
        ) {
          event.stopPropagation();
          document.querySelector('#nav-links')!.classList.remove('active');
        }
      });

    });
  }

  handleSearchButtonClick(): void {
    const inputSearch = document.getElementById('searchInput') as HTMLInputElement;
    this.productService.searchTerm = (inputSearch.value.trim());
    this.router.navigate(['/search-page']);
    this.productService.triggerRerender();


  }

  handleDivClick() {
    // document.documentElement.scrollTop = 0;
  }

  handleMenuBtnClick() {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
  }

  onInputEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const inputSearch = document.getElementById('searchInput') as HTMLInputElement;
      this.productService.searchTerm = (inputSearch.value.trim());
      this.router.navigate(['/search-page']);
      this.productService.triggerRerender();
    }
  }

  redirectsAbout() {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/about']);
  }

  redirectsContact() {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/contact']);
  }

  redirectsAdmin() {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/admin']);
  }
  categoryDeopdown() {
    const dropdown = document.querySelector('.dropdown') as HTMLElement;
    document.addEventListener('click', (e) => {
      const dropdownContent = document.querySelector('.dropdown-content') as HTMLElement;
      dropdownContent.style.display = 'block';
    })
  }

  redirectsToFreshFood() {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/fresh-food']);
  }

  redirectsToFruitsAndVegetables(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/fruits-and-vegetables']);
  }

  redirectsToFoodCupboard(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/food-cupboard']);
  }

  redirectsToBeverages(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/beverages']);
  }

  redirectsToBabyProducts(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/baby-products']);
  }

  redirectsToFrozenFood(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/frozen-food']);
  }

  redirectsToBioAndOrganicFood(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/bio-and-organic-food']);
  }

  redirectsToBakery(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/bakery']);
  }

  redirectsToPetSupplies(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/pet-supplies']);
  }

  redirectsToElectronicsAndAppliances(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/electronics-and-appliances']);
  }

  redirectsToSmartphonesTabletsAndWearables(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/smartphones-tablets-and-wearables']);
  }

  redirectsToBeautyAndPersonalCare(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/beauty-and-personal-care']);
  }

  redirectsToHealthAndFitness(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/health-and-fitness']);
  }

  redirectsToCleaningAndHousehold(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/cleaning-and-household']);
  }

  redirectsToStationeryAndSchoolSupplies(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/stationery-and-school-supplies']);
  }

  redirectsToHomeAndGarden(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/home-and-garden']);
  }
}
