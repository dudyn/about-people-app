import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './share/nav/nav/nav.component';
import { BlockviewComponent } from './pages/blockview/blockview/blockview.component';
import { LineviewComponent } from './pages/lineview/lineview/lineview.component';
import { AddPersonComponent } from './pages/add-person/add-person.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonDetailComponent } from './share/person-detail/person-detail/person-detail.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditPersonComponent } from './pages/editperson/edit-person/edit-person.component';
import { DatePipe } from '@angular/common';
//import { MatSelectModule } from '@angular/material/select';
//import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BlockviewComponent,
    LineviewComponent,
    AddPersonComponent,
    PersonDetailComponent,
    EditPersonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
