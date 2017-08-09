import {
  Component,
  OnInit
} from '@angular/core';

import {AppState} from '../app.service';
import {Title} from './title';
import {BannerService} from '../lib/banner/banner.service';
import {ProductService} from '../lib/product/product.service';
import {InstagramService} from '../lib/instagram/instagram.service';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'home',  // <home></home>
  providers: [
    Title,
    BannerService,
    ProductService,
    InstagramService,
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
  public igPics: any;

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
              public bannerService: BannerService,
              public fb: FacebookService,
              public igService: InstagramService,) {
  }

  public ngOnInit() {

    this.banners = [];
    this.products = [];
    this.igPics = [];
    this.selectedTab = 0;

    this.startTimer();


    this.bannerService.getData().subscribe((data) => {

      this.banners = data['banners'];

    });

    this.productService.getData().subscribe((data) => {

      this.products = data['products'];

    });

    this.igService.getData().subscribe((data) => {

      this.igPics = data['photos'];

    });

    let initParams: InitParams = {
      appId: '328006423973978',
      xfbml: true,
      version: 'v2.8'
    };

    this.fb.init(initParams);


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
