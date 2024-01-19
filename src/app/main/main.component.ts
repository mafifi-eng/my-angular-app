import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { ProductService } from '../services/connection.service';
import { startWith, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { Block } from '@angular/compiler';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {


  constructor(private productService: ProductService, @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router, private renderer: Renderer2, private el: ElementRef) { }


  ngAfterViewInit(): void {

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
    document.documentElement.scrollTop = 0;
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
}
