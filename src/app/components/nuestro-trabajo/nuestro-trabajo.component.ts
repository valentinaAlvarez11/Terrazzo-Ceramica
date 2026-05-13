import {
  Component,
  ChangeDetectionStrategy,
  computed,
  signal,
  inject,
  DestroyRef,
  effect,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

export type GalleryCategory = 'taller' | 'reciente' | 'exhibicion' | 'obra';

export interface GalleryPhoto {
  file: string;
  src: string;
  categories: GalleryCategory[];
  alt: string;
}

export const GALLERY_FILTER_ORDER: { id: GalleryCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'taller', label: 'En el taller' },
  { id: 'reciente', label: 'Recientes' },
  { id: 'exhibicion', label: 'Exhibiciones' },
  { id: 'obra', label: 'Instalaciones' },
];

function fotoSrc(file: string): string {
  const base = 'assets/fotos/';
  return base + file.split('/').map((seg) => encodeURIComponent(seg)).join('/');
}

function classifyPhotoFile(name: string): GalleryCategory[] {
  const cats = new Set<GalleryCategory>();
  const upper = name.toUpperCase();

  if (/^([2-9]|10|11)\.jpe?g$/i.test(name)) {
    cats.add('taller');
  }
  if (upper.includes('EXHIBICIONES')) {
    cats.add('exhibicion');
  }
  if (upper.includes('ENCHAPE') || upper.includes('TENJO')) {
    cats.add('obra');
  }
  if (/WHATSAPP|SCREENSHOT_/i.test(name)) {
    cats.add('obra');
  }
  if (/(^|[^0-9])20(2[4-9]|3\d)/.test(name)) {
    cats.add('reciente');
  }

  return [...cats];
}

@Component({
  selector: 'app-nuestro-trabajo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nuestro-trabajo.component.html',
  styleUrl: './nuestro-trabajo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NuestroTrabajoComponent {
  private readonly document: Document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly filters = GALLERY_FILTER_ORDER;
  readonly activeFilter = signal<GalleryCategory | 'all'>('all');
  readonly photos = signal<GalleryPhoto[]>([]);
  readonly loading = signal(true);
  readonly loadError = signal(false);
  readonly lightboxIndex = signal<number | null>(null);

  readonly filteredPhotos = computed(() => {
    const f = this.activeFilter();
    const list = this.photos();
    if (f === 'all') {
      return list;
    }
    return list.filter((p) => p.categories.includes(f));
  });

  readonly lightboxPhoto = computed(() => {
    const i = this.lightboxIndex();
    if (i === null) {
      return null;
    }
    const list = this.filteredPhotos();
    return list[i] ?? null;
  });

  constructor() {
    effect(() => {
      const open = this.lightboxIndex() !== null;
      const body = this.document.body;
      if (!body) {
        return;
      }
      body.style.overflow = open ? 'hidden' : '';
    });

    void this.loadManifest();

    const win = this.document.defaultView;
    if (win) {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          this.closeLightbox();
        }
        if (this.lightboxIndex() === null) {
          return;
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.lightboxNext();
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.lightboxPrev();
        }
      };
      win.addEventListener('keydown', handler, { capture: true });
      this.destroyRef.onDestroy(() => {
        win.removeEventListener('keydown', handler, { capture: true });
        this.document.body.style.overflow = '';
      });
    }
  }

  private async loadManifest(): Promise<void> {
    this.loading.set(true);
    this.loadError.set(false);
    try {
      const url = new URL('assets/gallery-fotos-manifest.json', this.document.baseURI).toString();
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(String(res.status));
      }
      const files = (await res.json()) as string[];
      const list: GalleryPhoto[] = files.map((file) => ({
        file,
        src: fotoSrc(file),
        categories: classifyPhotoFile(file),
        alt: `Cerámica y terrazzo — Terrazzo Cerámica`,
      }));
      this.photos.set(list);
    } catch {
      this.loadError.set(true);
    } finally {
      this.loading.set(false);
    }
  }

  setFilter(id: GalleryCategory | 'all'): void {
    this.activeFilter.set(id);
    this.closeLightbox();
  }

  openLightbox(index: number): void {
    this.lightboxIndex.set(index);
  }

  closeLightbox(): void {
    this.lightboxIndex.set(null);
  }

  lightboxNext(): void {
    const list = this.filteredPhotos();
    const i = this.lightboxIndex();
    if (i === null || !list.length) {
      return;
    }
    this.lightboxIndex.set((i + 1) % list.length);
  }

  lightboxPrev(): void {
    const list = this.filteredPhotos();
    const i = this.lightboxIndex();
    if (i === null || !list.length) {
      return;
    }
    this.lightboxIndex.set((i - 1 + list.length) % list.length);
  }
}
