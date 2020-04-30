import { Component, Input } from '@angular/core';
import { AuditInfoModel } from '../../models/audit-info.model';

@Component({
  selector: 'meta-info',
  templateUrl: './meta-info.component.html'
})
export class MetaInfoComponent  {
  
  @Input() url: string
  @Input() gridColumns: string = 'col-6'

  auditInfo: AuditInfoModel = new AuditInfoModel();

  constructor() { }

  ngOnInit(){
    this.auditInfo = {
      createdBy: 0,
      createdByName: "Task Scheduler",
      createdDate: "0001-01-01T00:00:00",
      id: 64079,
      modifiedBy: 0,
      modifiedByName: "Task Scheduler",
      modifiedDate: "2020-04-30T10:54:36.5121696"
    };
  }

}
