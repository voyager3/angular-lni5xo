import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { PagerSettings, PageChangeEvent, GridDataResult, SortSettings } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import {
  DialogRef,
  DialogCloseResult,
  DialogResult} from '@progress/kendo-angular-dialog';
import { DragEndEvent } from '@progress/kendo-angular-sortable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Orientation, ActionsLayout, DrawerItem, DrawerSelectEvent, PanelBarItemModel, PanelBarComponent, PanelBarItemComponent } from '@progress/kendo-angular-layout';
import { FileInfo } from '@progress/kendo-angular-upload';
import { ChipRemoveEvent } from '@progress/kendo-angular-buttons';
import * as KendoAngularDialog from '@progress/kendo-angular-dialog';
import { DialogSize } from '../shared/enums/dialog-size';
import { DialogService } from '../shared/services/abstracts/dialog.service';
import { DialogResultModel } from '../shared/models/dialog/dialog-result-model';
import { CardButtonModel } from '../shared/models/card-button.model';
import { HealthSystemHierarchyModel } from '../shared/models/hierarchies.model';
import { TrainSelectorModel } from '../shared/models/train-selector.model'
import { TrainSelectorMode } from '../shared/enums/train-selector-mode.enum'
import { cloneDeep } from 'lodash';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { hsHierarchy, users } from './showcase-test-data';
import { BasicModel } from '../core/models/basic-model';
import { FileUploadInfo, GrouppedButtonModel } from '../shared/models';
import { ImageResolution } from '../shared/interfaces/image-resolution';
import { ImageDimensions, Image } from '../shared/enums';
import { BasicAbbreviationModel } from '../core/models';
import { ApiService } from '../core/services/abstract/api.service';

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
    { text: 'Progress bars'},
    { text: 'Dates'},
    { text: 'Layout'},
    { text: 'Dialog'},
    { text: 'Grid'},
    { text: 'Sortable'},
    { text: 'Form'},
    { text: 'Upload'}
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
    { text: 'Arrow Multiselect'},
    { text: 'Hierarcy Selector'},
    { text: 'Meta info'},
    { text: 'Button Group'},
    { text: 'Auto Complete'},
    { text: 'Train Selector'},
    { text: 'Product Train'},
    { text: 'Checkbox tree'},
    { text: 'Image Upload'},
    { text: 'Image Cropper'},
    { text: 'Infinite Scroll'},
    //{ text: 'Back Button' },
    { text: 'Video Player'},
    { text: 'Self Assessment Levels'}
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

  /* PROGRESS BARS */

  progressBarValue: number = 15;
  progressBarChunks: number = 26;
  progressBarIndeterminate: boolean = true;

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

  /* UPLOAD */

  myFile: FileInfo;
  public myFiles: Array<File>;

  saveFile(){
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
    {id:2, text: 'TYPE 2', color: '#7A56A1',selected: false },
    {id:3, text: 'TYPE3',  color: '#48BBCB', selected: false }]


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

  /*TRAIN SELECTOR */
  trainSelectorMode:TrainSelectorMode = TrainSelectorMode.Arrow;

  rectangleSelectorMode:TrainSelectorMode = TrainSelectorMode.Rectangle;

  disabledTrainSelector:boolean = true;
  trainSelectorItems: TrainSelectorModel[] = [{
    id: 0,
    abbreviation: 'CP',
    name: 'Competency Profile',
    selected: false,
    disabled: true
  }, {
    id: 0,
    abbreviation: 'A',
    name: 'Gap Assessment',
    selected: false,
    disabled: false
  }, {
    id: 0,
    abbreviation: 'L',
    name: 'Learning Plan',
    selected: false,
    disabled: false
  }, {
    id: 0,
    abbreviation: 'R',
    name: 'Remediation',
    selected: true,
    disabled: false
  }, {
    id: 0,
    abbreviation: 'V',
    name: 'Validation',
    selected: false,
    disabled: true
  }, {
    id: 0,
    abbreviation: 'PA',
    name: 'Post Assessment',
    selected: false,
    disabled: false
  }, {
    id: 0,
    abbreviation: 'SC',
    name: 'Supportive Components',
    selected: false,
    disabled: false
  }, {
    id: 0,
    abbreviation: 'CE',
    name: 'Continuing Education',
    selected: true,
    disabled: true
  }, {
    id: 0,
    abbreviation: 'O',
    name: 'Outcomes',
    selected: false,
    disabled: false
  }];

  onTrainSelectorChange(buttons: TrainSelectorModel[]){
    console.log(buttons);
  }
  
  constructor(
      private dialogService: KendoAngularDialog.DialogService,
      private api: ApiService,
      private http: HttpClient,
      private kendoDialogService: DialogService//,
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

    /* Infinite Scrolling */
    this.scrollCallback = this.getScrollerData.bind(this);
  }

  ngOnDestroy = () => this.subscriptions.forEach(s => s.unsubscribe())

  /* Infinite Scroll */
  getScrollerData(): string[] {
    return this.scrollerItems = this.scrollerItems.concat(...this.scrollerItems);
  }


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

  /*Self Assessment Levels*/

  selfAssessmentLevels: BasicModel[] = [
    {id:1, name: 'NOVICE'},
    {id:2, name: 'ADV. BEGINNER'},
    {id:3, name: 'COMPETENT'},
    {id:4, name: 'PROFICIENT'},
    {id:5, name: 'EXPERT'}
  ];  

    /* BUTTON GROUP */

  // buttonsSingle: GrouppedButtonModel[] = [
  //   new GrouppedButtonModel(true, 1, 'align-left'),
  //   new GrouppedButtonModel(false, 2, 'align-center'),
  //   new GrouppedButtonModel(false, 3, 'align-right'),
  //   new GrouppedButtonModel(false, 4, 'align-justify'),
  // ];

  // buttonsMultiple: GrouppedButtonModel[] = [
  //   new GrouppedButtonModel(false, 1, 'bold'),
  //   new GrouppedButtonModel(false, 2, 'italic'),
  //   new GrouppedButtonModel(false, 3, 'underline')
  // ];

    /* AUTO COMPLETE */
  selectedItemId: number;
  options: BasicModel[] = [
    { id: 1, name: 'Administers all medications as ordered and evaluates patient’s response (desired and unexpected effects)' },
    { id: 2, name: 'Provides for patient privacy and confidentiality (e.g. HIPAA compliance and security of electronic health record [EHR])' },
    { id: 3, name: 'Initiates Basic Life Support (BLS), Adult Cardiac Life Support (ACLS), Pediatric Advanced Life Support (PALS), Neonatal Resuscitation Program (NRP) as appropriate' },
    { id: 4, name: 'Identifies emergency considerations for patient’s age and condition' },
    { id: 5, name: 'Incorporates cultural, religious, developmental assessments and educational considerations of patient and care partners in the language that is best understood when providing instructions, education and plan of care' },
    { id: 6, name: 'Discusses evidence-based interventions utilized at the point of care to improve patient outcomes (e.g. therapeutic hypothermia)' },
    { id: 7, name: 'Reassesses patient condition post-test' },
    { id: 8, name: 'Implements quality initiatives and measures within the organization (e.g. core measures, NDNQI, HCAHPS) to achieve patient-centered desired outcomes' }
  ];

  onItemChange(item: BasicModel) {
    console.log(item)
  }

  /* IMAGE UPLOAD */

  defaultImageUrl: string = "https://legionstories.com/wp-content/themes/fox/images/placeholder.jpg";

  // First Image Uploader - Cropping and resized to 72x72
  imageUrl: string = this.defaultImageUrl;
  dimensions: ImageResolution = ImageDimensions[Image.ProfilePictureHeader];
  onUploaded(imageFile: FileUploadInfo): void {
    if (!imageFile) {
      this.imageUrl = this.defaultImageUrl;
      return;
    }
    this.imageUrl = imageFile.src;
    console.log('Emitted image out of uploader1 with cropping: ');
    console.log(imageFile);
  }

  // Second Image Uploader - Cropping and resized to 640x360
  imageUrlSecond: string = this.defaultImageUrl;
  dimensionsForSecond: ImageResolution = { width: 640, height: 360 };
  onUploadedSecond(imageFile: FileUploadInfo): void {
    if (!imageFile) {
      this.imageUrlSecond = this.defaultImageUrl;
      return;
    }
    this.imageUrlSecond = imageFile.src;
    console.log('Emitted image out of uploader2 with cropping: ');
    console.log(imageFile);
  }

  // Third Image Uploader - NO Cropping - only resized to 150x150
  imageUrlNotCropped: string = this.defaultImageUrl;
  dimensionsNotCropped: ImageResolution = ImageDimensions[Image.ProfilePicture];
  onUploadedNotCropped(imageFile: FileUploadInfo): void {
    if (!imageFile) {
      this.imageUrlNotCropped = this.defaultImageUrl;
      return;
    }
    this.imageUrlNotCropped = imageFile.src;
    console.log('Emitted image out of uploader with no cropping: ');
    console.log(imageFile);
  }

  /* Image Cropper */
  
  onEmitedCroppedImage(image: ImageData): void {
    console.log(image);
  }

    /*  PRODUCT TRAIN */

  chevrons: BasicAbbreviationModel[] = [
    {
      id: 1,
      abbreviation: 'CP',
      name: 'Competency Profile',
      isDeletable: false
    },
    {
      id: 2,
      abbreviation: 'A',
      name: 'Gap Assessment',
      isDeletable: false
    },
    {
      id: 3,
      abbreviation: 'L',
      name: 'Learning Plan',
      isDeletable: false
    },
    {
      id: 4,
      abbreviation: 'R',
      name: 'Remediation',
      isDeletable: false
    },
    {
      id: 5,
      abbreviation: 'V',
      name: 'Validation',
      isDeletable: false
    },
    {
      id: 7,
      abbreviation: 'SC',
      name: 'Supportive Components',
      isDeletable: false
    },
    {
      id: 9,
      abbreviation: 'O',
      name: 'Outcomes',
      isDeletable: false
    },
    {
      id: 10,
      abbreviation: 'C',
      name: 'Currency',
      isDeletable: false
    }
  ]

  activeChevrons: number[] = [1, 3, 2]

  contentBins: BasicAbbreviationModel[] = [
    {
      id: 1,
      abbreviation: 'C',
      name: 'Competencies',
      isDeletable: false
    },
    {
      id: 2,
      abbreviation: 'PGA',
      name: 'Performance Gap Assessment',
      isDeletable: false
    },
    {
      id: 3,
      abbreviation: 'PST',
      name: 'Performance Support Tools',
      isDeletable: false
    },
    {
      id: 7,
      abbreviation: 'EM',
      name: 'Education Modules',
      isDeletable: false
    },
    {
      id: 5,
      abbreviation: 'SC',
      name: 'Supportive Components',
      isDeletable: false
    },
    {
      id: 6,
      abbreviation: 'I',
      name: 'Instrument',
      isDeletable: false
    },
    {
      id: 8,
      abbreviation: 'R',
      name: 'References',
      isDeletable: false
    }
  ]

  activeContentBins: number[] = [1];

  /* Infinite Scrolling */
  scrollCallback: any;
  scrollerItems: string[] = ['Text 1', 'Text 2', 'Text 3', 'Text 4', 'Text 5'];


  /* Video Player */
  videoUrl: string;

  loadVideo() {
    this.api.get('/s3-file/url/1568').subscribe(data => {
      this.videoUrl = data.url;
    })
  }

}
