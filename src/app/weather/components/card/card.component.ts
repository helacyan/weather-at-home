import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CitiesDataService } from '../../services/cities-data.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {

  constructor(public citiesService: CitiesDataService,) { }

  @Input() card!: { cityName: string; weatherIcon: string; temperature: number; precipitation: string; };
  public isChangedBlock = false;

  ngOnInit(): void {}

  deleteCard() {
    let result = confirm('Вы уверены, что хотите удалить город из списка?')
    if (result) {
    this.citiesService.citiesData = this.citiesService.citiesData.filter(city => city.cityName !== this.card.cityName)
    localStorage.setItem('Data', JSON.stringify(this.citiesService.citiesData));
    }
  }

}
