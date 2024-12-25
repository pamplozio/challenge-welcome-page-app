import { Component, AfterViewInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule

@Component({
  selector: 'app-home',
  standalone: true,  // Marking the component as standalone
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatToolbarModule]  // Add MatToolbarModule in imports array
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
