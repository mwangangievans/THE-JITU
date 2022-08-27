import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector:'[appBasicSHighlight]'
})

 export class  BasicHighlightDirective implements OnInit{

    constructor(private Ele : ElementRef){}
    ngOnInit(): void {
        this.Ele.nativeElement.style.backgroundColor = 'green'
       
    }



 }   