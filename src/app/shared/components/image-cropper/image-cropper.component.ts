import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ImageCroppedEvent, ImageTransform, base64ToFile } from 'ngx-image-cropper';
import { ImageData } from '../../models';
import { isFileAnImage } from '../../functions';
import { ImageResolution } from '../../interfaces/image-resolution';

@Component({
  selector: 'v3-image-cropper',
  templateUrl: './image-cropper.component.html'
})
export class ImageCropperComponent implements OnInit {
  readonly fileExtensionErrorMessage = 'Provided file is not an image! Alowed image extensions: "*.gif, *.jpg, *.jpeg, *.tif, *.tiff, *.png, *.webp, *.bmp, *.jfif."';

  @Input() dimensions: ImageResolution = { width: 400, height: 300 };
  @Input() imgFormat: string = 'jpeg';
  @Input() imageQuality: number = 100;
  @Input() imgUrl: string;
  @Input() imageFile: File;

  @Output() emitImage: EventEmitter<ImageData> = new EventEmitter();
  @Output() onCancel: EventEmitter<void> = new EventEmitter();

  aspectRatio: number;
  fileLoadedFromCropper: File;
  imageChangedEvent: any;
  croppedImage: string = '';
  onlyScaleDown: boolean = true;
  showButtons: boolean = false;
  canvasRotation: number = 0;
  transform: ImageTransform = {};
  errorMessage: string = '';

  ngOnInit(): void {
    this.aspectRatio = this.dimensions.width / this.dimensions.height;
  }

  fileChangeEvent(event: any): void {  
    if (event.target.files.length > 0) {
      this.fileLoadedFromCropper = event.target.files[0];
      const fileName = this.fileLoadedFromCropper.name;
      if (!isFileAnImage(fileName)) {
        this.errorMessage = this.fileExtensionErrorMessage;
        return;
      }
      this.imageChangedEvent = event;
    }  
    this.resetImage();
    this.errorMessage = '';
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  imageLoaded(): void {
    this.showButtons = true;
  }

  applyCropping(): void {
    this.errorMessage = '';
    const imageBlob: Blob = base64ToFile(this.croppedImage);

    let fileName: string;
    let fileType: string;    
    let propertyBag: FilePropertyBag;

    if (this.imageFile) {
      fileName = this.imageFile.name;
      fileType = this.imageFile.type;
    } else {
      fileName = this.fileLoadedFromCropper.name;
      fileType = this.fileLoadedFromCropper.type;
    }

    propertyBag = { type: fileType };
    const fileToEmit: File = new File([imageBlob], fileName, propertyBag);
    const croppedImageData: ImageData = new ImageData(fileToEmit, this.croppedImage);
    this.emitImage.emit(croppedImageData);
  }

  cancelCropping(): void {
    this.errorMessage = '';
    this.onCancel.emit();
  }

  rotateLeft(): void {
    this.canvasRotation--;
  }

  rotateRight(): void {
    this.canvasRotation++;
  }

  resetImage(): void {
    this.canvasRotation = 0;
    this.transform = {};
  }

  hideErrorMessage(): void {
    this.errorMessage = '';
  }
  
  base64ImageToFile(base64: string): Blob {
    return base64ToFile(base64);
  }
}
