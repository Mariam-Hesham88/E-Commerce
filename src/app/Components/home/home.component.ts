import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { IProduct } from '../../Core/Interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../Core/Services/category.service';
import { ICategory } from '../../Core/Interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { TermtextPipe } from '../../Core/Pipes/termtext.pipe';
import { CartService } from '../../Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../Core/Services/wishlist.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, UpperCasePipe, TermtextPipe, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _CategoryService = inject(CategoryService);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishlistService= inject (WishlistService)


  // ProductList:IProduct[] = [];
  ProductList:WritableSignal<IProduct[]> = signal([]);
  ProductSubscribe !: Subscription;
  categoryList:WritableSignal<ICategory[]> = signal([]);
  categorySubscribe !: Subscription;
  addWishListUnsub !: Subscription
  wishId: any = null

  // customOptionsMain: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: false,
  //   dots: false,
  //   autoplay: true,
  //   autoplayTimeout: 3000,
  //   navSpeed: 700,
  //   navText: [' ', ''],
  //   items: 1,
  //   nav: true
  // };

  customOptionsCategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left text-main second-color"></i>', '<i class="fa-solid fa-arrow-right text-main"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  };

  ngOnInit(): void {
    this.categorySubscribe = this._CategoryService.getAllCategories().subscribe({
      next:(res)=> {
        //console.log(res);
        this.categoryList.set(res.data);
      }
    });

    this.ProductSubscribe = this._ProductsService.GetAllProducts().subscribe({
      next:(res)=>{
        this.ProductList.set(res.data);
        //console.log(res.data);
        this.wishId = res.data
        if (localStorage.getItem('heart') !== null) {
          this.wishId = localStorage.getItem('heart')
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.ProductSubscribe?.unsubscribe();
    this.categorySubscribe?.unsubscribe();
  }

  addToCart(id:string):void{
    this._CartService.addProducrToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success('Product added to cart', 'All-In-One');
        this._CartService.countOfCartItem.set(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
        this._ToastrService.error(err.message, 'All-In-One');
      }
    });
  }

  addWishList(id: string): void {
    this.addWishListUnsub = this._WishlistService.addProductToWhishList(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'All-In-One')
        this.wishId = res.data
        localStorage.setItem('heart', this.wishId.toString())
      }
    })
  }
}
