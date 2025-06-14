import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../Core/Services/orders.service';

@Component({
  selector: 'app-orders-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './orders-form.component.html',
  styleUrl: './orders-form.component.scss'
})
export class OrdersFormComponent implements OnInit {
    private readonly _FormBuilder = inject(FormBuilder);
    private readonly _ActivatedRoute = inject(ActivatedRoute);
    private readonly _OrdersService = inject(OrdersService);


    cartId:string | null =" ";

  orderForm : FormGroup = this._FormBuilder.group({
    details:[null,(Validators.required)],
    phone:[null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:[null,(Validators.required)],
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId = params.get('id');
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  orderSumbit():void{
    this._OrdersService.checkOut(this.cartId, this.orderForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === "success"){
          window.open(res.session.url, '_self')
        }
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
