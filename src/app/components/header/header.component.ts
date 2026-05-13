import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isScrolled = false;
  cartOpen = false;

  private navEndSub?: Subscription;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 40;
  }

  @HostListener('document:keydown.escape')
  onEscapeCloseCart() {
    if (this.cartOpen) this.closeCart();
  }

  constructor(
    private router: Router,
    readonly cart: CartService
  ) {}

  ngOnInit() {
    this.onWindowScroll();
    this.navEndSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMenu();
        this.closeCart();
      });
  }

  ngOnDestroy() {
    this.navEndSub?.unsubscribe();
  }

  /** Ruta limpia sin query ni hash (estados activos en nav). */
  private pathOnly(): string {
    return this.router.url.split('?')[0].split('#')[0] || '/';
  }

  isNavHomeActive(): boolean {
    const p = this.pathOnly();
    return p === '/' || p === '';
  }

  isNavProductsActive(): boolean {
    return this.pathOnly().startsWith('/productos');
  }

  isNavAboutActive(): boolean {
    return this.pathOnly() === '/sobre-nosotros';
  }

  isNavNuestroTrabajoActive(): boolean {
    return this.pathOnly() === '/nuestro-trabajo';
  }

  goAbout(event: Event) {
    event.preventDefault();
    this.closeMenu();
    this.router.navigate(['/sobre-nosotros']);
  }

  goNuestroTrabajo(event: Event) {
    event.preventDefault();
    this.closeMenu();
    this.router.navigate(['/nuestro-trabajo']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) this.cartOpen = false;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen;
    if (this.cartOpen) this.isMenuOpen = false;
  }

  closeCart() {
    this.cartOpen = false;
  }

  whatsappOrderHref(): string {
    const base = 'https://wa.me/573105159776';
    const lines = this.cart.items();
    if (!lines.length) return base;
    const text = lines
      .map((l) => `• ${l.name} × ${l.quantity}${l.categoryName ? ` (${l.categoryName})` : ''}`)
      .join('\n');
    return `${base}?text=${encodeURIComponent('Hola, me interesa pedir:\n\n' + text)}`;
  }

  goProducts(event: Event) {
    event.preventDefault();
    this.closeMenu();
    this.router.navigate(['/productos']);
  }

  scrollToSection(sectionId: string) {
    this.closeMenu();
    const tryScroll = () => {
      const element = document.getElementById(sectionId);
      if (!element) return false;

      const headerEl = document.querySelector('header.header');
      const headerHeight = headerEl instanceof HTMLElement
        ? Math.round(headerEl.getBoundingClientRect().height)
        : window.innerWidth > 992
          ? 92
          : 78;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      return true;
    };

    if (tryScroll()) return;

    // Si no existe el id en la página actual (por ejemplo, desde /productos),
    // volvemos al Home y luego intentamos hacer scroll.
    this.router.navigate(['/']).then(() => {
      setTimeout(() => tryScroll(), 50);
    });
  }
}

