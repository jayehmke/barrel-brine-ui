import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { LocationService } from '../lib/location/location.service';
import { CategoryService } from '../lib/category/category.service';
import { GmapsService } from "../lib/gmaps/gmaps.service"
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'locations',
  providers: [
    LocationService,
    CategoryService,
    GmapsService
  ],
  styleUrls: ['./locations.component.scss'],
  templateUrl: './locations.component.html'
})
export class LocationsComponent implements OnInit {

  public params: any;
  public markers: any;
  public locations: any;
  public zoom: number = 8;
  public lng: number = -78.8823097;
  public lat: number = 42.893202;
  public categories: [{
    _id: string,
    name: string,
    icon: string,
    key: string,
  }];
  public latlngBounds: null;
  public zipCode: null;
  public watcher: Subscription;
  public activeMediaQuery = '';
  public openFilters: boolean = true;
  public step: number = 1;
  public min: number = 1;
  public max: number = 100;
  public distance: number;
  private selectedProducts: any;

  constructor(public route: ActivatedRoute,
              public location: LocationService,
              public categoryService: CategoryService,
              public gmapsService: GmapsService,
              media: ObservableMedia,
              private mapsAPILoader: MapsAPILoader) {



    this.mapsAPILoader.load().then(() => {
      this.latlngBounds = new window['google'].maps.LatLngBounds();

    });

    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';

      this.openFilters = change.mqAlias !== 'xs';
    });

  }

  public ngOnInit() {

    this.params = {};

    this.fetchLocations();
    this.fetchCategories();
    this.selectedProducts = [];

  }

  public toggleProduct(index: number) {
    const selectedProduct = this.categories[index]._id;

    if (this.selectedProducts[index]) {
      this.selectedProducts.splice(index, 1);
    } else {
      this.selectedProducts[index] = selectedProduct;
    }

    if (this.selectedProducts.length === 0) {
      delete this.params['categories']
    } else {
      this.params['categories'] = this.selectedProducts;
    }

    this.fetchLocations();

  }

  public requestUserLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }));


        this.params.coordinates = JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        this.fetchLocations();
      });
    } else {
      console.log('User location not allowed')
    }

  }

  public onDistanceChange(event) {
    this.params.range = event.value;
    this.fetchLocations();
  }

  public getByZip() {
    this.gmapsService.getGeocoding(this.zipCode).subscribe((data) => {

      this.params.coordinates = JSON.stringify({
        lat: data.lat(),
        lng: data.lng(),
      });

      this.fetchLocations();

    });
  }

  private fetchCategories() {
    this.categoryService.getData().subscribe((data) => {

      this.categories = data['categories'];

    });
  }

  private fetchLocations() {
    this.location.getData(this.params).subscribe((data) => {

      this.locations = data['locations'];
      this.markers = this.locations.map((location) => {
        return {
          lat: location.address.geo[1],
          lng: location.address.geo[0],
          label: null,
          draggable: false
        }
      })

    });
  }


}
