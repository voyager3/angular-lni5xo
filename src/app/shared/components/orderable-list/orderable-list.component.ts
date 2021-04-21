import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SortableComponent, DragEndEvent } from '@progress/kendo-angular-sortable';
import { NgForm } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'orderable-list',
  templateUrl: './orderable-list.component.html'
})
export class OrderableListComponent implements OnInit {

  @Input() inputType: string = 'url';
  @Input() placeholder: string = '';
  @Input() disabled: boolean;
  @Input() listItems: any[] = [];
  @Output() onItemsChange: EventEmitter<any> = new EventEmitter();

  pattern: string = '.*'
  isEmail: boolean = false;
  emitter = new Subject();
  private subscription: Subscription;

  @ViewChild(SortableComponent) listWrapper: SortableComponent
  @ViewChild('orderableListForm') form: NgForm

  ngOnInit(): void {
    this.setupEmmitter();

    switch(this.inputType){
      case 'url': this.setupUrl()
        break;
      case 'email': this.setupEmail()
        break;
    };
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onDragEnd(event: DragEndEvent){
    this.listItems.forEach((item, index) => item.order = index + 1);
    this.emitter.next();
  }

  addItem(){
    let index = this.listItems.length;
    this.listWrapper.addDataItem({id: 0, text: '', order: index + 1}, index);
    this.emitter.next();
  }

  removeItem(item: any){
    let itemIndex = this.listItems.indexOf(item);
    this.listWrapper.removeDataItem(itemIndex);
    this.emitter.next();
  }

  private setupUrl(){
    this.pattern = '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';
    this.placeholder = 'www.example.com';
  }

  private setupEmail(){
    this.isEmail = true;
  }

  private setupEmmitter(){
    this.subscription = this.emitter
      .pipe(debounceTime(100))
      .subscribe(() => this.onItemsChange.emit({
          items: this.listItems, 
          isStateValid: this.form.valid || this.listItems.length === 0
        })
      );
  }

}
