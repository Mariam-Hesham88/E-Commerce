import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Core/Services/products.service';
import { IProduct } from '../../Core/Interfaces/iproduct';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule, TitleCasePipe, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  detailsProduct:IProduct = {} as IProduct;

  customOptionsimages: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
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
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let id = params.get('id');
        //call api for GetSpecificProducts
        this._ProductsService.GetSpecificProducts(id).subscribe({
          next:(res)=>{
            this.detailsProduct = res.data;
          },
          error:(err)=>{
            console.log(err);
          }
        });
      }
    });
  }
}
