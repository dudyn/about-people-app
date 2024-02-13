import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person';
import { HttpPersonService } from 'src/app/http-person.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
})
export class AddPersonComponent implements OnInit {
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private httpPerson: HttpPersonService,
    private themeService: ThemeService
  ) {}

  person: Partial<Person> = {};
  myDate: string = '';
  mode: boolean | undefined;

  genderTable: string[] = ['male', 'female'];

  ngOnInit(): void {
    this.themeService.currentDarkMode.subscribe(
      (modeValue) => (this.mode = modeValue)
    );
  }

  goBack() {
    this.location.back();
  }

  getPeople() {
    this.httpPerson.getPeople().subscribe();
  }

  goToBlockView() {
    this.router.navigateByUrl('/blockview');
  }

  send() {
    const newDateString: string =
      this.myDate.slice(-2) +
      '.' +
      this.myDate.toString().slice(5, 7) +
      '.' +
      this.myDate.toString().slice(0, 4);
    const newDateFormatDate = new Date(this.myDate);
    this.person.birth_date = newDateFormatDate;

    console.log(this.person);

    this.addPerson();
    this.getPeople();
    this.goToBlockView();
  }

  addPerson() {
    console.log('Person z funkcji addPerson(): ', this.person);
    this.httpPerson.addPerson(this.person).subscribe();
  }

  showValue(fn: NgModel) {
    console.log(fn);
  }

  changeMode() {
    this.themeService.changeDarkMode(!this.mode);
    console.log('Mode change from add=person: ' + this.mode);
  }
}
