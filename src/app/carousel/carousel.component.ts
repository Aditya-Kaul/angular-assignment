import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  CAROUSEL_BREAKPOINT = 768;
  carouselDisplayMode = 'multiple';
  slides: any = [[]];
  imageDesktop: any[] = [];

  images: any[] = [
    '../../assets/img/cord.jpg',
    '../../assets/img/remote.jpg',
    '../../assets/img/cb.jpg',
    '../../assets/img/connect.jpg',
    '../../assets/img/adapter.jpeg',
    '../../assets/img/cb.jpg',
    '../../assets/img/keyboard.jpg',
  ];
  
  constructor(private config: NgbCarouselConfig) {  
  }

  ngOnInit(): void {
    this.config.interval = 2000;  
    this.config.wrap = true;  
    this.config.keyboard = false;  
    this.config.pauseOnHover = false;

    if (window.innerWidth <= this.CAROUSEL_BREAKPOINT) {
      console.log(window.innerWidth);
      this.carouselDisplayMode = 'single';
      console.log(this.carouselDisplayMode);
    } else {
      console.log(window.innerWidth);
      this.carouselDisplayMode = 'multiple';
      console.log(this.carouselDisplayMode);
    }

    let j = -1;

for (let i = 0; i < this.images.length; i++) {
    if (i % 3 == 0) {
        j++;
        this.imageDesktop[j] = [];
        this.imageDesktop[j].push(this.images[i]);
    }
    else {
        this.imageDesktop[j].push(this.images[i]);
    }
}

}

  @HostListener('window:resize')
  onWindowResize() {
    console.log('resize');
    if (window.innerWidth <= this.CAROUSEL_BREAKPOINT) {
      this.carouselDisplayMode = 'single';
    } else {
      this.carouselDisplayMode = 'multiple';
    }
  }

}
