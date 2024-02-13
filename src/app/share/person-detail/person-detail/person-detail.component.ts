import { Component, OnInit } from '@angular/core';
import { HttpPersonService } from 'src/app/http-person.service';
import { Person } from 'src/app/models/person';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EditPersonService } from 'src/app/edit-person.service';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css'],
})
export class PersonDetailComponent implements OnInit {
  person: Partial<Person> = {};
  isConfirmOpen: boolean = false;
  mode: boolean | undefined;

  constructor(
    private httpPerson: HttpPersonService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private editPersonService: EditPersonService,
    private themeService: ThemeService
  ) {
    this.isConfirmOpen = false;
  }

  ngOnInit(): void {
    this.getPerson();
    this.themeService.currentDarkMode.subscribe(
      (modeValue) => (this.mode = modeValue)
    );
  }

  openConfirm() {
    this.isConfirmOpen = true;
  }

  closeConfirm() {
    this.isConfirmOpen = false;
  }

  goBack() {
    this.location.back();
  }

  goToBlockView() {
    this.router.navigateByUrl('/blockview');
  }

  getPerson() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.httpPerson.getPerson(id).subscribe((man) => {
      console.log(man);
      this.person = man;
      this.editPersonService.loadedID = man.id;
    });
  }

  deletePerson(id: number) {
    this.httpPerson.deletePerson(id.toString()).subscribe((deletedMan) => {
      console.log(deletedMan);
      this.closeConfirm();
      this.goToBlockView();
    });
  }

  changeMode() {
    this.themeService.changeDarkMode(!this.mode);
    console.log('Mode change from details: ' + this.mode);
  }
}
