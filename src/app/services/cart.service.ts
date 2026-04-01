import { Injectable, computed, signal } from '@angular/core';

export interface CartLine {
  id: string;
  name: string;
  imageUrl: string;
  categoryName: string;
  quantity: number;
}

const STORAGE_KEY = 'terrazzo-cart-v1';

function loadFromStorage(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (row): row is CartLine =>
        typeof row === 'object' &&
        row !== null &&
        typeof (row as CartLine).id === 'string' &&
        typeof (row as CartLine).quantity === 'number'
    );
  } catch {
    return [];
  }
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly lines = signal<CartLine[]>(loadFromStorage());

  readonly items = this.lines.asReadonly();

  readonly totalQuantity = computed(() =>
    this.lines().reduce((sum, line) => sum + line.quantity, 0)
  );

  readonly totalLines = computed(() => this.lines().length);

  addItem(item: Omit<CartLine, 'quantity'>): void {
    this.lines.update((current) => {
      const idx = current.findIndex((l) => l.id === item.id);
      if (idx >= 0) {
        const next = [...current];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...current, { ...item, quantity: 1 }];
    });
    this.persist();
  }

  setQuantity(id: string, quantity: number): void {
    const q = Math.max(0, Math.floor(quantity));
    this.lines.update((current) => {
      if (q === 0) return current.filter((l) => l.id !== id);
      const idx = current.findIndex((l) => l.id === id);
      if (idx < 0) return current;
      const next = [...current];
      next[idx] = { ...next[idx], quantity: q };
      return next;
    });
    this.persist();
  }

  removeLine(id: string): void {
    this.lines.update((current) => current.filter((l) => l.id !== id));
    this.persist();
  }

  clear(): void {
    this.lines.set([]);
    this.persist();
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lines()));
    } catch {
      /* ignore quota / private mode */
    }
  }
}
