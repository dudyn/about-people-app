import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { HttpPersonService } from 'src/app/http-person.service';
import { Person } from 'src/app/models/person';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-lineview',
  templateUrl: './lineview.component.html',
  styleUrls: ['./lineview.component.css'],
})
export class LineviewComponent implements OnInit {
  constructor(
    private httpPerson: HttpPersonService,
    private themeService: ThemeService
  ) {
    this.filterBy = '';
    this.isFilteringEnabled = false;
    this.isSortingEnabled = false;
  }

  // sprawdza czy popup z wybieraniem pola do filtrowania jest otwarty
  isFilterOptionsOpen: boolean = false;
  // wartosc filtrujaca, np. imie zaczynajace sie na litere A..
  filterValue: string = '';
  // pole do filtrowania, np, imie albo nazwisko
  filterBy: string = '';
  // czy filtrowanie jest wlaczone
  isFilteringEnabled = false;
  // ktore pole w popupie jest zaznaczone
  isFilterChecked: boolean[] = [false, false, false, false, false, false];

  // analogicznie jak z filtrowaniem
  isSortOptionsOpen: boolean = false;
  sortBy: string = '';
  isSortingEnabled = false;
  isSortChecked: boolean[] = [false, false, false, false, false, false];
  sortStyle = 'asc';

  ascIsChecked = true;

  people: Person[] = [];
  mode: boolean | undefined;

  titles: string[] = [
    'id',
    'first name',
    'second name',
    'birth date',
    'city',
    'phone number',
    'e-mail',
    'gender',
  ];

  ngOnInit(): void {
    this.getPeople();
    this.themeService.currentDarkMode.subscribe(
      (modeValue) => (this.mode = modeValue)
    );
  }

  checkAsc() {
    this.ascIsChecked = true;
    console.log('asc checked');
    this.sortStyle = 'asc';
    if (!this.isFilteringEnabled) {
      this.getSortedPeople(this.sortBy);
    } else {
      this.getFilteredAndSortedPeople(
        this.sortBy,
        this.sortStyle,
        this.filterBy,
        this.filterValue
      );
    }
  }

  checkDesc() {
    this.ascIsChecked = false;
    console.log('desc checked');
    this.sortStyle = 'desc';
    if (!this.isFilteringEnabled) {
      this.getSortedPeople(this.sortBy);
    } else {
      this.getFilteredAndSortedPeople(
        this.sortBy,
        this.sortStyle,
        this.filterBy,
        this.filterValue
      );
    }
  }

  openHideFilterOptions() {
    this.isFilterOptionsOpen = !this.isFilterOptionsOpen;
  }

  openHideSortOptions() {
    this.isSortOptionsOpen = !this.isSortOptionsOpen;
  }

  filterByFun(property: string, index: number) {
    if (this.isSortingEnabled == false) {
      console.log('sraka');
      this.filterBy = property;
      this.isFilterOptionsOpen = false;
      if (index >= 0 && index < this.isFilterChecked.length) {
        for (let i = 0; i < this.isFilterChecked.length - 1; i++) {
          this.isFilterChecked[i] = false;
        }
        if (index == this.isFilterChecked.length - 1) {
          this.isFilteringEnabled = false;
          this.filterValue = '';
          this.getPeople();
        } else {
          this.isFilteringEnabled = true;
        }
        this.isFilterChecked[index] = true;
        this.isFilterChecked[this.isFilterChecked.length - 1] = false;
      }
    } else {
      this.filterBy = property;
      this.isFilterOptionsOpen = false;

      if (index >= 0 && index < this.isFilterChecked.length) {
        for (let i = 0; i < this.isFilterChecked.length - 1; i++) {
          this.isFilterChecked[i] = false;
        }
        this.isFilterChecked[index] = true;
        this.isFilterChecked[this.isFilterChecked.length - 1] = false;

        if (index == this.isFilterChecked.length - 1) {
          this.getSortedPeople(this.sortBy);
          this.isFilteringEnabled = false;
          this.filterValue = '';
        } else {
          this.getFilteredAndSortedPeople(
            this.sortBy,
            this.sortStyle,
            this.filterBy,
            this.filterValue
          );
          this.isFilteringEnabled = true;
        }
      }
    }
  }

  sortByFun(property: string, index: number) {
    if (this.isFilteringEnabled == false) {
      console.log('dupa');
      this.sortBy = property;
      this.isSortOptionsOpen = false;

      if (index >= 0 && index < this.isSortChecked.length) {
        for (let i = 0; i < this.isSortChecked.length - 1; i++) {
          this.isSortChecked[i] = false;
        }
        this.isSortChecked[index] = true;
        this.isSortChecked[this.isSortChecked.length - 1] = false;

        if (index == this.isSortChecked.length - 1) {
          this.getPeople();
          this.isSortingEnabled = false;
        } else {
          this.getSortedPeople(this.sortBy);
          this.isSortingEnabled = true;
        }
      }
    } else {
      this.sortBy = property;
      this.isSortOptionsOpen = false;

      if (index >= 0 && index < this.isSortChecked.length) {
        for (let i = 0; i < this.isSortChecked.length - 1; i++) {
          this.isSortChecked[i] = false;
        }
        this.isSortChecked[index] = true;
        this.isSortChecked[this.isSortChecked.length - 1] = false;

        if (index == this.isSortChecked.length - 1) {
          this.getFilteredPeople(this.filterBy, this.filterValue);
        } else {
          this.getFilteredAndSortedPeople(
            this.sortBy,
            this.sortStyle,
            this.filterBy,
            this.filterValue
          );
          this.isSortingEnabled = true;
        }
      }
    }
    console.log(this.isSortChecked);
  }

  getPeople() {
    this.httpPerson.getPeople().subscribe((person) => {
      this.people = person;
    });
  }

  getFilteredPeople(filterBy: string, filterValue: string) {
    if (filterBy != '') {
      this.httpPerson
        .getFilteredPeople(filterBy, filterValue)
        .subscribe((person) => {
          this.people = person;
        });
    }
  }

  getSortedPeople(sortBy: string) {
    if (sortBy != '') {
      this.httpPerson
        .getSortedPeople(sortBy, this.sortStyle)
        .subscribe((person) => {
          this.people = person;
        });
    }
  }

  getFilteredAndSortedPeople(
    sortedProp: string,
    sortedStyle: string,
    filterProp: string,
    filterValue: string
  ) {
    if (sortedProp != '' && filterProp != '') {
      this.httpPerson
        .getSortedAndFilteredPeople(
          sortedProp,
          sortedStyle,
          filterProp,
          filterValue
        )
        .subscribe((person) => {
          this.people = person;
        });
    }
  }

  changeMode() {
    this.themeService.changeDarkMode(!this.mode);
    console.log('Mode change from lineview: ' + this.mode);
  }
}
