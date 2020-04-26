import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PagerSettings, PageChangeEvent, GridDataResult, SortSettings } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import {
  DialogRef,
  DialogCloseResult,
  DialogResult} from '@progress/kendo-angular-dialog';
import { DragEndEvent } from '@progress/kendo-angular-sortable';
import { Orientation, ActionsLayout, PanelBarItemModel, DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { ChipRemoveEvent } from '@progress/kendo-angular-buttons';
import * as KendoAngularDialog from '@progress/kendo-angular-dialog';
import { DialogSize } from '../shared/enums/dialog-size';
import { DialogService } from '../shared/services/abstracts/dialog.service';
import { DialogResultModel } from '../shared/models/dialog/dialog-result-model';
import { CardButtonModel } from '../shared/models/card-button.model';
import { HealthSystemHierarchyModel } from '../shared/models/hierarchies.model';
import { cloneDeep } from 'lodash';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { hsHierarchy, users } from './showcase-test-data';

@Component({
  selector: 'kendo-showcase',
  templateUrl: './kendo-showcase.component.html',
  styleUrls: ['./kendo-showcase.component.scss']
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

  dateInputValue = new Date(2000, 2, 10);
  datePickerValue = new Date(2019, 5, 1, 22);
  format: string = 'MM/dd/yyyy HH:mm';
  dateTimePickerValue = new Date(2019, 5, 1, 22, 40);
  range = { start: null, end: null };
  timePickerValue = new Date(2000, 2, 10, 10, 30, 0);

  /* SPLITBUTTON */

  public splitButtonDefaultData: Array<any> = [{
      text: 'Keep Text Only',
      icon: 'paste-plain-text',
      click: () => { console.log('Keep Text Only'); }
  }, {
      text: 'Paste as HTML',
      icon: 'paste-as-html',
      click: () => { console.log('Paste as HTML'); }
  }, {
      text: 'Paste Markdown',
      icon: 'paste-markdown',
      click: () => { console.log('Paste Markdown'); }
  }, {
      text: 'Set Default Paste',
      click: () => { console.log('Set Default Paste'); }
  }];

  public splitButtonText: string = 'Reply';
  public splitButtonTextData: Array<any> = [{
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

  /* LAYOUT AVATAR */
  public firstContactImage = 'https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg';
  public secondContactImage = 'https://demos.telerik.com/kendo-ui/content/web/Customers/GOURL.jpg';

  public contactImages: Array<any> = [
      { avatar: this.firstContactImage, name: 'Michael Holz', position: 'Manager' },
      { avatar: this.secondContactImage, name: 'André Stewart', position: 'Product Manager' }
  ];

  public contactInitials: Array<any> = [
      { avatar: 'JS', name: 'Jason Smith', position: 'UX Designer' },
      { avatar: 'GP', name: 'George Porter', position: 'Software Engineer' }
  ];

  /* LAYOUT CARD */
  public cardExpanded = false;
  public cardLiked = false;
  public cardBtnText = 'More';

  public cardActionsOrientation: Orientation = 'horizontal';
  public cardActionsLayout: ActionsLayout = 'end';

  public get horizontalStretched(): boolean {
      return this.cardActionsOrientation === 'horizontal' && this.cardActionsLayout === 'stretched';
  }

  public toggleRecipe(): void {
      this.cardExpanded = !this.cardExpanded;
      this.cardBtnText = this.cardExpanded ? 'Less' : 'More';
  }

  public toggleLike(): void {
      this.cardLiked = !this.cardLiked;
  }

  public heartIcon(): string {
      return this.cardLiked ? 'k-icon k-i-heart' : 'k-icon k-i-heart-outline';
  }

  /* LAYOUT PANELBAR */
  private panelBarItems: Array<PanelBarItemModel> = [
      <PanelBarItemModel> {title: "First item", content: "First item content", expanded: true },
      <PanelBarItemModel> {title: "Second item", children: [
              <PanelBarItemModel> {title: "Child item" }
          ]
      }
  ];

  /* LAYOUT DRAWER */
  public drawerSelected = 'Inbox';

  public drawerItems: Array<DrawerItem> = [
      { text: 'Inbox', icon: 'k-i-inbox', selected: true },
      { separator: true },
      { text: 'Notifications', icon: 'k-i-bell' },
      { text: 'Calendar', icon: 'k-i-calendar' },
      { separator: true },
      { text: 'Attachments', icon: 'k-i-hyperlink-email' },
      { text: 'Favourites', icon: 'k-i-star-outline' }
  ];

  public drawerOnSelect(ev: DrawerSelectEvent): void {
      this.drawerSelected = ev.item.text;
  }

  /* DRAG AND DROP */
  dragableData: any[] = [
    {id: 1, name: 'Element 1', order: 1, color: '#e04747'},
    {id: 2, name: 'Element 2', order: 2, color: '#329943'},
    {id: 3, name: 'Element 3', order: 3, color: '#5B87DA'},
    {id: 4, name: 'Element 4', order: 4, color: '#4A4A4A'},
  ];

  onDragEnd(event: DragEndEvent){
    this.dragableData.forEach((item, index) => item.order = index + 1);
    console.log(event)
  }

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
  productsSource: any[];

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

  /* CARD BUTTON FILTER */
  cardBtnModel: CardButtonModel[] = [
    {id:1, text: 'TYPE 1', color: 'rgb(91, 135, 218)', selected: false }, 
    {id:2, text: 'TYPE 2', color: 'green',selected: false },
    {id:3, text: 'TYPE3',  color: 'yellow', selected: false }]

  constructor(private dialogService: KendoAngularDialog.DialogService, private kendoDialogService: DialogService) {
    this.data = this.source.slice();
    this.products = Array(100).fill({}).map((x, idx) => ({
      'type': this.cardBtnModel[idx % 3],
      'ProductID': idx,
      'ProductName': 'Product' + idx.toString(),
      'Discontinued': idx % 2 === 0,
      'Category': {CategoryName: 'category' + idx % 3},
      'UnitsInStock': idx % 2,
      'UnitPrice': idx % 2 * 4
    }));
    this.productsSource = cloneDeep(this.products);
    this.loadProducts();
  }

  
  /* EXTENDED MULTISELECT*/
  msListItems: any = [
    {id:1, name: 'HealthSystem 1'}, 
    {id:2, name: 'HealthSystem 2'}, 
    {id:3, name: 'HealthSystem 3'},
    {id:4, name: 'HealthSystem 4'}, 
    {id:5, name: 'HealthSystem 5'}, 
    {id:6, name: 'HealthSystem 6'}
  ];
  selectedItems:number[] = [6];
  selectedHS: number[] = [];
  selectedF: number[] = [];
  selectedD: number[] = [];
  subscriptions: Subscription[] = [];
  hsHierarchy: HealthSystemHierarchyModel[];
  usersData: any = {};
  users: any[];

  ngOnInit() {
    this.loadLocationHierarchyAsync();
  }

  onButtonClick() {
  }

 ngOnDestroy = () => this.subscriptions.forEach(s => s.unsubscribe())

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

  /* DROPDOWN BUTTON */

  public onPaste(): void {
    console.log('Paste');
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

  /* CARD BUTTON FILTER */
  onButtonFilterChange(filter: CompositeFilterDescriptor): void {
    this.products = filterBy(this.productsSource, filter);
    this.loadProducts();
  }

  /* EXTENDED MULTISELECT*/
  
  onSelectedValuesChange(event: any){
    console.log(this.selectedItems)
  }

  isItemSelected(itemId: number): boolean {
    return this.selectedItems.some(item => item === itemId)
  }

  loadLocationHierarchyAsync(){
    this.subscriptions.push(
      of(hsHierarchy)
      .pipe(delay(500))
      .subscribe(res => this.hsHierarchy = res)
    );
  }
}
