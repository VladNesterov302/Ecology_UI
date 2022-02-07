import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

/// Нужен исключительно для первичной инициализации userName, что бы имя отображалось в header
@Injectable()
export class GlobalService {
  usernameValue = new Subject();
  constructor() { }

  set theItem(value) {
    this.usernameValue.next(value);
    localStorage.setItem('userName', value);
  }

  get theItem() {
    return localStorage.getItem('userName');
  }
}
