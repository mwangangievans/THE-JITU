import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective  implements OnInit{

  constructor(private elem :ElementRef,private render:Renderer2) { }

  ngOnInit(): void {
    this.render.setStyle(this.elem.nativeElement,'color','blue' )
  }

}
