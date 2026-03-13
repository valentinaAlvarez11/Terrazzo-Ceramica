import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  collections = [
    { 
      name: 'Murales', 
      image: 'assets/galapago.png',
      description: 'Obras de arte únicas para decorar tus espacios'
    },
    { 
      name: 'Rosetones', 
      image: 'assets/rosetones sunflower.png',
      description: 'Diseños con girasoles para mesas y superficies en cerámica'
    },
    { 
      name: 'Tocetos', 
      image: 'assets/IMPERIO.png',
      description: 'Baldosas decorativas para interiores y exteriores'
    }
  ];

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
