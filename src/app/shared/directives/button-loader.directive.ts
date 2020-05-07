import {
  Directive,
  Input,
  OnInit,
  ElementRef,
  Renderer2,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[appButtonLoader]',
})
export class ButtonLoaderDirective implements OnInit, OnChanges {
  @Input('appButtonLoader') showSpinner: boolean;
  spinner: HTMLImageElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.spinner = this.renderer.createElement('img') as HTMLImageElement;
    this.spinner.src = 'assets/images/running-circle.gif';
    this.spinner.alt = 'Spinner';

    this.renderer.appendChild(this.el.nativeElement, this.spinner);
    this.renderer.setStyle(this.spinner, 'display', 'none');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      typeof changes.showSpinner === 'object' &&
      !changes.showSpinner.isFirstChange()
    ) {
      changes.showSpinner.currentValue === true
        ? this.renderer.setStyle(this.spinner, 'display', 'block')
        : this.renderer.setStyle(this.spinner, 'display', 'none');

      this.el.nativeElement.disabled = changes.showSpinner.currentValue;
    }
  }
}
