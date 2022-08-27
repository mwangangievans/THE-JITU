import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective  implements OnInit{

  constructor(private elem :ElementRef,private render:Renderer2) { }

  ngOnInit(): void {}

    @HostListener('mouseenter') mouseenter(eventdata:Event)
     {
     this.render.setStyle(this.elem.nativeElement,'background-color','red')
    }

    @HostListener('mouseleave') mouseleave(eventdata:Event)
     {
     this.render.setStyle(this.elem.nativeElement,'background-color','transparent')
    }
  }


