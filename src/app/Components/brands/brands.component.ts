import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandsService } from '../../Core/Services/brands.service';
import { Ibrand } from '../../Core/Interfaces/ibrand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit ,OnDestroy{
  private readonly _BrandsService=inject(BrandsService)
  brands:WritableSignal<Ibrand[]> = signal([]);
  isClicked:boolean=false
  name:string=''
  slug:string=''
  img:string=''
  brandUnSub !:Subscription

  ngOnInit(): void {
    this.brandUnSub= this._BrandsService.getAllBrands().subscribe({
      next: (res) =>{
        this.brands.set(res.data);
      }
    })
  }

  ngOnDestroy():void {
    this.brandUnSub?.unsubscribe()
  }
  
  openModule(img:string,slug:string,name:string):void{
    this.isClicked=true
    this.name=name
    this.img=img
    this.slug=slug

  }


}