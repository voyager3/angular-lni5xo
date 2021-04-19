import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SelectEvent, FileInfo, RemoveEvent, FileSelectComponent } from '@progress/kendo-angular-upload';
import { FileUploadInfo, ImageData } from '../../models';
import { isFileAnImage } from '../../functions';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { ImageResolution } from '../../interfaces';
import { DialogService } from '../../services/abstracts/dialog.service';
import { Observable, pipe } from 'rxjs';
import { first } from 'rxjs/operators';
import { DialogMessage } from '../../consts';

@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.component.html'
})
export class ImageUploaderComponent {

  @Input() selectBtnName = 'Upload File';
  @Input() imageUrl: string = '';
  @Input() cssClass: string = '';
  @Input() file: any;
  @Input() useCropping: boolean = true;
  @Input() dimensions: ImageResolution = { width: 400, height: 300 };
  @Input() defaultImageUrl: string;

  @Output() onFileUpload: EventEmitter<any> = new EventEmitter();

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  @ViewChild(FileSelectComponent) fsComponent: FileSelectComponent;

  myFiles: any[] = [];
  uploadedFile: File;
  sourceBase64: string;
  fileErrorMessage: string = '';
  errorDialogTitle: string = DialogMessage.UploadingError;
  cropperDialogOpened: boolean = false;

  constructor(private kendoDialogService: DialogService) { }

  ngOnChanges(): void {
    if (this.file && !this.imageUrl && this.myFiles.length === 0) {
      this.myFiles.push(this.file);
    } else if (!this.file && !this.imageUrl && this.myFiles.length > 0) {
      this.myFiles = []
    }
  }

  onSelect(ev: SelectEvent): void {
    const file: FileInfo = ev.files[0];

    if (isFileAnImage(file.name)) {
      this.fileErrorMessage = '';

      if (file.rawFile) {
        this.uploadedFile = file.rawFile;
        const reader = new FileReader();
        reader.onloadend = () => {
          const src = <string>reader.result;
          const selectedFile: FileUploadInfo = new FileUploadInfo(file.name, file.rawFile, src, file.size, file.extension, file.state, file.validationErrors, file.httpSubscription, file.uid);
          this.sourceBase64 = selectedFile.src;

          if (this.useCropping) {
            this.cropperDialogOpened = true;
          } else {
            this.emitResizedImage(file);
          }
        };
        reader.readAsDataURL(file.rawFile);
      }
    } else {
      this.fileErrorMessage = this.imageCropper.fileExtensionErrorMessage;
      this.openWarningDialog();
    }
  }

  onRemove(ev: RemoveEvent): void {
    ev.files.forEach((file: FileInfo) => {
      this.myFiles = this.myFiles.filter(f => f.uid !== file.uid);
    })
  }

  onEmitedCroppedImage(image: ImageData): void {
    this.uploadedFile = image.imageFile;
    this.imageUrl = image.base64;

    const fileToUpload: FileUploadInfo = new FileUploadInfo(image.imageFile.name, image.imageFile, image.base64, image.imageFile.size);

    this.onFileUpload.emit(fileToUpload);
    this.cropperDialogOpened = false;
  }

  onCancelCropping(): void {
    this.cropperDialogOpened = false;
    this.cleanLoadedImage();
  }

  openFileDialog(): void {
    this.fsComponent.fileSelect.nativeElement.click();
  }

  openWarningDialog() {
    this.kendoDialogService.warning({
      title: this.errorDialogTitle,
      content: this.fileErrorMessage
    }).subscribe();
  }

  private compressImage(source: string, resizeWidth: number, resizeHeight: number): Observable<string> {
    const compresedImage$ = new Observable<string>(observer => {
      const image = new Image();
      image.src = source;
      image.onload = () => {
        const element = document.createElement('canvas');
        element.width = resizeWidth;
        element.height = resizeHeight;
        const context = element.getContext('2d');
        context.drawImage(image, 0, 0, resizeWidth, resizeHeight);
        const data: string = context.canvas.toDataURL();
        observer.next(data);
        observer.error(image.onerror);
      };
    });

    return compresedImage$;
  }

  private emitResizedImage(file: FileInfo) {
    this.compressImage(this.sourceBase64, this.dimensions.width, this.dimensions.height)
      .pipe(
        first()
      ).subscribe((resizedBase64Image: string) => {
        const size: number = this.getSizeOfBase64(resizedBase64Image);
        const blob: Blob = this.imageCropper.base64ImageToFile(resizedBase64Image);
        const propertyBag = { type: file.rawFile.type };
        const rawFile: File = new File([blob], file.name, propertyBag);
        const fileToUpload: FileUploadInfo = new FileUploadInfo(file.name, rawFile, resizedBase64Image, size);

        this.myFiles = [fileToUpload];
        this.onFileUpload.emit(fileToUpload);
      });
  }

  private cleanLoadedImage(): void {
    this.uploadedFile = null;
    this.imageUrl = null;
    this.onFileUpload.emit(null);
  }

  private getSizeOfBase64(base64: string): number {
    const equalSignsSubstring: string = base64.substr(base64.length - 2, 2);
    const equalSignMatches: RegExpMatchArray = equalSignsSubstring.match(new RegExp("=", "g"));
    const padding: number = (equalSignMatches || []).length;

    return (base64.length / 4) * 3 - padding;
  }
}

