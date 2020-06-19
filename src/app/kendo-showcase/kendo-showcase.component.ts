import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { PagerSettings, PageChangeEvent, GridDataResult, SortSettings } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import {
  DialogRef,
  DialogCloseResult,
  DialogResult} from '@progress/kendo-angular-dialog';
import { DragEndEvent } from '@progress/kendo-angular-sortable';
import { Orientation, ActionsLayout, DrawerItem, DrawerSelectEvent, PanelBarItemModel, PanelBarComponent, PanelBarItemComponent } from '@progress/kendo-angular-layout';
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

  /* SHOWCASE ITEMS */

  showcaseItems: Array<DrawerItem> = [
    { text: 'Buttons', selected: true },
    { text: 'Tooltip'},
    { text: 'Dropdowns'},
    { text: 'Input'},
    { text: 'Dates'},
    { text: 'Layout'},
    { text: 'Dialog'},
    { text: 'Grid'},
    { text: 'Sortable'},
    { text: 'Form'}
  ];
  selectedShocaseItem = 'Buttons';

  onSelect(ev: DrawerSelectEvent): void {
    this.selectedShocaseItem = ev.item.text;
  }

  showcaseCustomItems: Array<DrawerItem> = [
    { text: 'Dialog Service', selected: true },
    
    { text: 'Loader'},
    { text: 'Button Filter'},
    { text: 'Date and Time'},
    { text: 'Slide Accordion'},
    { text: 'Orderable List'},
    { text: 'Extended Multiselect'},
    { text: 'Hierarcy Selector'},
    { text: 'Meta info'},
    { text: 'Checkbox tree'}
  ];
  selectedCustomShocaseItem = 'Dialog Service';

  onCustomSelect(ev: DrawerSelectEvent): void {
    this.selectedCustomShocaseItem = ev.item.text;
  }


  /* DROPDOWNS */

  listItems: Array<string> = ['Baseball', 'Basketball', 'Cricket', 'Field Hockey', 'Football', 'Table Tennis', 'Tennis', 'Volleyball'];

  /* INPUTS */

  maskValue: string = "359884123321";
  mask: string = "(999) 000-00-00-00";
  numericValue: number = 5;
  switchChecked: boolean;
  valueHorizontal: number = 5;
  inputValue: string;
  inputValueDisabled: string;

  /* DATE INPUTS */

  dateInputValue = new Date(2000, 2, 10);
  datePickerValue = new Date(2019, 5, 1, 22);
  format: string = 'MM/dd/yyyy HH:mm';
  dateTimePickerValue = new Date(2019, 5, 1, 22, 40);
  range: any = { start: null, end: null };
  timePickerValue = new Date(2000, 2, 10, 10, 30, 0);

  /* BUTTONS -> SPLITBUTTON */
  
  splitButtonDefaultData: Array<any> = [{
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

  splitButtonText: string = 'Reply';
  splitButtonTextData: Array<any> = [{
      text: 'Reply All'
  }, {
      text: 'Forward'
  }, {
      text: 'Reply & Delete'
  }];

  /* BUTTONS -> CHIP */

  contacts: Array<{ label: string, iconClass: string }> = [
      { label: 'Pedro Afonso', iconClass: 'k-chip-avatar k-icon k-i-user'},
      { label: 'Maria Shore', iconClass: 'k-chip-avatar k-icon k-i-user' },
      { label: 'Thomas Hardy', iconClass: 'k-chip-avatar k-icon k-i-user' },
      { label: 'Christina Berg', iconClass: 'k-chip-avatar k-icon k-i-user' },
      { label: 'Paula Wilson', iconClass: 'k-chip-avatar k-icon k-i-user' }
  ];

  selectedContacts: Array<any> = [this.contacts[1], this.contacts[2]];

  onRemove(e: ChipRemoveEvent): void {
    console.log('Remove event arguments: ', e);
    const index = this.selectedContacts.map(c => c.label).indexOf(e.sender.label);
    this.selectedContacts.splice(index, 1);
  }

  /* BUTTONS -> DROPDOWNBUTTON */
  
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
  
  onPaste(): void {
    console.log('Paste');
  }

  /* DROPDOWNS -> DROPDOWNLIST */

  source: Array<string> = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan'];
  data: Array<string>;

  /* DROPDOWNS -> MULTISELECT */

  valueMs: any = ['Baseball'];

  onSelectedValuesChange(event: any){
    console.log(this.selectedItems)
  }

  onMultiSelectClose(event: any) {
      event.preventDefault();
  }

  /* DROPDOWNS -> AUTOCOMPLETE */

  valueAutocomplete: any = 'Cricket';

  /* DROPDOWNDS -> COMBOBOX */

  allowCustom: boolean = true;
  valueCombobox: any = 'Baseball';

  /* LAYOUT -> AVATAR */

  firstContactImage = 'https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg';
  secondContactImage = 'https://demos.telerik.com/kendo-ui/content/web/Customers/GOURL.jpg';

  contactImages: Array<any> = [
      { avatar: this.firstContactImage, name: 'Michael Holz', position: 'Manager' },
      { avatar: this.secondContactImage, name: 'André Stewart', position: 'Product Manager' }
  ];

  contactInitials: Array<any> = [
      { avatar: 'JS', name: 'Jason Smith', position: 'UX Designer' },
      { avatar: 'GP', name: 'George Porter', position: 'Software Engineer' }
  ];

  /* LAYOUT -> CARD */

  cardExpanded = false;
  cardLiked = false;
  cardBtnText = 'More';

  cardActionsOrientation: Orientation = 'horizontal';
  cardActionsLayout: ActionsLayout = 'end';

  get horizontalStretched(): boolean {
      return this.cardActionsOrientation === 'horizontal' && this.cardActionsLayout === 'stretched';
  }

  toggleRecipe(): void {
      this.cardExpanded = !this.cardExpanded;
      this.cardBtnText = this.cardExpanded ? 'Less' : 'More';
  }

  toggleLike(): void {
      this.cardLiked = !this.cardLiked;
  }

  heartIcon(): string {
      return this.cardLiked ? 'k-icon k-i-heart' : 'k-icon k-i-heart-outline';
  }

  /* LAYOUT -> PANELBAR */

  panelBarItems: Array<PanelBarItemModel> = [
      <PanelBarItemModel> {title: "First item", content: "First item content", expanded: true },
      <PanelBarItemModel> {title: "Second item", children: [
              <PanelBarItemModel> {title: "Child item" }
          ]
      }
  ];

  /* LAYOUT -> DRAWER */

  drawerSelected = 'Inbox';

  drawerItems: Array<DrawerItem> = [
      { text: 'Inbox', icon: 'k-i-inbox', selected: true },
      { separator: true },
      { text: 'Notifications', icon: 'k-i-bell' },
      { text: 'Calendar', icon: 'k-i-calendar' },
      { separator: true },
      { text: 'Attachments', icon: 'k-i-hyperlink-email' },
      { text: 'Favourites', icon: 'k-i-star-outline' }
  ];

  drawerOnSelect(ev: DrawerSelectEvent): void {
      this.drawerSelected = ev.item.text;
  }

  /* LAYOUT -> TABSTRIP */

  onTabSelect(e: any) {
    console.log(e);
  }

  /* GRID */

  products: any[];
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
  productsSource: any[];
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
        minHeight: 250,
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

  
  /* SORTABLE */

  dragableData: any[] = [
    {id: 1, name: 'Element 1 Testing a long entry to see how the text will break. Testing a long entry to see how the text will break.', order: 1, color: '#e04747'},
    {id: 2, name: 'Element 2', order: 2, color: '#329943'},
    {id: 3, name: 'Element 3', order: 3, color: '#5B87DA'},
    {id: 4, name: 'Element 4', order: 4, color: '#4A4A4A'},
  ];

  onDragEnd(event: DragEndEvent){
    this.dragableData.forEach((item, index) => item.order = index + 1);
    console.log(event)
  }

  /* LOADER */

  loader: boolean;
  opaqueLoader: boolean;  

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

  formModel: any = {
    cb: true
  };

  onFormSubmit() {
  }

  /* ----- CUSTOM COMPONENTS -----*/

  /* TIMEZONE */

  // timeZone: string;
  // dates: DatesShowcaseModel;
  // tzDatePickerValue: Date;
  // tzDateTimePickerValue: Date;

  /* CARD BUTTON */

  cardBtnModel: CardButtonModel[] = [
    {id:1, text: 'TYPE 1', color: 'rgb(91, 135, 218)', selected: false }, 
    {id:2, text: 'TYPE 2', color: 'green',selected: false },
    {id:3, text: 'TYPE3',  color: 'yellow', selected: false }]


  /* CHECKBOX TOGGLE ALL */

  cbt: any = {
    first: true,
    second: false,
    third: false
  }

  /* CHECKBOX ACTIVATOR */

  cba: any = {
    activate: true,
    first: false,
    second: false,
    third: true
  }

  /* INPUT FORM */

  inputForm: any = {
    required: true,
    disabled: false,
    readOnly: false
  };

  /* META INFO DATA */

  // url1: string = `${NomenclatureController.GetAudit}/Product/2`;
  // url2: string = `${NomenclatureController.GetAudit}/User/64079`;
  // activationDate = '2019-09-15';
  // someOtherField = 'Test field';

  /* ORDERABLE LIST DATA */

  inputType: string = 'url';
  orderableListItems: any[] = [
    {id:1, text: 'http://someurl.com', order: 1},
    {id:2, text: 'test@test.com', order: 2}
  ]

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
  hsHierarchy: HealthSystemHierarchyModel[];
  subscriptions: Subscription[] = [];
  usersData: any = {};
  users: any[];

  isItemSelected(itemId: number): boolean {
    return this.selectedItems.some(item => item === itemId)
  }

  /* SLIDEACCORDION */

  slideAccordionItem: any = {
    title: 'Title',
    expanded: true
  }
  
  constructor(
      private dialogService: KendoAngularDialog.DialogService,
      private kendoDialogService: DialogService//,
      //private api: ApiService
    ) {
    this.products = Array(100).fill({}).map((x, idx) => ({
      'type': this.cardBtnModel[idx % 3],
      'ProductID': idx,
      'ProductName': 'Product' + idx.toString(),
      'Discontinued': idx % 2 === 0,
      'Category': {CategoryName: 'category' + idx % 3},
      'UnitsInStock': idx % 2,
      'UnitPrice': idx % 2 * 4
    }));
    this.data = this.source.slice();
    this.productsSource = cloneDeep(this.products);
    this.users = cloneDeep(users);
    this.loadProducts();
    this.loadUsers();
  }

  
  ngOnInit() {
    // this.api.get(ShowcaseController.Dates).subscribe(dates => {
    //   this.dates = new DatesShowcaseModel(dates.utcNoon, dates.utcNow);
    // });
    
    this.loadLocationHierarchyAsync();
  }

  ngOnDestroy = () => this.subscriptions.forEach(s => s.unsubscribe())

  /* HIERARCHY SELECTOR */

  loadLocationHierarchyAsync(){
    this.subscriptions.push(
      of(hsHierarchy)
      .pipe(delay(500))
      .subscribe(res => this.hsHierarchy = res)
    );
  }

  hierarchySelectorFilterChange(filter: HierarchySelectorFilter){
    this.users = users
      .filter(u => (filter.healthSystemIds.length === 0) || filter.healthSystemIds.indexOf(u.healthSystemId) !== -1)
      .filter(u => (filter.facilityIds.length === 0) || filter.facilityIds.indexOf(u.facilityId) !== -1)
      .filter(u => (filter.departmentIds.length === 0) || filter.departmentIds.indexOf(u.departmentId) !== -1)

    this.loadUsers();
  }

  /* ORDERABLE LIST */

  onOrderableListChange(event: any){
    console.log(event)
  }

  /* DATE AND TIME */

  // saveDate(date: Date) {
  //   this.api.post(ShowcaseController.SaveDate, { date })
  //     .subscribe(() => {
  //       this.kendoDialogService.info(new DialogSettingsModel('Success', 'Date was successfully submitted to the server.'));
  //     });
  // }

  /* DROPDOWNLIST */

  filterChange(filter: string): void {
    this.data = this.source.filter((s) => s.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

  /* GIRD */

  sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.skip = 0;
    this.loadProducts();
    this.loadUsers();
  }

  pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.loadProducts();
    this.loadUsers();
  }

  /* BUTTON FILTER */
    
  onCustomFilterChange(filter: CompositeFilterDescriptor): void {
    this.products = filterBy(this.productsSource, filter);
    this.skip = 0;
    this.loadProducts();
  }

  onButtonFilterChange(filter: CompositeFilterDescriptor): void {
    this.products = filterBy(this.productsSource, filter);
    this.skip = 0;
    this.loadProducts();
  }

  private loadProducts(): void {
    this.gridView = {
      data: orderBy(this.products, this.sort).slice(this.skip, this.skip + this.pageSize),
      total: this.products.length
    };
  }

  private loadUsers(): void {
    this.usersData = {
      data: orderBy(this.users, this.sort).slice(this.skip, this.skip + this.pageSize),
      total: this.users.length
    }
  }

  /* DIALOG SERVICE */

  DialogSize: typeof DialogSize = DialogSize;

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
