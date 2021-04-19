import { Directive, AfterViewInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { map, pairwise, filter, startWith, exhaustMap } from 'rxjs/operators';
import { ScrollPosition } from '../../models';

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  scrollHeight: 0,
  scrollTop: 0,
  clientHeight: 0
};

@Directive({
  selector: '[infinite-scrolling]'
})
export class InfiniteScrollingDirective implements AfterViewInit, OnDestroy {

  private scrollPercent: number = 95;
  private scrollEvent$: Observable<any>;
  private userScrolledDown$: Observable<any>;
  private subscription: Subscription;

  @Input() scrollCallback: any;

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    this.registerScrollEvent();
    this.streamScrollEvents();
    this.requestCallbackOnScroll();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private registerScrollEvent(): void {
    this.scrollEvent$ = fromEvent(this.element.nativeElement, 'scroll');
  }

  private streamScrollEvents(): void {
    this.userScrolledDown$ = this.scrollEvent$
      .pipe(
        map((event: any): ScrollPosition => ({
          scrollHeight: event.target.scrollHeight,
          scrollTop: event.target.scrollTop,
          clientHeight: event.target.clientHeight
        })),
        pairwise(),
        filter((positions: ScrollPosition[]) =>
          this.isUserScrollingDown(positions)
          && this.isScrollExpectedPercent(positions[1]))
      );
  }

  private requestCallbackOnScroll(): void {
    this.subscription = this.userScrolledDown$
      .pipe(
        exhaustMap(() => { return this.scrollCallback(); })
      ).subscribe();
  }

  private isUserScrollingDown = (positions: ScrollPosition[]): boolean => positions[0].scrollTop < positions[1].scrollTop;


  private isScrollExpectedPercent = (position: ScrollPosition): boolean =>
    ((position.scrollTop + position.clientHeight) / position.scrollHeight) > (this.scrollPercent / 100);
}
