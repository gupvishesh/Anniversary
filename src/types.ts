export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  isPlaceholder: boolean;
  imageSrc?: string;
  fallbackIcon?: string;
  colorType?: 'vintage-gold' | 'rose-velvet' | 'festive-red' | 'warm-amber';
}

export interface FunFact {
  id: string;
  icon: string;
  stat: string;
  hindiTitle: string;
  englishTitle: string;
  description: string;
}

export interface Quote {
  hindi: string;
  english: string;
  author: string;
}
