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
  selector: 'app-OscarParserComponent',
  templateUrl: 'oscar-parser.component.html',
  styleUrls: ['oscar-parser.component.css']
})
export class OscarParserComponent implements OnInit {
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
    console.log('Number of Products:', $('.row.w-100 .col-md-3.col-sm-4.col-6.p-1').length);

    const productCategory = $('.breadcrumb-item.active').html()?.trim().match(/\b\w+\b/)?.[0] || '';

    for (let index = 0; index < $('.row.w-100 .col-md-3.col-sm-4.col-6.p-1').length; index++) {
      console.log(`Processing Product ${index + 1}`);
      const element = $('.row.w-100 .col-md-3.col-sm-4.col-6.p-1').eq(index);

      try {
        const productName = this.getProductName(element);
        const productPrice = element.find('span.c_red.f-15').html()!.trim().match(/(\d+(\.\d+)?)/)![1] || '';
        const isRewardsProgram = element.find('span.c_green.f-12').html()?.trim() || '';
        const imageUrl = element.find('img.card-img-top').attr('src');
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
                "id": 5,
                "name": "Oscar Markets",
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
    const pageItem = $('.pagination a.page-link').eq(-2).html()?.trim() || '';
    return pageItem;
  }

  async extractProducts(): Promise<void> {
    const myButton = document.querySelector('.styled-button') as HTMLButtonElement;
    let pageIndex: string;
    myButton.disabled = true;
    myButton.classList.add('disabled-link');
    const urls = [
      'https://www.oscarstores.com/products/5637164895',
      'https://www.oscarstores.com/products/5637185839',
      'https://www.oscarstores.com/products/5637185845',
      'https://www.oscarstores.com/products/5637185852',
      'https://www.oscarstores.com/products/5637186576',
      'https://www.oscarstores.com/products/5637164849',
      'https://www.oscarstores.com/products/5637186599',
      'https://www.oscarstores.com/products/5637164863',
      'https://www.oscarstores.com/products/5637184326',
      'https://www.oscarstores.com/products/5637186624',
      'https://www.oscarstores.com/products/5637165004',
      'https://www.oscarstores.com/products/5637186687',
      'https://www.oscarstores.com/products/5637165024',
      'https://www.oscarstores.com/products/5637165034'
    ];

    for (const url of urls) {
      try {
        const html = await this.getHtmlFromWeb(url);
        let pageIndex = await this.returnPageIndexHTML(html);
        
        for (let i = 1; i < (parseInt(pageIndex)) + 1; i++) {
          const parserUrl = url + '?page=' + i;
          try {
            const html = await this.getHtmlFromWeb(parserUrl);
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
    return element.find('h5.my-2.one-lines.ellipse.text-left.f_oswald.c_black.f-16.text-capitalize.f-w_bold')
    .html()?.trim() || '';
  }

  private async getHtmlFromWeb(url: string): Promise<string> {
    const requestData = { url };

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    try {
      const data = await this.http.post<{ html: string }>('http://localhost:3000/scrape', requestData, { headers }).toPromise();
      // Check if data is not undefined before accessing its properties
      if (data !== undefined) {
        return data.html;
      } else {
        throw new Error('Response data is undefined');
      }
    } catch (error) {
      console.error('Error scraping website:', error);
      throw new Error('Failed to fetch HTML');
    }
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