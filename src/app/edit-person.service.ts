import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditPersonService {
  loadedID: number | undefined = undefined;

  constructor() {}
}
