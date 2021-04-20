import { Component, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { LearningPlanProductModel } from '../../models';

@Component({
  selector: 'v3-product-meta-info',
  templateUrl: './product-meta-info.component.html'
})
export class ProductMetaInfoComponent implements OnChanges {

  @Input() product: LearningPlanProductModel;
  productMetaInfo: any = {};

  ngOnChanges(): void {
    if (this.product) {
      this.buildProductMetaInfo();
    } 
  }

  private buildProductMetaInfo = (): void  => {
    this.productMetaInfo = {
      competencyProfileName: this.product.competencyProfileName,
      department: this.product.department,
      facility: this.product.facility,
      startDate: moment.parseZone(this.product.startDate).format('MM/DD/YYYY'),
      programStatus: this.product.programStatus,
      assignedCompetenciesCount: this.product.competenciesCount
    };
  }
}
