import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Person } from './models/person';

@Injectable({
  providedIn: 'root',
})
export class HttpPersonService {
  url = 'http://localhost:3000/people';

  constructor(private http: HttpClient) {}

  getFilteredPeople(property: string, filter: string): Observable<Person[]> {
    return this.http
      .get<Person[]>(this.url + '?' + property + '_like=' + filter)
      .pipe(tap(console.log));
  }

  getSortedPeople(property: string, style: string): Observable<Person[]> {
    return this.http
      .get<Person[]>(this.url + '?_sort=' + property + '&_order=' + style)
      .pipe(tap(console.log));
  }

  getSortedAndFilteredPeople(
    sortProperty: string,
    sortStyle: string,
    filterProperty: string,
    filterValue: string
  ): Observable<Person[]> {
    return this.http
      .get<Person[]>(
        this.url +
          '?_sort=' +
          sortProperty +
          '&_order=' +
          sortStyle +
          '&' +
          filterProperty +
          '_like=' +
          filterValue
      )
      .pipe(tap(console.log));
  }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url);
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(this.url + '/' + id);
  }

  addPerson(person: Partial<Person>): Observable<Person> {
    return this.http.post<Person>(this.url, person).pipe(tap(console.log));
  }

  deletePerson(id: string): Observable<{}> {
    return this.http.delete<{}>(this.url + '/' + id).pipe(tap(console.log));
  }

  saveEditedPerson(oldPersonID: number, newPerson: Person): Observable<Person> {
    return this.http
      .patch<Person>(this.url + '/' + oldPersonID, newPerson)
      .pipe(tap(console.log));
  }
}
