export interface ProductCategory {
  name: string;
  slug: string;
  image?: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    name: 'AVISOS ESPECIALES',
    slug: 'avisos-especiales',
    image: 'assets/AVISOS ESPECIALES/VILLA DIANA.png',
  },
  { name: 'CENEFAS', slug: 'cenefas-png', image: 'assets/cenefas/alcala.png' },
  {
    name: 'FONDOS DE PISCINA',
    slug: 'fondos-piscina',
    image: 'assets/FONDOS PISCINA/ARRECIFE.png',
  },
  {
    name: 'JUEGOS',
    slug: 'juegos',
    image: 'assets/juegos/PARQUES 6 PUESTOS.png',
  },
  {
    name: 'LISTELOS',
    slug: 'listelos-en-png',
    image: 'assets/listelos/romanica.png',
  },
  {
    name: 'MURALES',
    slug: 'murales',
    image: 'assets/murales/luna astral.png',
  },
  {
    name: 'NOMENCLATURAS',
    slug: 'nomenclaturas',
    image: 'assets/nomenclaturas/cardinal 20x20.png',
  },
  {
    name: 'RELIGIOSOS',
    slug: 'religiosos-png',
    image: 'assets/religiosos/virgen guadalupe.png',
  },
  {
    name: 'ROSETONES',
    slug: 'rosetones-en-png',
    image: 'assets/rosetones/rosetone jardinera.png',
  },
  {
    name: 'SEÑALÉTICA',
    slug: 'senaletica',
    image: 'assets/SEÑALETICA/PROFUNDIDAD PISCINA 4.png',
  },
  {
    name: 'TOCETOS',
    slug: 'tocetos-en-ceramica',
    image: 'assets/tocetos en ceramica 10,2x10,2/MEDIEVAL.png',
  },
];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}
