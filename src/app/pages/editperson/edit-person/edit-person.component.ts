import { Component, OnInit, Input } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person';
import { HttpPersonService } from 'src/app/http-person.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { EditPersonService } from 'src/app/edit-person.service';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css'],
  providers: [DatePipe],
})
export class EditPersonComponent implements OnInit {
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private httpPersonService: HttpPersonService,
    private editPersonService: EditPersonService,
    private datePipe: DatePipe,
    private themeService: ThemeService
  ) {
    this.loadPerson();
  }
  mode: boolean | undefined;

  loadedID: number | undefined;
  person: Person = {
    id: 0,
    first_name: '',
    second_name: '',
    birth_date: new Date(),
    city: '',
    phone_number: '',
    email: '',
    gender: '',
  };

  staticPersonName: string = '';
  staticPersonSurname: string = '';
  // dates for load data from json server and send it to edit person component
  dateInDateFormat: Date | undefined;
  dateInStringFormat: string | undefined;

  genderTable: string[] = ['male', 'female'];

  goBack() {
    this.location.back();
  }

  goToBlockView() {
    this.router.navigateByUrl('/blockview');
  }

  loadPerson() {
    if (this.editPersonService.loadedID) {
      this.loadedID = this.editPersonService.loadedID;
      this.httpPersonService.getPerson(this.loadedID).subscribe((man) => {
        this.person = man;
        this.staticPersonName = man.first_name;
        this.staticPersonSurname = man.second_name;
        this.dateInDateFormat = man.birth_date;
        this.dateInStringFormat = this.dateInDateFormat
          .toString()
          .split('T')[0];
      });
    }
  }

  save() {
    if (this.person.id && this.dateInStringFormat) {
      const newDateString: string =
        this.dateInStringFormat.slice(-2) +
        '.' +
        this.dateInStringFormat.toString().slice(5, 7) +
        '.' +
        this.dateInStringFormat.toString().slice(0, 4);
      const newDateFormatDate = new Date(this.dateInStringFormat);

      this.person.birth_date = newDateFormatDate;

      this.httpPersonService
        .saveEditedPerson(this.person.id, this.person)
        .subscribe();
      this.httpPersonService.getPeople().subscribe();
      this.goToBlockView();
    }
  }

  ngOnInit(): void {
    this.themeService.currentDarkMode.subscribe(
      (modeValue) => (this.mode = modeValue)
    );
  }

  changeMode() {
    this.themeService.changeDarkMode(!this.mode);
    console.log('Mode change from edit-person: ' + this.mode);
  }
}
