import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../countries.service';
import { Location } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.component.html',
  styleUrls: ['./all-countries.component.css'],
  providers: [Location]
})
export class AllCountriesComponent implements OnInit {

  public p: number = 1;
  public allCountries: any = [];

  constructor(private route: ActivatedRoute, private router: Router, private countriesService: CountriesService, private location: Location, private uiLoader: NgxUiLoaderService, private toastr: ToastrService) { }

  ngOnInit() {

    this.uiLoader.start(); // loader starts...
    setTimeout(() => {
      this.uiLoader.stop();
    }, 500); // loader ends...

    let myRegion = this.route.snapshot.paramMap.get('region') // capturing the current region
    console.log(myRegion);

    this.countriesService.getAllCountries(myRegion).subscribe((apiResponse) => {
      this.allCountries = apiResponse;
      console.log(this.allCountries)
    })

  }

  //previouspage function starts...
  public goBackToPreviousPage() {
    this.location.back();

  } // previous page function ends...

  // language filter function starts...
  public goToLanguageFilter(data) {
    console.log(data)
    this.countriesService.getLanguageWiseCountries(data).subscribe((apiResponse) => {
      console.log(apiResponse)
      this.allCountries = apiResponse;
      this.toastr.success('Language filter applied successfully.', 'Success!');
    })

  } // language filter function ends...

  // currency filter function starts...
  public goToCurrencyFilter(data) {
    console.log(data)
    this.countriesService.getCurrencyWiseCountries(data).subscribe((apiResponse) => {
      console.log(apiResponse)
      this.allCountries = apiResponse;
      this.toastr.success('Currency filter applied successfully.', 'Success!');
    })

  } // currency filter function ends...

}
