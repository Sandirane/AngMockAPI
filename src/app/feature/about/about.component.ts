import { Component } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';

interface Item {
  icon: string;
  description: string;
}

@Component({
  selector: 'app-about',
  imports: [TranslocoDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  items: Array<Item> = [
    { icon: "fab fa-angular", description: "aboutPage.description1" },
    { icon: "fa-brands fa-bootstrap", description: "aboutPage.description2" },
    { icon: "fas fa-desktop", description: "aboutPage.description3" }, 
    { icon: "fab fa-github-alt", description: "aboutPage.description4" }, 
    { icon: "fa fa-language", description: "aboutPage.description5" },
  ]

}
