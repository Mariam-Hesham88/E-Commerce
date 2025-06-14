import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { CartService } from '../../Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../Core/Interfaces/iproduct';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../Core/Services/wishlist.service';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CurrencyPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { TermtextPipe } from '../../Core/Pipes/termtext.pipe';
import { SearchPipe } from '../../Core/Pipes/search.pipe';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,CarouselModule,UpperCasePipe,TermtextPipe,SearchPipe,UpperCasePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService= inject (WishlistService)
  private readonly _ToastrService = inject(ToastrService)

  productsList: WritableSignal<IProduct[]> = signal([]);
  text: string = ""
  wishId: any = null
  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;
  getAllProductUnsub !: Subscription
  addCartUnsub !: Subscription
  addWishListUnsub !: Subscription
  pageChangedUnSub !: Subscription

  ngOnInit(): void {
    this.getAllProductUnsub = this._ProductsService.GetAllProducts().subscribe({

      next: (res) => {
        this.pageSize = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.total = res.results;
        this.productsList.set(res.data);
        this.wishId = res.data
        if (localStorage.getItem('heart') !== null) {
          this.wishId = localStorage.getItem('heart')
        }

      }
    })
  }

  ngOnDestroy(): void {
    this.getAllProductUnsub?.unsubscribe()
    this.addCartUnsub?.unsubscribe()
    this.addWishListUnsub?.unsubscribe()
    this.pageChangedUnSub?.unsubscribe()

  }



  addCart(id: string): void {
    this.addCartUnsub = this._CartService.addProducrToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Fresh Card')
        this._CartService.countOfCartItem.set(res.numOfCartItems)
      }
    })
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



  pageChanged(event: any): void {
    this.pageChangedUnSub = this._ProductsService.GetAllProducts().subscribe({
      next: (res) => {
        this.productsList = res.data;
        this.pageSize = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.total = res.results;
      }
    });
  }


}
