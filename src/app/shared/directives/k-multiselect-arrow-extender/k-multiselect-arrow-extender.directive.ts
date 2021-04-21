import { Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
    selector: '[kmultiselectArrowExtender]'
})
export class KMultiselectArrowExtenderDirective implements OnInit {

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        let parentSpan  = this.renderer.createElement('span');
        this.renderer.setAttribute(parentSpan, 'unselectable', 'on');
        this.renderer.setAttribute(parentSpan, 'class', 'k-select float-right mt-1');

        let childSpan = this.renderer.createElement('span');
        this.renderer.setAttribute(childSpan, 'unselectable', 'on');
        this.renderer.setAttribute(childSpan, 'class', 'k-icon k-i-arrow-s cursor-pointer');

        this.renderer.appendChild(parentSpan, childSpan);
        let multiSelect = this.elementRef.nativeElement.querySelector('.k-multiselect-wrap');
        this.renderer.appendChild(multiSelect, parentSpan);
    }
}
