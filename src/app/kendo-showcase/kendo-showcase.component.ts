import { Component, OnInit } from '@angular/core';
import { PagerSettings, PageChangeEvent, GridDataResult, SortSettings } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import {
  DialogRef,
  DialogCloseResult,
  DialogResult} from '@progress/kendo-angular-dialog';
import { ChipRemoveEvent } from '@progress/kendo-angular-buttons';
import * as KendoAngularDialog from '@progress/kendo-angular-dialog';
import { DialogSize } from '../shared/enums/dialog-size';
import { DialogService } from '../shared/services/abstracts/dialog.service';
import { DialogResultModel } from '../shared/models/dialog/dialog-result-model';

@Component({
  selector: 'kendo-showcase',
  templateUrl: './kendo-showcase.component.html'
})
export class KendoShowcaseComponent implements OnInit {
 listItems: Array<string> = ['Baseball', 'Basketball', 'Cricket', 'Field Hockey', 'Football', 'Table Tennis', 'Tennis', 'Volleyball'];

  DialogSize: typeof DialogSize = DialogSize;

  /* INPUTS */
  maskValue: string = "359884123321";
  mask: string = "(999) 000-00-00-00";
  numericValue: number = 5;
  switchChecked: boolean;
  valueHorizontal: number = 5;
  inputValue: string;
  inputValueDisabled: string;

  datePickerValue: any;
  format: 'dd/MM/YYYY';
  dateTimePickerValue: any;

  /* SPLITBUTTON */
  public splitButtonText: string = 'Reply';
  public splitButtonData: Array<any> = [{
      text: 'Reply All'
  }, {
      text: 'Forward'
  }, {
      text: 'Reply & Delete'
  }];

  /* CHIP */
  public contacts: Array<{ label: string, iconClass: string }> = [
      { label: 'Pedro Afonso', iconClass: 'k-chip-avatar k-icon k-i-user'},
      { label: 'Maria Shore', iconClass: 'k-chip-avatar k-icon k-i-user' },
      { label: 'Thomas Hardy', iconClass: 'k-chip-avatar k-icon k-i-user' },
      { label: 'Christina Berg', iconClass: 'k-chip-avatar k-icon k-i-user' },
      { label: 'Paula Wilson', iconClass: 'k-chip-avatar k-icon k-i-user' }
  ];

  public selectedContacts: Array<any> = [this.contacts[1], this.contacts[2]];

  /* DROPDOWN BUTTON */

  ddbIco: string = 'cog';
  ddbSettings: Array<any> = [{
      text: 'My Profile'
  }, {
      text: 'Friend Requests'
  }, {
      text: 'Account Settings'
  }, {
      text: 'Support'
  }, {
      text: 'Log Out'
  }];


  /* DROPDOWNLIST */
  source: Array<string> = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan'];
  data: Array<string>;

  /* MULTISELECT */
  valueMs: any = ['Baseball']

  /* GRID */
  gridView: GridDataResult;
  pageSettings: PagerSettings = {
    buttonCount: 10,
    info: false,
    type: 'numeric',
    pageSizes: true,
    previousNext: true
  };
  pageSize = 5;
  skip = 0;
  products: any[] = Array(100).fill({}).map((x, idx) => ({
    'ProductID': idx,
    'ProductName': 'Product' + idx.toString(),
    'Discontinued': idx % 2 === 0,
    'Category': {CategoryName: 'category' + idx % 3},
    'UnitsInStock': idx % 2,
    'UnitPrice': idx % 2 * 4
  }));;
  sortSettings: SortSettings = {
    allowUnsort: false,
    mode: 'single'
  };
  sort: SortDescriptor[] = [{
    field: 'ProductName',
    dir: 'asc'
  }];

  /* DIALOG */

  dialogOpened = false;
  windowOpened = false;

  dialogModel: any = {
    username: '',//'tester',
    years: null
  };

  dialogLoader = false;

  /* LOADER */

  loader: boolean;
  opaqueLoader: boolean;

  /* FORM */
  formModel: any = {
    cb: true
  };

  /* INPUT FORM */
  inputForm: any = {
    required: true,
    disabled: false,
    readOnly: false
  };

  constructor(private dialogService: KendoAngularDialog.DialogService, private kendoDialogService: DialogService) {
    this.data = this.source.slice();
    this.loadProducts();
  }

  ngOnInit() {
  }

  onButtonClick() {
  }

  filterChange(filter: string): void {
    this.data = this.source.filter((s) => s.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

  /* GIRD */

  sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.skip = 0;
    this.loadProducts();
  }

  pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.loadProducts();
  }

  private loadProducts(): void {
    this.gridView = {
      data: orderBy(this.products, this.sort).slice(this.skip, this.skip + this.pageSize),
      total: this.products.length
    };
  }

  /* CHIP BUTTON */
  
  public onRemove(e: ChipRemoveEvent): void {
    console.log('Remove event arguments: ', e);
    const index = this.selectedContacts.map(c => c.label).indexOf(e.sender.label);
    this.selectedContacts.splice(index, 1);
  }

  /* DIALOG */

  close(component: any) {
    this['dialogOpened'] = false;
  }

  open(component: string) {
    this.dialogLoader = true;
    this['dialogOpened'] = true;
    setTimeout(()=> {
      this.dialogLoader = false;
    }, 5000);
  }

  action(status: any) {
    console.log(`Dialog result: ${status}`);
    this.dialogOpened = false;
  }

  confirm() {
    const dialog: DialogRef = this.dialogService.open({
        title: 'Please confirm',
        content: 'Are you sure?',
        actions: [
            { text: 'No' },
            { text: 'Yes', primary: true }
        ],
        actionsLayout: 'normal',
        autoFocusedElement: 'No',
        width: 450,
        height: 200,
        minWidth: 250
    });

    dialog.result.subscribe((result) => {
        if (result instanceof DialogCloseResult) {
            console.log('close');
        } else {
            console.log('action', result);
        }
    });
  }

  /* LOADER */

  showLoader() {
    this.loader = true;
    setTimeout(()=> {
     this.loader = false;
    }, 5000);
  }

  showOpaqueLoader() {
    this.opaqueLoader = true;
    setTimeout(()=> {
      this.opaqueLoader = false;
     }, 5000);
  }

  /* FORM */
  onFormSubmit() {
  }

  /* DIALOG TYPES */

  openInfoDialog(){
    this.kendoDialogService.info({
      title: "Connection lost",
      content: "Oh no! Something seems to be wrong with your internet connection. Please check that you are connected and try again."
    })
    .subscribe((x: DialogResultModel) => {console.log(x);});
  }

  openWarningDialog(){
    this.kendoDialogService.warning({
      title: "Oops! Something went wrong",
      content: "Something went wrong and the system has encountered an error while trying to execute your last request. The Versant team has been alerted and this should be resolved soon."
    })
    .subscribe((x: DialogResultModel) => {console.log(x);});
  }

  openConfirmDialog(){
    this.kendoDialogService.confirm({
      title: "Please confirm",
      content: "Are you sure you want to delete the current display definition?"
    })
    .subscribe((x: DialogResultModel) => {console.log(x);});
  }

  openStandardSizeInfoDialog(size: DialogSize){
    this.kendoDialogService.info({
      title: "Connection lost",
      content: "Oh no! Something seems to be wrong with your internet connection.",
      size: size
    })
    .subscribe((x: DialogResultModel) => {console.log(x);});
  }
}
