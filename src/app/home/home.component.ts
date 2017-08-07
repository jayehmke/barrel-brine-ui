import {
  Component,
  OnInit
} from '@angular/core';

import {AppState} from '../app.service';
import {Title} from './title';
import {BannerService} from '../lib/banner/banner.service';
import {ProductService} from '../lib/product/product.service';

@Component({
  selector: 'home',  // <home></home>
  providers: [
    Title,
    BannerService,
    ProductService,
  ],
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public config: Object = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 10,

    slidesPerView: 3,
  };

  public selectedTab: any;

  public banners: any;
  public products: any;

  /**
   * Set our default values
   */
  public localState = {value: ''};

  /**
   * TypeScript public modifiers
   */
  constructor(public appState: AppState,
              public title: Title,
              public productService: ProductService,
              public bannerService: BannerService,) {
  }

  public ngOnInit() {

    this.banners = [];
    this.products = [];
    this.selectedTab = 0;

    this.startTimer();


    this.bannerService.getData().subscribe((data) => {

      this.banners = data['banners'];

    });

    this.productService.getData().subscribe((data) => {

      this.products = data['products'];

    });


  }

  public startTimer = () => {
    setTimeout(() => {
      this.selectedTab += 1;
      this.startTimer();
      if (this.selectedTab >= this.banners.length) {
        this.selectedTab = 0;
      }

    }, 3000);
  };

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
