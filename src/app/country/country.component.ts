import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CountriesService } from '../countries.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  public currentCountry:any = [];

  constructor(private route: ActivatedRoute, private router: Router, private countriesService: CountriesService, private location: Location, private uiLoader: NgxUiLoaderService) { }

  ngOnInit() {

    // loder starts...
    this.uiLoader.start();
    setTimeout(() => {
      this.uiLoader.stop();
    }, 100); // loader ends...

    var myCountry = this.route.snapshot.paramMap.get('name') // capturing current country name...
    console.log(myCountry)

    this.countriesService.getCountryInfo(myCountry).subscribe((apiResponse) => {
      console.log(apiResponse);
      for (let i = 0; i < apiResponse.length; i++) {
        this.currentCountry = apiResponse[i];
      }
      console.log(this.currentCountry)
    })

  }

  // previous page function starts...
  public goBack() {
    this.location.back()

  }// previous page function ends...

}
