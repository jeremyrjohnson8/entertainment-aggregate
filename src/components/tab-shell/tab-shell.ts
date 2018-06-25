import { Component, Input } from '@angular/core';

/**
 * Generated class for the TabShellComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tab-shell',
  templateUrl: 'tab-shell.html'
})
export class TabShellComponent {
  @Input() title: string;
  text: string;

  constructor() {
    console.log('Hello TabShellComponent Component');
    this.text = 'Hello World';
  }

}
