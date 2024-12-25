import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  
  constructor() {}

  ngAfterViewInit() {
    this.disableIframeScroll();
  }

  private disableIframeScroll() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.addEventListener('wheel', (event) => event.preventDefault(), { passive: false });
    }
  }
}
