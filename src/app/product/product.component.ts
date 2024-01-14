// product.component.ts

import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../services/connection.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements AfterViewInit {

  products: any[] = [];
  private bgsections: NodeListOf<HTMLElement> = {} as NodeListOf<HTMLElement>;
  private historyStack: string[] = [];
  searchResult: string = '';
  categoryName: any;
  errorMessage!: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  // ngOnInit(): void {
  //   this.getAllProducts();
  // }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.bgsections = document.querySelectorAll("section.mainbgsection") as NodeListOf<HTMLElement>;

      this.renderPage();
      document.addEventListener('DOMContentLoaded', () => {

        const links = document.getElementsByTagName('a');
        Array.from(links).forEach(link => {
          link.addEventListener('click', (event) => {
            const target = (event.target as HTMLElement)?.getAttribute('href')?.substring(1) ?? null;
            this.renderSection(target);
          });
        });
      });

      if (typeof window !== 'undefined') {
        window.addEventListener('popstate', (event) => {
          this.renderPage();
        });

        history.pushState({ section: 'home' }, '', '#home');
      }
    }
  }



  renderSection(target: string | null): void {
    this.bgsections = document.querySelectorAll("section.mainbgsection") as NodeListOf<HTMLElement>;

    if (this.bgsections) {
      this.bgsections.forEach((section) => {

        if (section.id === target && section.id !== "home") {
          section.style.display = "block";
          const homeElement = document.getElementById("home");
          if (homeElement) {
            homeElement.style.display = "none";
          }
        } else if  (section.id === target && section.id !== "home") {
            section.style.display = "block";
        }  else if  (section.id === target && section.id == "home") {
          section.style.display = "block";
      } else {
        section.style.display = "none";
      }

      if (target === ""){
        const homeElement = document.getElementById("home");
        if (homeElement) {
          homeElement.style.display = "block";
      }
    }
      });
    }
  }

  renderPage(): void {
    const currentSection = window.location.hash.substring(1);
    this.renderSection(currentSection);
  }

}
