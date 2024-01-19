import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as cheerio from 'cheerio';
import { TranslationService } from '../services/translation-service.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clipboard } from '@angular/cdk/clipboard';
import { ScraperService } from '../services/scraper-service';

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
  selector: 'app-MetroParserComponent',
  templateUrl: 'metro-parser.component.html',
  styleUrls: ['metro-parser.component.css']
})
export class MetroParserComponent implements OnInit {
  @ViewChild('divToCopy', { static: false }) divToCopy!: ElementRef;
  @ViewChild('divUrlToCopy', { static: false }) divUrlToCopy!: ElementRef;


  ngOnInit(): void {
  }
  htmlInput: string = '';
  extractedProducts: Product[] = [];
  isInsertChecked: boolean = true;
  isInsertorUpdateChecked: boolean = false;
  urls: any[] = [];

  constructor(private translationService: TranslationService,
    private http: HttpClient, private clipboard: Clipboard, private scraperService: ScraperService) { }

  async parseHTML(html: string): Promise<void> {
    const $ = cheerio.load(html);
    const products: Product[] = [];
    const extracteduUrls: any[] = [];

    // Log the number of product elements found
    console.log('Number of Products:', $('.product-card.card').length);

    const productCategory = $('.breadcrumb-item+.breadcrumb-item > a').html()?.trim().replace(/&amp;/g, '') || '';

    for (let index = 0; index < $('.product-card.card').length; index++) {
      console.log(`Processing Product ${index + 1}`);
      const element = $('.product-card.card').eq(index);

      try {
        const productName = this.getProductName(element);
        const productPrice = element.find('.card.product-card .price .after').html()?.trim().substring(0, element.find('.card.product-card .price .after').html()?.trim().lastIndexOf(' ')) || '';
        const isRewardsProgram = element.find('span.ProductCard__BadgeLabel.ProductCard__BadgeLabel--discount').html()?.trim() || '';
        const imageUrl = element.find('.img-holder.lazy').attr('data-src');
        const imageName = imageUrl ? this.getImageNameFromUrl(imageUrl) : '';
        extracteduUrls.push(imageUrl);
        const nameTranslated = await this.translate(productName);
        const categoryTranslated = await this.translate(productCategory);

        console.log('Raw Product:', productName, productCategory, productPrice);
        const prdct: Product = {
          "id": null,
          "englishName": (`${productName}` != '') ? `${productName}` : null,
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
                "id": 4,
                "name": "Metro Markets",
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
    console.log('Extracted Products:', products);
    this.extractedProducts = products;
    this.urls = extracteduUrls;

    if (this.isInsertChecked == true && products.length != 0) {
      await this.addProduct(products);
    }
  }

  async returnPageIndexHTML(html: string): Promise<string> {
    const $ = cheerio.load(html);
    const pageItem = $('nav > ul > li.page-item').eq(-2).find('a').html()?.trim() || '';
    return pageItem;
  }

  async extractProducts(): Promise<void> {
    const myButton = document.querySelector('.styled-button') as HTMLButtonElement;
    myButton.disabled = true;
    myButton.classList.add('disabled-link');
    const urls = [
      'https://www.metro-markets.com/categoryl1/Bakery/9',
      'https://www.metro-markets.com/categoryl1/Beverage/22',
      'https://www.metro-markets.com/categoryl1/Canned-Food/14',
      'https://www.metro-markets.com/categoryl1/Confectionary/20',
      'https://www.metro-markets.com/categoryl1/Dairy/6',
      'https://www.metro-markets.com/categoryl1/Deli/5',
      'https://www.metro-markets.com/categoryl1/Fresh-Juices/8',
      'https://www.metro-markets.com/categoryl1/Frozen-Food/10',
      'https://www.metro-markets.com/categoryl1/Fruit/1',
      'https://www.metro-markets.com/categoryl1/Commodities/15',
      'https://www.metro-markets.com/categoryl1/Health&-Beauty/28',
      'https://www.metro-markets.com/categoryl1/Home-Bake/16',
      'https://www.metro-markets.com/categoryl1/Home-&Fabric-Care/26',
      'https://www.metro-markets.com/categoryl1/Hot-Drinks/21',
      'https://www.metro-markets.com/categoryl1/Milk/18',
      'https://www.metro-markets.com/categoryl1/Paper-Products/25',
      'https://www.metro-markets.com/categoryl1/Pets/17',
      'https://www.metro-markets.com/categoryl1/Sea-Food/13',
      'https://www.metro-markets.com/categoryl1/Snacks/19',
      'https://www.metro-markets.com/categoryl1/Vegetables/3'
    ];
    for (const url of urls) {
      try {
        const html = await this.scraperService.scrapeWebsite(url).toPromise();
        let pageIndex = await this.returnPageIndexHTML(html);

        for (let i = 1; i < (parseInt(pageIndex)) + 1; i++) {
          const parserUrl = url + '?page=' + i;
          try {
            const html = await this.scraperService.scrapeWebsite(parserUrl).toPromise();
            await this.parseHTML(html);
          } catch (error) {
            console.error('Error fetching or processing data:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      } finally {
        // Re-enable the button after the operation is completed (success or failure)
        // myButton.disabled = false;
        // myButton.classList.remove('disabled-link');
      }
    }
  }

  private getProductName(element: any): string {
    return element.find('.card.product-card h5').html()?.trim().replace(/&amp;/g, '') || '';
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

  async addProduct(product: any) {
    try {
      // Call the backend API to add the products
      const response = await this.http.post('https://checkluxury.ddns.net:443/api/savePriceAll', product).toPromise();
      console.log('Product added successfully', response);
    } catch (error: any) {
      console.log('Adding products to DB:', error.error?.text || error.message);
    }
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