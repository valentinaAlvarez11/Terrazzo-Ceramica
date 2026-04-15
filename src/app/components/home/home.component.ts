import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ProcessStep {
  src: string;
  alt: string;
  label: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  processSteps: ProcessStep[] = [
    { src: '/assets/diseno.png', alt: 'Diseño', label: 'Diseño' },
    { src: '/assets/screen.png', alt: 'Screen', label: 'Screen' },
    {
      src: '/assets/decoracion%20%20a%20mano.png',
      alt: 'Decoracion a mano',
      label: 'Decoracion a mano',
    },
    { src: '/assets/horneado.png', alt: 'Horneado', label: 'Horneado' },
    { src: '/assets/quema%20final.png', alt: 'Quema final', label: 'Quema final' },
    {
      src: '/assets/producto%20final.png',
      alt: 'Producto final',
      label: 'Producto final',
    },
  ];

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
