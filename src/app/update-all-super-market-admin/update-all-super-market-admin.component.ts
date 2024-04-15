import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as cheerio from 'cheerio';
import { TranslationService } from '../services/translation-service.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Clipboard } from '@angular/cdk/clipboard';
import { map } from 'rxjs/operators';


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
  selector: 'app-UpdateAllSuperMarketAdminComponent',
  templateUrl: 'update-all-super-market-admin.component.html',
  styleUrls: ['update-all-super-market-admin.component.css']
})
export class UpdateAllSuperMarketAdminComponent implements OnInit {
  @ViewChild('divToCopy', { static: false }) divToCopy!: ElementRef;
  @ViewChild('divUrlToCopy', { static: false }) divUrlToCopy!: ElementRef;
  isTranslateChecked: any = false;
  isDownloadChecked: any = false;


  ngOnInit(): void {
  }
  extractedProducts: Product[] = [];
  isInsertChecked: boolean = true;
  isInsertorUpdateChecked: boolean = false;
  urls: any[] = [];

  constructor(private translationService: TranslationService, private http: HttpClient, private clipboard: Clipboard,) { }

  async updateAll(): Promise<void> {
    const timeoutInHours = 6;
    const timeoutInMilliseconds = timeoutInHours * 60 * 60 * 1000; // Convert hours to milliseconds

    // while (true) {
    // Record the start time
    const startTime = new Date();

    await this.extractProductsCarrefour();
    await this.extractProductsSeoudi();
    await this.extractProductsSpinneys();
    await this.extractProductsOscar();
    await this.extractProductsMetro();

    // Record the end time
    const endTime = new Date();

    // Calculate the time difference in milliseconds
    const timeDiffMs = endTime.getTime() - startTime.getTime();

    // Convert milliseconds to hours
    const hoursElapsed = timeDiffMs / (1000 * 60 * 60);

    // Log the hours elapsed
    console.log(`Cycle Done, Hours Elapsed: ${hoursElapsed}`);

    // const timeoutId = setTimeout(() => {
    //   console.log('Timeout of 6 hours has elapsed.');
    // }, timeoutInMilliseconds);
    // }

  }

