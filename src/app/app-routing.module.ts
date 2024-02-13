import { NgModule, ɵisListLikeIterable } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonComponent } from './pages/add-person/add-person.component';
import { BlockviewComponent } from './pages/blockview/blockview/blockview.component';
import { EditPersonComponent } from './pages/editperson/edit-person/edit-person.component';
import { LineviewComponent } from './pages/lineview/lineview/lineview.component';
import { PersonDetailComponent } from './share/person-detail/person-detail/person-detail.component';

const routes: Routes = [
  { path: 'blockview', component: BlockviewComponent },
  { path: 'lineview', component: LineviewComponent },
  { path: 'addperson', component: AddPersonComponent },
  { path: 'editperson', component: EditPersonComponent },
  { path: 'person/:id', component: PersonDetailComponent },
  { path: '', redirectTo: '/blockview', pathMatch: 'full' },
  { path: '**', redirectTo: '/blockview', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
