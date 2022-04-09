import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  myDate: null | string | Date = new Date();
  devYear = '2022'
  constructor(private datePipe: DatePipe){
  }
  ngOnInit(): void {
    this.myDate = this.datePipe.transform(this.myDate, 'y');
    if (this.myDate) {
      if (this.myDate > this.devYear) {
        this.myDate = `${this.devYear} - ${this.myDate} `
      } else if (this.myDate < this.devYear) {
        this.myDate = `${this.myDate} - ${this.devYear} `
      } else this.myDate = this.devYear
    }
  }

}
