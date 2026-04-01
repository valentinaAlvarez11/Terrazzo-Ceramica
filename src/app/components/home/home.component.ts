import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  collections = [
    { 
      name: 'Murales', 
      image: 'assets/galapago.png',
      description: 'Obras de arte únicas para decorar tus espacios',
      link: '/productos/fondos-piscina',
    },
    { 
      name: 'Rosetones', 
      image: 'assets/rosetones sunflower.png',
      description: 'Diseños con girasoles para mesas y superficies en cerámica',
      link: '/productos/rosetones-en-png',
    },
    { 
      name: 'Tocetos', 
      image: 'assets/IMPERIO.png',
      description: 'Baldosas decorativas para interiores y exteriores',
      link: '/productos/tocetos-en-ceramica',
    }
  ];

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerEl = document.querySelector('header.header');
      const headerHeight =
        headerEl instanceof HTMLElement
          ? Math.round(headerEl.getBoundingClientRect().height)
          : window.innerWidth > 992
            ? 92
            : 78;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
