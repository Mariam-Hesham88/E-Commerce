import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslationService {
  private readonly _TranslateService = inject(TranslateService);
  private readonly _platId = inject(PLATFORM_ID);
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null,null);

  constructor() {
    if(isPlatformBrowser(this._platId)){
      //1- set default lang
      this._TranslateService.setDefaultLang('en')

      //2- get lang from localStorage 
      const savedLang = localStorage.getItem('lang');

      //3- use language if found
      if (savedLang) {
        this._TranslateService.use(savedLang);
      }

      //change direction --> ltr , rtl
      this.changeDirection();
    }
  }

  changeDirection(): void {
    if (localStorage.getItem('lang') === 'en') {
      //document.documentElement.dir = 'ltr';
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'en');
    }
    else if (localStorage.getItem('lang') === 'ar') {
      //document.documentElement.dir = 'rtl';
      //MORE SECURE
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }

  changeLang(lang: string): void {
    if (isPlatformBrowser(this._platId)) {
      localStorage.setItem('lang', lang);
    }

    this._TranslateService.use(lang);
    this.changeDirection();
  }

}
