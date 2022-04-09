import { Component, OnInit } from '@angular/core';
import {concatMap, debounceTime, map, Observable, Subject} from 'rxjs';
import {ModalService} from '../../services/modal.service';
import { HttpClient } from '@angular/common/http';
import { CitiesDataService } from 'src/app/weather/services/cities-data.service';
import { ICityFullResponse, IFullWeather, ILocation, IWeather } from '../../../weather/models/cards-result.model'


@Component({
  selector: 'app-modal',
  templateUrl: './modal-outlet.component.html',
  styleUrls: ['./modal-outlet.component.scss'],

})
export class ModalOutletComponent implements OnInit {

  display$: Observable<'open' | 'close'> | undefined;
  cities: Observable<ILocation> | undefined
  selectedCity = '';
  selectedCityCode: string = ''
  citiesNames = [];
  clear: string = ''
  detectedChangeRef = false

  private subjectInput = new Subject<string>();

  constructor(
      private modalService: ModalService,
      private http: HttpClient,
      private citiesService: CitiesDataService,
  ) {}

  ngOnInit() {
    this.display$ = this.modalService.watch();
    this.subjectInput
    .pipe(debounceTime(1000))
    .subscribe((d) => this.getNewCities(d)
    );

  }

  onSearch($event: {term: string}) {
    const value = $event.term;
    this.subjectInput.next(value);
  }

  getCities(value: string) {
    let base = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete'
    const query = `?apikey=${this.citiesService.apiKey}&q=${value}`
    return this.http
      .get<ILocation>(`${base + query}`)
      .pipe(map(d => {
        return d
      }
      ));
  }

  onChange($event: {}) {
    if ($event) {
      for (const [key, value] of Object.entries($event)) {
        key === '$ngOptionLabel'? this.selectedCity = `${value}` : null
      }
    }
    this.detectedChangeRef ? this.detectedChangeRef = false : this.detectedChangeRef = true
  }

  getNewCities(value: string) {
    return this.cities = this.getCities(value)
  }

  addCity () {
    let addBase = 'https://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${this.citiesService.apiKey}&q=${this.selectedCity}`
    const newQuery = `?apikey=${this.citiesService.apiKey}&metric=true`
    let weatherBase = `https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${this.selectedCityCode}`
    return this.http.get<Array<ICityFullResponse>>(`${addBase + query}`)
      .pipe(
        concatMap((res) => {
        this.selectedCityCode = res[0].Key
        weatherBase = `https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${res[0].Key}`
         return this.http.get<Array<IFullWeather>>(`${weatherBase + newQuery}`)
        }),
      )
      .subscribe((res) => {
        const cityObj: IWeather = {
          cityName: '',
          weatherIcon: '',
          temperature: 0,
          precipitation: '',
          key: ''
        };
        cityObj.cityName = this.selectedCity.trim()
        cityObj.weatherIcon = res[0].WeatherIcon - 0 >= 10 ? `https://developer.accuweather.com/sites/default/files/${res[0].WeatherIcon}-s.png` : `https://developer.accuweather.com/sites/default/files/0${res[0].WeatherIcon}-s.png`
        cityObj.temperature = res[0].Temperature.Value
        cityObj.precipitation = res[0].IconPhrase
        cityObj.key = this.selectedCityCode
        this.citiesService.citiesData.push(cityObj)
        localStorage.setItem('Data', JSON.stringify(this.citiesService.citiesData));
        if (this.citiesService.citiesData.length > 0 ) {
          for (const [key, value] of Object.entries(this.citiesService.citiesData)) {
            this.citiesService.citiesNames.push(value.cityName.trim())
          }
        }
        this.clear = ''
        this.detectedChangeRef = true
        this.selectedCity = ''
    })
    }

    close() {
    this.modalService.close();
    }

}
