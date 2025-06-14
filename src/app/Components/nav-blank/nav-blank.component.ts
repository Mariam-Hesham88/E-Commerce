import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Core/Services/auth.service';
import { CartService } from '../../Core/Services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
  readonly _AuthService = inject(AuthService);
  readonly _CartService = inject(CartService);
  countNumber: Signal<number> =computed(()=> this._CartService.countOfCartItem());

  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this._CartService.countOfCartItem.set(res.numOfCartItems)
      }
    });

    // this._CartService.countOfCartItem.subscribe({
    //   next:(data)=>{
    //     this.countNumber = data;
    //   }
    // });
  }
}
