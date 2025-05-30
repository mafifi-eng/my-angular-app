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
  inputSearch: any = '';
  constructor(private productService: ProductService, @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router, private renderer: Renderer2, private el: ElementRef, private shoppingListService: ShoppingListService) { }


  // ngAfterViewInit(): void {
  //   this.shoppingListService.customEvent.subscribe(() => {
  //     this.listCount = this.shoppingListService.getProductList().length;
  //   });
  //   setTimeout(() => {
  //     this.listCount = this.shoppingListService.getProductList().length;
  //   });
  //   document.addEventListener('DOMContentLoaded', () => {
  //     const mainDiv = this.el.nativeElement.querySelector('#mainContent');

  //     // Add a click event listener to the main div
  //     this.renderer.listen(mainDiv, 'click', (event) => {
  //       // Check if the clicked element is not one of the excluded divs
  //       if (
  //         event.target !== this.el.nativeElement.querySelector('#menu-ico') &&
  //         event.target !== this.el.nativeElement.querySelector('#nav-links')
  //       ) {
  //         event.stopPropagation();
  //         document.querySelector('#nav-links')!.classList.remove('active');
  //       }
  //     });

  //   });
  // }


  // ngAfterViewInit(): void {
  //   this.shoppingListService.customEvent.subscribe(() => {
  //     this.listCount = this.shoppingListService.getProductList().length;
  //   });
  //   setTimeout(() => {
  //     this.listCount = this.shoppingListService.getProductList().length;
  //   });
  //   document.addEventListener('DOMContentLoaded', () => {
  //     const mainDiv = this.el.nativeElement.querySelector('#mainContent');
  //     // Add a click event listener to the main div
  //     this.renderer.listen(mainDiv, 'click', (event) => {
  //       // Ensure that event.target is not null
  //     const target = event.target as HTMLElement | null;
  //     // Check if the clicked element is not one of the excluded elements
  //     if (
  //       !target?.closest('#menu-ico') &&
  //       !target?.closest('#nav-links')
  //     ){
  //         event.stopPropagation();
  //         document.querySelector('#nav-links')!.classList.remove('active');
  //       }
  //     });
  //   });
  // }

  ngAfterViewInit(): void {
    this.shoppingListService.customEvent.subscribe(() => {
      this.listCount = this.shoppingListService.getProductList().length;
    });

    setTimeout(() => {
      this.listCount = this.shoppingListService.getProductList().length;
    });

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const isMenuIcon = target.closest('#menu-ico');
      const isNavLinks = target.closest('#nav-links');

      if (!isMenuIcon && !isNavLinks) {
        document.querySelector('#nav-links')?.classList.remove('active');
      }
    });

    // this.inputSearch = localStorage.getItem('searchInput');
  }



  handleSearchButtonClick(): void {
    // this.inputSearch = document.getElementById('searchInput') as HTMLInputElement;
    // localStorage.setItem('searchTerm', JSON.stringify(this.inputSearch));
    this.productService.searchTerm = (this.inputSearch);
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
      // this.inputSearch = document.getElementById('searchInput') as HTMLInputElement;
      // localStorage.setItem('searchTerm', JSON.stringify(this.inputSearch));
      this.productService.searchTerm = (this.inputSearch);
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
  // categoryDropdown() {
  //   const dropdown = document.querySelector('.dropdown') as HTMLElement;
  //   document.addEventListener('click', (e) => {
  //     const dropdownContent = document.querySelector('.dropdown-content') as HTMLElement;
  //     dropdownContent.style.display = 'block';
  //   })
  // }

  categoryDropdown(event: Event) {
    const dropdown = this.el.nativeElement.querySelector('.dropdown');
    dropdown.classList.toggle('active');

    // Stop the event from propagating to avoid immediate closing
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const dropdown = this.el.nativeElement.querySelector('.dropdown');
    if (!dropdown.contains(event.target as Node)) {
      // Close the dropdown if the click is outside of it
      dropdown.classList.remove('active');
    }
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

  redirectsToCleaning() {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
    document.documentElement.scrollTop = 0;
    this.router.navigate(['/cleaning-and-household']);
  }

  clearSearch(event: Event) {
    event.preventDefault();
    this.inputSearch = '';
    const input = document.getElementById('searchInput') as HTMLInputElement;
    input.focus();
  }
}
