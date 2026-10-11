import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

export interface HeroSlide {
  id: string;
  imageUrl: string;
  badge: string;
  titleTop: string;
  titleAccent: string;
  subtitle: string;
  primaryLabel: string;
  secondaryLabel: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: 'healthy-food',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCSvAkNm8eExPKA8SjclD8hPiijL3CN-05Cdudv1mj2aF-QmgceX75KT3fj6BSmfObx0RBfz6QFQJXq0jHFNH-k3clWYgP659cebn34c0q3bIrRhmPxeIy-F8SmJS8bM2O7_juVZxe_l7ZHKAnxRJbLMsgydjjQy5fkkNZGM-5V3Af-UCgrSm_veV_bC823SFUEBjNbioKT2vKv0kB6bbpEgHxfEHtHE2jMP_lY4TJkig2YNXJAvVu9ObT2-nMq7jJqLOt2E3y120ld',
    badge: 'عرض خاص لفترة محدودة',
    titleTop: 'غذاء صحي..',
    titleAccent: 'لحياة سعيدة',
    subtitle:
      'اكتشف مجموعتنا المختارة من أفضل أنواع الأطعمة الفاخرة لحيوانك الأليف بخصومات تصل إلى 40%',
    primaryLabel: 'تسوق الآن',
    secondaryLabel: 'اكتشف العروض',
  },
  {
    id: 'dogs-world',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAg9Lr2MmgB8wjPZUmw3QO0pVqYXObamcGrNvYBxNnPved3LZS8N9P1DehGCWF5QfaAoARGYgwffA3MDy9TgHD_5L5Fpctvf6yhGdXyTqWZ293Si__FKh-ZipQDgFa5_y-OaklN_RkeKevqOdlobfbPSd0xesy4r-p-0uEiUGxsYvWl-LKgIsy37b5M_3GjpVr0FPgJBaRTgwU6hCBSo6BERbYe_MpXGs9brt01T5CkNqoeumMSHaKYPRoLvYy0AYXcjC30rfkzU4hg',
    badge: 'عالم الكلاب الفاخر',
    titleTop: 'كل ما يحتاجه',
    titleAccent: 'صديقك الوفي',
    subtitle:
      'تشكيلة مختارة من أرقى المنتجات العالمية للعناية بكلبك، من الغذاء الصحي إلى الألعاب والأسرّة المريحة',
    primaryLabel: 'تسوق الآن',
    secondaryLabel: 'اكتشف المزيد',
  },
  {
    id: 'cats-world',
    imageUrl: 'https://images.unsplash.com/photo-1601230202587-1b3f0286c1b7',
    badge: 'عالم القطط الفاخر',
    titleTop: 'كل ما يحتاجه',
    titleAccent: 'قطتك المحبوبة',
    subtitle:
      'تشكيلة مختارة من أرقى المنتجات العالمية للعناية بقطتك، من الغذاء الصحي إلى الألعاب والأسرّة المريحة',
    primaryLabel: 'تسوق الآن',
    secondaryLabel: 'اكتشف المزيد',
  },
];

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  slides: HeroSlide[] = DEFAULT_SLIDES;

  autoplay: boolean = true;
  autoplayDelay: number = 6000;

  private readonly current = signal(0);
  readonly activeIndex = this.current.asReadonly();
  readonly slideIndexes = computed(() => this.slides.map((_, index) => index));

  readonly slideChanged = output<number>();
  readonly primaryClicked = output<HeroSlide>();
  readonly secondaryClicked = output<HeroSlide>();

  private readonly paused = signal(false);
  private timer: ReturnType<typeof setInterval> | null = null;
  private touchStartX: number | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stopAutoplay());
    afterNextRender(() => {
      if (!this.autoplay) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.startAutoplay();
    });
  }

  next(): void {
    if (this.slides.length === 0) return;
    this.goTo((this.current() + 1) % this.slides.length);
  }

  previous(): void {
    if (this.slides.length === 0) return;
    this.goTo((this.current() - 1 + this.slides.length) % this.slides.length);
  }

  goTo(index: number): void {
    if (this.slides.length === 0) return;
    if (index !== this.current()) {
      this.current.set(index);
      this.slideChanged.emit(index);
    }
    this.restartAutoplay();
  }

  setPaused(paused: boolean): void {
    this.paused.set(paused);
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0]?.clientX ?? null;
  }

  onTouchEnd(event: TouchEvent): void {
    const startX = this.touchStartX;
    const endX = event.changedTouches[0]?.clientX;
    this.touchStartX = null;
    if (startX === null || startX === undefined || endX === undefined) return;
    const delta = endX - startX;
    if (Math.abs(delta) < 40) return;
    // In RTL a leftward swipe advances forward.
    if (delta < 0) this.next();
    else this.previous();
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.timer = setInterval(() => {
      if (!this.paused()) this.advance();
    }, this.autoplayDelay);
  }

  private advance(): void {
    if (this.slides.length === 0) return;
    this.current.update((index) => (index + 1) % this.slides.length);
    this.slideChanged.emit(this.current());
  }

  private restartAutoplay(): void {
    if (this.timer !== null) this.startAutoplay();
  }

  private stopAutoplay(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
