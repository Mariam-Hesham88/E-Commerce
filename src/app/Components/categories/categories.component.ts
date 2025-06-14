import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ICategory } from '../../Core/Interfaces/icategory';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../Core/Services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {

  private readonly _CategoriesService=inject(CategoryService)
  categoriesList:WritableSignal<ICategory[]> = signal([]);
  categoriesUnSub !:Subscription

  ngOnInit(): void {
    this.categoriesUnSub= this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList.set(res.data);
      }
    })
  }

  ngOnDestroy():void {
    this.categoriesUnSub?.unsubscribe()
  }

}