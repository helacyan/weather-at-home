import { Component, OnInit } from '@angular/core';
import { CitiesDataService } from '../../services/cities-data.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor(public citiesService: CitiesDataService,) {
  }

  ngOnInit(): void {
    this.citiesService.citiesData = JSON.parse(localStorage.getItem('Data') || '[]');
    this.citiesService.citiesNames = []
    if (this.citiesService.citiesData.length > 0 ) {
      for (const [key, value] of Object.entries(this.citiesService.citiesData)) {
        this.citiesService.citiesNames.push(value.cityName)
      }
    }

  }

}
