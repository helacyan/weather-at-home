import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesDataService {
  citiesData: any[] = [];
  citiesNames: any = []
  apiKey: string = 'p6foGnRfOoOtCAnABMbGS3XwAhmfbbrM'

  constructor() { }


}
