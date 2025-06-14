import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../Core/Services/cart.service';
import { ICart } from '../../Core/Interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, SweetAlert2Module],
templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  cartProductList: ICart = {} as ICart;
  countOfItems : number = 0;

  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartProductList = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteSpecificProduct(Id: string): void {
    this._CartService.removeSpecificCartItem(Id).subscribe({
      next: (res) => {
        //console.log(res)
        this.cartProductList = res.data;
        // this.cartProductCount = res.
        this._CartService.countOfCartItem.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateCount(id:string , count:number):void{
    this._CartService.updateCartProductCount(id,count).subscribe({
      next:(res)=>{
        this.cartProductList = res.data;
        //console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  clearAllProducts(): void {
    this._CartService.clearAllCart().subscribe({
      next: (res) => {
        console.log(res)
        if (res.message === 'success') {
          this.cartProductList = {} as ICart;
          this._CartService.countOfCartItem.set(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
}
