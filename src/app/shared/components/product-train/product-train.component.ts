import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { BasicAbbreviationModel }
//import { BasicAbbreviationModel } from 'src/app/core/models';
//import { TrainSelectorModel } from 'src/app/shared/models';


@Component({
  selector: 'v3-product-train',
  templateUrl: './product-train.component.html'
})
export class ProductTrainComponent  implements OnInit, OnChanges  {
  @Input() activeChevrons: number[] = [];
  @Input() activeContentBins: number[] = [];
  @Input() chevrons: BasicAbbreviationModel[] = [];
  @Input() contentBins: BasicAbbreviationModel[] = [];

  contentBinSelectorItems: TrainSelectorModel[] = [];
  chevronSelectorItems: TrainSelectorModel[] = [];

  constructor() { }
  
  ngOnChanges(): void {
    this.initializeContentBinSelectorItems();
    this.initializeChevronSelectorItems();
  }

  ngOnInit(): void {
   }

   initializeContentBinSelectorItems(): void {
     this.contentBinSelectorItems =   this.contentBins
      .map(cb => new TrainSelectorModel(
        cb.id,
        cb.abbreviation,
        cb.name,
        this.activeContentBins.includes(cb.id))); 
  }

  initializeChevronSelectorItems():void {
    this.chevronSelectorItems =   this.chevrons
      .map(c => new TrainSelectorModel(
        c.id,
        c.abbreviation,
        c.name,
        this.activeChevrons.includes(c.id)));
  }
}