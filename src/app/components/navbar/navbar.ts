import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CategoriesService } from '../../services/categories';
import { ICategory } from '../../models/category';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  searchQuery: string = '';
  categories: ICategory[];

  cartCount: number = 3;
  wishlistCount: number = 2;

  constructor(private categoriesService: CategoriesService) {
    this.categories = this.categoriesService.getAllCategories();
  }
}
