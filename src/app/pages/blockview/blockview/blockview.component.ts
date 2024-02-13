import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpPersonService } from 'src/app/http-person.service';
import { Person } from 'src/app/models/person';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-blockview',
  templateUrl: './blockview.component.html',
  styleUrls: ['./blockview.component.css'],
})
export class BlockviewComponent implements OnInit {
  constructor(
    private httpPerson: HttpPersonService,
    private themeService: ThemeService
  ) {}

  mode: boolean | undefined;
  people: Person[] = [];

  ngOnInit(): void {
    this.getPeople();
    this.themeService.currentDarkMode.subscribe(
      (modeValue) => (this.mode = modeValue)
    );
  }

  getPeople() {
    this.httpPerson.getPeople().subscribe((person) => {
      this.people = person;
      console.log(this.people);
    });
  }

  changeMode() {
    this.themeService.changeDarkMode(!this.mode);
    console.log('Mode change from blockview: ' + this.mode);
  }
}
