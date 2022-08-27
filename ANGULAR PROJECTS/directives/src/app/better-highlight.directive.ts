import { style } from '@angular/animations';
import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective  implements OnInit{

  constructor(private elem :ElementRef,private render:Renderer2) { }

  ngOnInit(): void {}

  @HostBinding('style.backgroundColor') backgroundColor  : string = 'transparent';

    @HostListener('mouseenter') mouseenter(eventdata:Event)
     {
    //  this.render.setStyle(this.elem.nativeElement,'background-color','red')
    this.backgroundColor='red';
    }

    @HostListener('mouseleave') mouseleave(eventdata:Event)
     {
    //  this.render.setStyle(this.elem.nativeElement,'background-color','transparent')
    this.backgroundColor='transparent';
    }
  }


