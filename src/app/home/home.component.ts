import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/countries.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public allRegions :any;

  constructor(public countriesService: CountriesService, private uiLoader: NgxUiLoaderService) { }

  ngOnInit() {

    // loader starts...
    this.uiLoader.start();
    setTimeout(() => {
      this.uiLoader.stop();
    }, 100); // loader ends...

    this.countriesService.getAllRegions().subscribe(
      apiResponse => {
        console.log(apiResponse);
        console.log(typeof apiResponse);
        console.log(Array.isArray(apiResponse));
        let list: any[] = []; // creating empty list...
        for (let i = 0; i < apiResponse.length; i++) {
          list.push(apiResponse[i].region); // pushing data into the list...
        }
        let set = new Set(list); // creating Set to get unique regions name...
        console.log(set);
        set.delete("");// deleting the empty region name for better ui...
        console.log(set);
        this.allRegions = set;
        console.log(this.allRegions);

      })
  }


}
