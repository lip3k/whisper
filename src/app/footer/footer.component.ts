import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  links = {
    github: 'https://github.com/lip3k',
    linked: 'https://www.linkedin.com/in/lip3k/',
    codepen: 'https://codepen.io/lip3k/'
  }

  constructor() { }

  ngOnInit() {
  }

  goTo(url: string) {
    window.open(url, '_blank');
  }

}
