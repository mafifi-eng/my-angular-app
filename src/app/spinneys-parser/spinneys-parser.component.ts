import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as cheerio from 'cheerio';
import { TranslationService } from '../services/translation-service.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clipboard } from '@angular/cdk/clipboard';

interface Product {
  "id": any,
  "englishName": any,
  "arabicName": any,
  "category": {
    "id": any,
    "name": any,
    "products": [{}]
  },
  "prices": [
    {
      "id": any,
      "value": any,
      "product": any,
      "supermarket": {
        "id": any,
        "name": any,
        "prices": [{}]
      }
      "isRewardsProgram": any
    }
  ],
  "coverImage": any
}

@Component({
  selector: 'app-ParserSpinneysComponent',
  templateUrl: 'spinneys-parser.component.html',
  styleUrls: ['spinneys-parser.component.css']
})
export class SpinneysParserComponent implements OnInit {
  @ViewChild('divToCopy', { static: false }) divToCopy!: ElementRef;
  @ViewChild('divUrlToCopy', { static: false }) divUrlToCopy!: ElementRef;
  
  ngOnInit(): void {
  }
  htmlInput: string = '';
  extractedProducts: Product[] = [];
  isInsertChecked: boolean = true;
  isInsertorUpdateChecked: boolean = false;
  urls: any[] = [];

  constructor(private translationService: TranslationService, private http: HttpClient, private clipboard: Clipboard) { }

  async extractProducts(): Promise<void> {
    const myButton = document.querySelector('.styled-button') as HTMLButtonElement;
    myButton.disabled = true;
    myButton.classList.add('disabled-link');
    const products: Product[] = [];
    const $ = cheerio.load(this.htmlInput);
    const extracteduUrls: any[] = [];

    // Log the number of product elements found
    console.log('Number of Products:', $('article.ProductCard.bg-white.border.border-secondary-300.rounded-2xs.overflow-hidden.ProductCard--is-groceries').length);

    let productCategory: any = $("h1.mt-4.md\\:mt-8.text-xl.md\\:text-4xl.text-black.font-light.antialiased").html()?.trim() || '';
    productCategory = this.extractTextFromStrong(productCategory);

    for (let index = 0; index < $('article.ProductCard.bg-white.border.border-secondary-300.rounded-2xs.overflow-hidden.ProductCard--is-groceries').length; index++) {
      console.log(`Processing Product ${index + 1}`);
      const element = $('article.ProductCard.bg-white.border.border-secondary-300.rounded-2xs.overflow-hidden.ProductCard--is-groceries').eq(index);

      try {
        const productName = this.getProductName(element);
        const productPrice = element.find('div.flex.items-center span.font-bold').html()?.trim().substring(0, element.find('div.flex.items-center span.font-bold').html()?.trim().lastIndexOf(' ')) || '';
        const isRewardsProgram = element.find('span.PriceBefore.text-gray-700.font-light').html()?.trim() || '';
        const imageUrl = element.find('img.ProductCard__Thumb').attr('src');
        const imageName = imageUrl ? this.getImageNameFromUrl(imageUrl) : '';
        extracteduUrls.push(imageUrl);
        const nameTranslated = await this.translate(productName);
        const categoryTranslated = await this.translate(productCategory);

        console.log('Raw Product:', productName, productCategory, productPrice);
        const prdct: Product = {
          "id": null,
          "englishName": (`${productName}` != '')? `${productName}`: null,
          "arabicName": `${nameTranslated}`,
          "category": {
            "id": null,
            "name": `${productCategory} - ${categoryTranslated}`,
            "products": [{}]
          },
          "prices": [
            {
              "id": null,
              "value": parseFloat(productPrice.trim()),
              "product": null,
              "supermarket": {
                "id": 2,
                "name": "Spinneys Egypt",
                "prices": [{}]
              },
              "isRewardsProgram": (isRewardsProgram != ''),
            }
          ],
          "coverImage": `${imageName}`
        };
        if (prdct.englishName != null)
        products.push(prdct);
      } catch (error) {
        console.error('Error processing product:', error);
      }
    }
    if (this.isInsertChecked == true && products.length != 0) {
      this.addProduct(products);
    }
    console.log('Extracted Products:', products);
    this.extractedProducts = products;
    this.urls = extracteduUrls;
  }

  private getProductName(element: any): string {
    return element.find('p.product-name.text-base.text-black').html()?.trim() || '';
  }

  async translate(originalText: string,): Promise<any> {
    const sourceLang = 'en'; 
    const targetLanguage = 'ar'; 


    try {
      const result = await firstValueFrom(this.translationService.translateText(originalText, targetLanguage, sourceLang));
      return result;
    } catch (error) {
      console.error('Error:', error);
    }

  }

  async getTranslation(text: any) {
    const translated = await this.translate(text);
    return translated;
  }

  getImageNameFromUrl(url: string) {
    const parts = url.split('/');
    const imageNameWithExtension = parts[parts.length - 1].split('?')[0];
    const extensionIndex = imageNameWithExtension.lastIndexOf('.');

    // Check if the image ends with ".jpg"
    return imageNameWithExtension;

    // else {
    //   const imageNameWithoutSize = imageNameWithExtension.replace('_1700Wx1700H', '');
    //   return imageNameWithoutSize;
    // }
  }

  extractTextFromStrong(htmlString: string): string | null {
    // Create a temporary element
    const tempElement = document.createElement('div');

    // Set the HTML content of the temporary element
    tempElement.innerHTML = htmlString;

    // Find the <strong> element within the temporary element
    const strongElement = tempElement.querySelector('strong');

    // Check if the <strong> element exists
    if (strongElement) {
      // Create an array to store text content
      const textContentArray: string[] = [];

      // Iterate through child nodes of the parent container
      tempElement.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          // If it's a text node, add its content to the array
          textContentArray.push(node.textContent || '');
        } else if (node === strongElement) {
          // If it's the <strong> element, add its content to the array
          textContentArray.push(strongElement.textContent || '');
        }
      });

      // Combine the array elements into a single string
      const combinedText = textContentArray.join('').trim();

      return combinedText || null;
    } else {
      // Return null if <strong> element is not found
      return null;
    }
  }

  addProduct(product: any) {

    // Call the backend API to add the products
    this.http.post('https://checkluxury.ddns.net:443/api/savePriceAll', product).subscribe(
      (response) => {
        console.log('Product added successfully', response);
      },
      (error) => {
        console.log('Adding products to DB: ' + error.error.text);
      }
    );
  }

  handleToggle() {
    // const updateSwitchElement = document.querySelector(".updateorinsert-switch") as HTMLElement | null
    // if (this.isInsertChecked == false) {
    //   if (updateSwitchElement != null)
    //     updateSwitchElement.style.display = "none";
    // } else {
    //   if (updateSwitchElement != null)
    //     updateSwitchElement.style.display = "block";
    // }
  }

  copyToClipboard() {
    const element = this.divToCopy.nativeElement;
    this.clipboard.copy(element.innerText);
  }

  copyUrlsToClipboard() {
    const element = this.divUrlToCopy.nativeElement;
    this.clipboard.copy(element.innerText);
  }
}