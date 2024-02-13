import { Component, ViewEncapsulation } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'about-people-app';
  mode: boolean | undefined;

  constructor(private themeService: ThemeService) {
    this.themeService.currentDarkMode.subscribe((modeValue) => {
      this.mode = modeValue;
      this.changeTheme();
    });
  }

  changeMode() {
    this.themeService.changeDarkMode(!this.mode);
    console.log('Mode change from blockview: ' + this.mode);
  }

  changeTheme() {
    if (this.mode == true) {
      document.documentElement.style.setProperty(
        '--bgColor',
        'rgb(41, 41, 41)'
      );
    } else {
      document.documentElement.style.setProperty(
        '--bgColor',
        'rgb(214, 214, 214)'
      );
    }
  }
}
