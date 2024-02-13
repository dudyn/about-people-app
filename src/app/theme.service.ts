import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  // wartosc startowa
  private darkModeSource = new BehaviorSubject<boolean>(false);
  // wartosc jaka bedzie sie zmieniac
  currentDarkMode = this.darkModeSource.asObservable();

  changeDarkMode(value: boolean) {
    this.darkModeSource.next(value);
  }
}