  async parseHTMLMetro(html: string): Promise<void> {
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
        const productName = this.getProductNameMetro(element);
        const productPrice = element.find('.card.product-card .price .after').html()?.trim().substring(0, element.find('.card.product-card .price .after').html()?.trim().lastIndexOf(' ')) || '';
        const isRewardsProgram = element.find('span.ProductCard__BadgeLabel.ProductCard__BadgeLabel--discount').html()?.trim() || '';
        const imageUrl = element.find('.img-holder.lazy').attr('data-src');
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

  async returnPageIndexHTMLMetro(html: string): Promise<string> {
    const $ = cheerio.load(html);
    const pageItem = $('nav > ul > li.page-item').eq(-2).find('a').html()?.trim() || '';
    return pageItem;
  }

  async extractProductsMetro(): Promise<void> {
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
        const html = await this.getHtmlFromWebMetro(url);
        let pageIndex = await this.returnPageIndexHTMLMetro(html);

        for (let i = 1; i < (parseInt(pageIndex)) + 1; i++) {
          const parserUrl = url + '?page=' + i;
          try {
            const html = await this.getHtmlFromWebMetro(parserUrl);
            await this.parseHTMLMetro(html);
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

  private getProductNameMetro(element: any): string {
    return element.find('.card.product-card h5').html()?.trim().replace(/&amp;/g, '') || '';
  }

  private async getHtmlFromWebMetro(url: string): Promise<string> {
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

  async parseHTMLOscar(html: string): Promise<void> {
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
        const productName = this.getProductNameOscar(element);
        const productPrice = element.find('span.c_red.f-15').html()!.trim().match(/(\d+(\.\d+)?)/)![1] || '';
        const isRewardsProgram = element.find('span.c_green.f-12').html()?.trim() || '';
        const imageUrl = element.find('img.card-img-top').attr('src');
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

  async returnPageIndexHTMLOscar(html: string): Promise<string> {
    const $ = cheerio.load(html);
    const pageItem = $('.pagination a.page-link').eq(-2).html()?.trim() || '';
    return pageItem;
  }

  async extractProductsOscar(): Promise<void> {
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
        const html = await this.getHtmlFromWebOscarMetro(url);
        let pageIndex = await this.returnPageIndexHTMLOscar(html);

        for (let i = 1; i < (parseInt(pageIndex)) + 1; i++) {
          const parserUrl = url + '?page=' + i;
          try {
            const html = await this.getHtmlFromWebOscarMetro(parserUrl);
            await this.parseHTMLOscar(html);
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

  private getProductNameOscar(element: any): string {
    return element.find('h5.my-2.one-lines.ellipse.text-left.f_oswald.c_black.f-16.text-capitalize.f-w_bold')
      .html()?.trim() || '';
  }

  private async getHtmlFromWebOscarMetro(url: string): Promise<string> {
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

  async extractProductsSpinneys(): Promise<void> {
    const myButton = document.querySelector('.styled-button') as HTMLButtonElement;
    myButton.disabled = true;
    myButton.classList.add('disabled-link');

    const urls = [
      'https://spinneys-egypt.com/en/category/fruits-vegetables',
      'https://spinneys-egypt.com/en/category/meat-poultry',
      'https://spinneys-egypt.com/en/seafood-fish',
      'https://spinneys-egypt.com/en/category/grocery',
      'https://spinneys-egypt.com/en/category/bakery-bread',
      'https://spinneys-egypt.com/en/category/cheese-dairy-eggs-cold-cuts',
      'https://spinneys-egypt.com/en/cold-cuts-deli',
      'https://spinneys-egypt.com/en/category/beverages',
      'https://spinneys-egypt.com/en/category/frozen-food',
      'https://spinneys-egypt.com/en/category/sweets-snacks',
      'https://spinneys-egypt.com/en/category/healthy-specialty',
      'https://spinneys-egypt.com/en/category/pets',
      'https://spinneys-egypt.com/en/category/baby',
      'https://spinneys-egypt.com/en/category/cleaning',
      'https://spinneys-egypt.com/en/category/beauty-personal-care'
    ];

    for (const url of urls) {

      try {
        const html = await this.getHtmlFromWebSpinneys(url);
        await this.parseHTMLSpinneys(html);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
      finally {
        // Re-enable the button after the operation is completed (success or failure)
        // myButton.disabled = false;
        // myButton.classList.remove('disabled-link');
      }
    }
  }

  private getProductNameSpinneys(element: any): string {
    return element.find('p.product-name.text-base.text-black').html()?.trim() || '';
  }

  async parseHTMLSpinneys(html: string): Promise<void> {
    const $ = cheerio.load(html);
    const products: Product[] = [];
    const extracteduUrls: any[] = [];

    // Log the number of product elements found
    console.log('Number of Products:', $('article.ProductCard.bg-white.border.border-secondary-300.rounded-2xs.overflow-hidden.ProductCard--is-groceries').length);

    let productCategory: any = $("h1.mt-4.md\\:mt-8.text-xl.md\\:text-4xl.text-black.font-light.antialiased").html()?.trim() || '';
    productCategory = this.extractTextFromStrongSpinneys(productCategory);

    for (let index = 0; index < $('article.ProductCard.bg-white.border.border-secondary-300.rounded-2xs.overflow-hidden.ProductCard--is-groceries').length; index++) {
      console.log(`Processing Product ${index + 1}`);
      const element = $('article.ProductCard.bg-white.border.border-secondary-300.rounded-2xs.overflow-hidden.ProductCard--is-groceries').eq(index);

      try {
        const productName = this.getProductNameSpinneys(element);
        const productPrice = element.find('div.flex.items-center span.font-bold').html()?.trim().substring(0, element.find('div.flex.items-center span.font-bold').html()?.trim().lastIndexOf(' ')) || '';
        const isRewardsProgram = element.find('span.PriceBefore.text-gray-700.font-light').html()?.trim() || '';
        const imageUrl = element.find('img.ProductCard__Thumb').attr('src');
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
      await this.addProduct(products);
    }
    console.log('Extracted Products:', products);
    this.extractedProducts = products;
    this.urls = extracteduUrls;
  }

  private async getHtmlFromWebSpinneys(url: string): Promise<string> {
    try {
      const data = await this.http.get<{ html: string }>('http://localhost:3030/scrapeSpinneys', { params: { url } }).toPromise();
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

  extractTextFromStrongSpinneys(htmlString: string): string | null {
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

  async extractProductsSeoudi(): Promise<void> {
    const myButton = document.querySelector('.styled-button') as HTMLButtonElement;
    myButton.disabled = true;
    myButton.classList.add('disabled-link');

    const urls = [
      'https://seoudisupermarket.com/en/fruits-vegetables-2',
      'https://seoudisupermarket.com/en/meat-poultry',
      'https://seoudisupermarket.com/en/dairy-eggs-cheese',
      'https://seoudisupermarket.com/en/cold-cuts-deli',
      'https://seoudisupermarket.com/en/chilled-food',
      'https://seoudisupermarket.com/en/bakery',
      'https://seoudisupermarket.com/en/fish-seafood',
      'https://seoudisupermarket.com/en/snacks-sweets',
      'https://seoudisupermarket.com/en/food-cupboard',
      'https://seoudisupermarket.com/en/beverages',
      'https://seoudisupermarket.com/en/hot-drinks',
      'https://seoudisupermarket.com/en/frozen-food-2023',
      'https://seoudisupermarket.com/en/healthy-and-nutrition',
      'https://seoudisupermarket.com/en/baby-care',
      'https://seoudisupermarket.com/en/cleaning-and-household',
      'https://seoudisupermarket.com/en/beauty-and-personal-care',
      'https://seoudisupermarket.com/en/pet-supplies'
    ];

    for (const url of urls) {

      try {
        const html = await this.getHtmlFromWebSeoudi(url);
        await this.parseHTMLSeoudi(html);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
      finally {
        // Re-enable the button after the operation is completed (success or failure)
        // myButton.disabled = false;
        // myButton.classList.remove('disabled-link');
      }
    }

  }

  async parseHTMLSeoudi(html: string): Promise<void> {
    const $ = cheerio.load(html);
    const products: Product[] = [];
    const extracteduUrls: any[] = [];

    // Log the number of product elements found
    console.log('Number of Products:', $('article.ProductCard').length);

    const productCategory = $('h1.mt-3.lg\\:mt-6.text-4xl.font-semibold.text-primary-700.antialiased.tracking-wide.mt-3').html()?.trim().replace(/&amp;/g, '') || '';

    for (let index = 0; index < $('article.ProductCard').length; index++) {
      console.log(`Processing Product ${index + 1}`);
      const element = $('article.ProductCard').eq(index);

      try {
        const productName = this.getProductNameSeoudi(element);
        const productPrice = element.find('span.font-bold').html()?.trim().substring(0, element.find('span.font-bold').html()?.trim().lastIndexOf(' ')) || '';
        const isRewardsProgram = element.find('span.ProductCard__BadgeLabel.ProductCard__BadgeLabel--discount').html()?.trim() || '';
        const imageUrl = element.find('img').attr('src');
        const imageName = imageUrl ? this.getImageNameFromUrl(imageUrl) : '';
        extracteduUrls.push(imageUrl);
        let nameTranslated = '';
        let categoryTranslated = `${productCategory}`;
        if (this.isTranslateChecked) {
          nameTranslated = await this.translate(productName);
          categoryTranslated = await this.translate(productCategory);
          categoryTranslated = `${productCategory} - ${categoryTranslated}`
        }

        if (this.isDownloadChecked)
          this.downloadImage(imageUrl);

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
              "value": parseFloat(productPrice.trim()),
              "product": null,
              "supermarket": {
                "id": 3,
                "name": "Seoudi Supermarket",
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
      await this.addProduct(products);
    }
    console.log('Extracted Products:', products);
    this.extractedProducts = products;
    this.urls = extracteduUrls;
  }

  private async getHtmlFromWebSeoudi(url: string): Promise<string> {
    try {
      const data = await this.http.get<{ html: string }>('http://localhost:3020/scrapeSeoudi', { params: { url } }).toPromise();
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

  private getProductNameSeoudi(element: any): string {
    return element.find('a.ProductCard__Name').html()?.trim() || '';
  }

  async extractProductsCarrefour(): Promise<void> {
    const myButton = document.querySelector('.styled-button') as HTMLButtonElement;
    myButton.disabled = true;
    myButton.classList.add('disabled-link');

    const urls = [
      'https://www.carrefouregypt.com/mafegy/en/c/FEGY1600000',
      'https://www.carrefouregypt.com/mafegy/en/c/FEGY1660000',
      'https://www.carrefouregypt.com/mafegy/en/c/FEGY1700000',
      'https://www.carrefouregypt.com/mafegy/en/c/FEGY1500000',
      'https://www.carrefouregypt.com/mafegy/en/c/FEGY1000000',
      'https://www.carrefouregypt.com/mafegy/en/c/FEGY6000000',
      'https://www.carrefouregypt.com/mafegy/en/c/FEGY1200000',
      'https://www.carrefouregypt.com/mafegy/en/c/FEGY1610000',
      'https://www.carrefouregypt.com/mafegy/en/c/FEGY1100000',
      'https://www.carrefouregypt.com/mafegy/en/c/NFEGY2000000',
      'https://www.carrefouregypt.com/mafegy/en/c/NFEGY3000000'
    ];

    for (const url of urls) {

      try {
        const html = await this.getHtmlFromWebCarrefour(url);
        await this.parseHTMLCarrefour(html);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
      finally {
        // Re-enable the button after the operation is completed (success or failure)
        // myButton.disabled = false;
        // myButton.classList.remove('disabled-link');
      }
    }


  }

  async parseHTMLCarrefour(html: string): Promise<void> {
    const $ = cheerio.load(html);
    const products: Product[] = [];
    const extracteduUrls: any[] = [];
    // Log the number of product elements found
    console.log('Number of Products:', $('div[data-testid="product_card_image_container"]').length);

    const productCategory = $('h1[data-testid="page-info-header"] > span').html()?.trim() || '';

    // `${productCategory}${productCategoryArabic}`

    for (let index = 0; index < $('.css-yqd9tx').length; index++) {
      console.log(`Processing Product ${index + 1}`);
      const element = $('.css-yqd9tx').eq(index);

      try {
        const productName = this.getProductNameCarrefour(element);
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
      await this.addProduct(products);
    }
    console.log('Extracted Products:', products);
    this.extractedProducts = products;
    this.urls = extracteduUrls;
  }

  private async getHtmlFromWebCarrefour(url: string): Promise<string> {
    try {
      const data = await this.http.get<{ html: string }>('http://localhost:3010/scrapeCarrefour', { params: { url } }).toPromise();
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

  private getProductNameCarrefour(element: any): string {
    const name = element.find('a[data-testid="product_name"]').html()?.trim() || '';
    const addition = element.find('div.css-149zse0').html()?.split('-')[0].trim() || '';
    return (addition != '') ? name + ' - ' + addition : name;
  }

  async translate(originalText: string): Promise<string> {
    const targetLanguage = 'ar';
    const sourceLang = 'en';
    const apiKey = 'AIzaSyC3pbcI68VpRRNVj0knzzNt6eyH3De2O8Y';
    const apiUrl = 'https://translation.googleapis.com/language/translate/v2';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // The request body according to the Google Cloud Translation API documentation
    const requestBody = {
      q: originalText,
      source: sourceLang,
      target: targetLanguage,
      format: 'text'
    };

    try {
      const response = await firstValueFrom(
        this.http.post<any>(`${apiUrl}?key=${apiKey}`, requestBody, { headers }).pipe(
          map(result => result.data.translations[0].translatedText),
        ),
      );
      return response;
    } catch (error: any) {
      console.error('Translation Error:', error);
      return `Error translating text: ${error.message || 'Unknown error'}`;
    }
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

  async addProduct(product: any): Promise<void> {
    try {
      // Call the backend API to add the products
      const response = await this.http.post('https://checkluxury.ddns.net:443/api/savePriceAll', product).toPromise();
      console.log('Product added successfully', response);
    } catch (error: any) {
      console.error('Adding products to DB:', error.error?.text || error.message);
      throw error; // Re-throw the error to handle it further if needed
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