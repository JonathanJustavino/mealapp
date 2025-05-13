import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appClickOutside]',
    standalone: true,
})
export class ClickOutsideDirective implements OnInit, OnDestroy  {
    @Output() appClickOutside = new EventEmitter<void>();
    private removeClickListener: () => void = () => {};

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        this.removeClickListener = this.renderer.listen('document', 'click', (event: Event) => {
            const clickInside = this.el.nativeElement.contains(event.target);
            if (!clickInside) {
                console.log("clicked outside");
                this.appClickOutside.emit();
            } else {
                console.log("clicked inside");
            }
        });
    }

    ngOnDestroy(): void {
        if (this.removeClickListener) {
            this.removeClickListener();

            console.log("destroyed listener");
        }
    }
}
