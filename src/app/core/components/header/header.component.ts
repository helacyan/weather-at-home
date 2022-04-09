import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin, interval, map, Subscription } from 'rxjs';
import { CitiesDataService } from 'src/app/weather/services/cities-data.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sub!: Subscription;
  isTracking: boolean = false;

  constructor(
    private modalService: ModalService,
    public citiesService: CitiesDataService,
    private http: HttpClient,
  ) {}

  intervalStream$ = interval(12000)

  ngOnInit(): void {
  }

  open() {
    this.modalService.open()
  }

  startTracking() {
    this.isTracking = true
    this.sub = this.intervalStream$
    .pipe(map(() => {
      let keys = []
      let weatherBase = `https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/`
      const newQuery = `?apikey=${this.citiesService.apiKey}&metric=true`
      let reqs = []
      let multiCall

      for (const [key, value] of Object.entries(this.citiesService.citiesData)) {
        keys.push(value.key)
        }
      for (let i = 0; i < keys.length; i++) {
        let reqTemplate = this.http.get(`${weatherBase + keys[i] + newQuery}`);
        reqs.push(reqTemplate)
      }

      multiCall = forkJoin(reqs);
      return multiCall.subscribe(
        (data: Array<any>) => {
          this.citiesService.citiesData.forEach((city, i) => {
            city.weatherIcon = data[i][0].WeatherIcon - 0 >= 10 ? `https://developer.accuweather.com/sites/default/files/${data[i][0].WeatherIcon}-s.png` : `https://developer.accuweather.com/sites/default/files/0${data[i][0].WeatherIcon}-s.png`
            city.temperature = data[i][0].Temperature.Value
            city.precipitation = data[i][0].IconPhrase
          })
          localStorage.setItem('Data', JSON.stringify(this.citiesService.citiesData));
        },err => {
          console.error(err)
        },() => console.log("done")
      )
    })
    ).subscribe((response) => {
    })
  }

  stopTracking() {
    this.isTracking = false
    this.sub.unsubscribe()
  }

}
