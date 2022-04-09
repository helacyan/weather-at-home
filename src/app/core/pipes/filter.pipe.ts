import { Pipe, PipeTransform } from '@angular/core';
import { CitiesDataService } from 'src/app/weather/services/cities-data.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(public citiesService: CitiesDataService) {
  }

  transform(responseList: any, detectedChangeRef: boolean): any {
    let newList
    if (responseList) {
      newList = responseList.filter((city: any) => {
        return !this.citiesService.citiesNames.includes(city.LocalizedName)
      })
    }

    return newList

  }

}
