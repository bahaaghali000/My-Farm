import { Injectable } from '@angular/core';
import { ICategory } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories: ICategory[];

  constructor() {
    this.categories = [
      {
        id: 1,
        name: 'القطط',
        description: 'منتجات للقطط',
        imageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6',
      },
      {
        id: 2,
        name: 'الكلاب',
        description: 'منتجات للكلاب',
        imageUrl: 'https://images.unsplash.com/photo-1558788353-f76d92427f16',
      },
      {
        id: 3,
        name: 'الطيور',
        description: 'منتجات للطيور',
        imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
      },
      {
        id: 4,
        name: 'اسماك',
        description: 'منتجات للاسماك',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f',
      },
      {
        id: 5,
        name: 'عيادات',
        description: 'عيادات للحيوانات',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d3622e367b5c',
      },
    ];
  }

  getAllCategories(): ICategory[] {
    return this.categories;
  }

  getCategoryById(id: number): ICategory | null {
    const category = this.categories.find((cat) => cat.id === id);
    return category || null;
  }
}
