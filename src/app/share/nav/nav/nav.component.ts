import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  mode: boolean | undefined;

  ngOnInit(): void {
    this.themeService.currentDarkMode.subscribe(
      (modeValue) => (this.mode = modeValue)
    );
  }

  changeMode() {
    this.themeService.changeDarkMode(!this.mode);
    console.log('Mode change from nav: ' + this.mode);
  }
}
