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
        "id": 1,
        "name": any,
        "prices": [{}]
      }
      "isRewardsProgram": any
    }
  ],
  "coverImage": any
}

@Component({
  selector: 'app-ParserPageComponent',
  templateUrl: 'parser-carrefoure.component.html',
  styleUrls: ['parser-carrefoure.component.css']
})
export class ParserCarrefoureComponent implements OnInit {
  @ViewChild('divToCopy', { static: false }) divToCopy!: ElementRef;
  @ViewChild('divUrlToCopy', { static: false }) divUrlToCopy!: ElementRef;
  isTranslateChecked: any = false;
  isDownloadChecked: any = false;


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
    console.log('Number of Products:', $('div[data-testid="product_card_image_container"]').length);

    const productCategory = $('h1[data-testid="page-info-header"] > span').html()?.trim() || '';

    // `${productCategory}${productCategoryArabic}`

    for (let index = 0; index < $('.css-yqd9tx').length; index++) {
      console.log(`Processing Product ${index + 1}`);
      const element = $('.css-yqd9tx').eq(index);

      try {
        const productName = this.getProductName(element);
        const productPrice = element.find('.css-14zpref').html()?.trim() || '';
        const isRewardsProgram = element.find('.css-bc0emj').html()?.trim() || '';
        const productPricePennys = element.find('.css-1pjcwg4').html()?.trim() || '';
        const imageUrl = element.find('.css-rqp131').attr('src');
        const imageName = imageUrl ? this.getImageNameFromUrl(imageUrl) : '';
        extracteduUrls.push(imageUrl);
        let nameTranslated = '';
        let categoryTranslated = `${productCategory}`;
        if (this.isTranslateChecked) {
          nameTranslated = await this.translate(productName);
          categoryTranslated = await this.translate(productCategory);
          categoryTranslated = `${productCategory} - ${categoryTranslated}`
        }
        if (this.isDownloadChecked) {
          this.downloadImage(imageUrl);
        }

        console.log('Raw Product:', productName, productCategory, productPrice);
        const prdct: Product = {
          "id": null,
          "englishName": (`${productName}` != '') ? `${productName}` : null,
          "arabicName": `${nameTranslated}`,
          "category": {
            "id": null,
            "name": `${categoryTranslated}`,
            "products": [{}]
          },
          "prices": [
            {
              "id": null,
              "value": parseFloat(productPrice.trim()) + parseFloat(productPricePennys.trim()),
              "product": null,
              "supermarket": {
                "id": 1,
                "name": "Carrefour Egypt",
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
    return element.find('a[data-testid="product_name"]').html()?.trim() || '';
  }

  async translate(originalText: string,): Promise<any> {
    const targetLanguage = 'ar';
    const sourceLang = 'en';

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

  downloadImage(imageUrl: any) {
    const baseUrl = 'http://localhost:4000';
    const url = `${baseUrl}/download-image?imageUrl=${encodeURIComponent(imageUrl)}`;

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.success) {
          console.log("Image downloaded!")
        } else {
          console.error('Error downloading image:', response.error);
        }
      },
      (error) => {
        console.error('Error downloading image:', error);
      }
    );
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