import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { getCategoryBySlug, ProductCategory } from '../../data/product-categories';
import { CartService } from '../../services/cart.service';
import { AVISOS_ESPECIALES_IMAGES } from '../../data/avisos-especiales-images';
import { CENEFAS_IMAGES } from '../../data/cenefas-images';
import { FONDOS_PISCINA_IMAGES } from '../../data/fondos-piscina-images';
import { JUEGOS_IMAGES } from '../../data/juegos-images';
import { LISTELOS_IMAGES } from '../../data/listelos-images';
import { MURALES_IMAGES } from '../../data/murales-images';
import { RELIGIOSOS_IMAGES } from '../../data/religiosos-images';
import { PRODUCT_LABEL_OVERRIDES } from '../../data/product-label-overrides';
import { ROSETONES_IMAGES } from '../../data/rosetones-images';
import { NOMENCLATURAS_IMAGES } from '../../data/nomenclaturas-images';
import { SENALETICA_IMAGES } from '../../data/senaletica-images';
import { TOCETOS_SECTIONS, TocetosLineId } from '../../data/tocetos-sections';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.scss',
})
export class ProductCategoryComponent implements OnInit {
  category: ProductCategory | undefined;
  avisosEspecialesImages = AVISOS_ESPECIALES_IMAGES;
  cenefasImages = CENEFAS_IMAGES;
  fondosPiscinaImages = FONDOS_PISCINA_IMAGES;
  juegosImages = JUEGOS_IMAGES;
  listelosImages = LISTELOS_IMAGES;
  muralesImages = MURALES_IMAGES;
  religiososImages = RELIGIOSOS_IMAGES;
  rosetonesImages = ROSETONES_IMAGES;
  nomenclaturasImages = NOMENCLATURAS_IMAGES;
  senaleticaImages = SENALETICA_IMAGES;
  tocetosSections = TOCETOS_SECTIONS;
  selectedAvisoFilename: string | null = null;
  selectedToceto: { line: TocetosLineId; filename: string } | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    readonly cart: CartService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug === 'cenefas-png') {
      void this.router.navigate(['/productos', 'cenefas'], { replaceUrl: true });
      return;
    }
    if (slug === 'listelos-en-png') {
      void this.router.navigate(['/productos', 'listelos'], { replaceUrl: true });
      return;
    }
    if (slug === 'religiosos-png') {
      void this.router.navigate(['/productos', 'religiosos'], { replaceUrl: true });
      return;
    }
    if (slug === 'rosetones-en-png') {
      void this.router.navigate(['/productos', 'rosetones'], { replaceUrl: true });
      return;
    }
    if (slug === 'tocetos-en-ceramica') {
      void this.router.navigate(['/productos', 'tocetos'], { replaceUrl: true });
      return;
    }
    this.category = slug ? getCategoryBySlug(slug) : undefined;
  }

  openAviso(filename: string) {
    this.selectedAvisoFilename = filename;
  }

  closeAviso() {
    this.selectedAvisoFilename = null;
  }

  openToceto(line: TocetosLineId, filename: string) {
    this.selectedToceto = { line, filename };
  }

  closeToceto() {
    this.selectedToceto = null;
  }

  tocetoImageUrl(line: TocetosLineId, filename: string): string {
    const base: Record<TocetosLineId, string> = {
      ceramica: 'assets/tocetos en ceramica 10,2x10,2/',
      artistica: 'assets/tocetos linea artistica/',
      legado: 'assets/tocetos linea legado/',
    };
    return this.assetUrl(base[line] + filename);
  }

  tocetoSectionTitle(line: TocetosLineId): string {
    return this.tocetosSections.find((s) => s.id === line)?.title ?? '';
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.selectedToceto) this.closeToceto();
    else if (this.selectedAvisoFilename) this.closeAviso();
  }

  assetUrl(relativePath: string): string {
    // Codifica partes del path para que espacios y caracteres especiales funcionen en el navegador.
    return '/' + relativePath.split('/').map((p) => encodeURIComponent(p)).join('/');
  }

  avisoImageUrl(filename: string): string {
    return this.assetUrl('assets/AVISOS ESPECIALES/' + filename);
  }

  cenefasImageUrl(filename: string): string {
    return this.assetUrl('assets/cenefas/' + filename);
  }

  fondosPiscinaImageUrl(filename: string): string {
    return this.assetUrl('assets/FONDOS PISCINA/' + filename);
  }

  juegosImageUrl(filename: string): string {
    return this.assetUrl('assets/juegos/' + filename);
  }

  listelosImageUrl(filename: string): string {
    return this.assetUrl('assets/listelos/' + filename);
  }

  muralesImageUrl(filename: string): string {
    return this.assetUrl('assets/murales/' + filename);
  }

  religiososImageUrl(filename: string): string {
    return this.assetUrl('assets/religiosos/' + filename);
  }

  rosetonesImageUrl(filename: string): string {
    return this.assetUrl('assets/rosetones/' + filename);
  }

  nomenclaturasImageUrl(filename: string): string {
    return this.assetUrl('assets/nomenclaturas/' + filename);
  }

  senaleticaImageUrl(filename: string): string {
    return this.assetUrl('assets/SEÑALETICA/' + filename);
  }

  avisoLabel(filename: string): string {
    const slug = this.category?.slug;
    if (slug) {
      const override = PRODUCT_LABEL_OVERRIDES[slug]?.[filename];
      if (override) return override;
    }
    return filename.replace(/\.png$/i, '').toUpperCase();
  }

  /** URL de imagen según la categoría actual (para carrito y previews). */
  imageUrlForCategoryFilename(filename: string): string {
    if (!this.category) return '';
    switch (this.category.slug) {
      case 'avisos-especiales':
        return this.avisoImageUrl(filename);
      case 'fondos-piscina':
        return this.fondosPiscinaImageUrl(filename);
      case 'juegos':
        return this.juegosImageUrl(filename);
      case 'listelos':
        return this.listelosImageUrl(filename);
      case 'murales':
        return this.muralesImageUrl(filename);
      case 'cenefas':
        return this.cenefasImageUrl(filename);
      case 'religiosos':
        return this.religiososImageUrl(filename);
      case 'rosetones':
        return this.rosetonesImageUrl(filename);
      case 'nomenclaturas':
        return this.nomenclaturasImageUrl(filename);
      case 'senaletica':
        return this.senaleticaImageUrl(filename);
      default:
        return '';
    }
  }

  addFilenameToCart(event: Event, filename: string): void {
    event.stopPropagation();
    event.preventDefault();
    if (!this.category) return;
    const imageUrl = this.imageUrlForCategoryFilename(filename);
    if (!imageUrl) return;
    this.cart.addItem({
      id: `${this.category.slug}::${filename}`,
      name: this.avisoLabel(filename),
      imageUrl,
      categoryName: this.category.name,
    });
  }

  addTocetoToCart(event: Event, line: TocetosLineId, filename: string): void {
    event.stopPropagation();
    event.preventDefault();
    if (!this.category) return;
    this.cart.addItem({
      id: `${this.category.slug}::${line}::${filename}`,
      name: this.avisoLabel(filename),
      imageUrl: this.tocetoImageUrl(line, filename),
      categoryName: `${this.category.name} · ${this.tocetoSectionTitle(line)}`,
    });
  }

  addSelectedAvisoToCart(): void {
    if (!this.category || !this.selectedAvisoFilename) return;
    const f = this.selectedAvisoFilename;
    this.cart.addItem({
      id: `${this.category.slug}::${f}`,
      name: this.avisoLabel(f),
      imageUrl: this.imageUrlForCategoryFilename(f),
      categoryName: this.category.name,
    });
  }

  addSelectedTocetoToCart(): void {
    if (!this.category || !this.selectedToceto) return;
    const { line, filename } = this.selectedToceto;
    this.cart.addItem({
      id: `${this.category.slug}::${line}::${filename}`,
      name: this.avisoLabel(filename),
      imageUrl: this.tocetoImageUrl(line, filename),
      categoryName: `${this.category.name} · ${this.tocetoSectionTitle(line)}`,
    });
  }
}
