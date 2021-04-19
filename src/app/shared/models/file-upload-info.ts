import { FileInfo, FileState } from '@progress/kendo-angular-upload';
import { Subscription } from 'rxjs';

export class FileUploadInfo implements FileInfo {

    constructor(
        public name: string,
        public rawFile: File,
        public src: string,
        public size?: number,
        public extension?: string,
        public state?: FileState,
        public validationErrors?: string[],
        public httpSubscription?: Subscription,
        public uid?: string
    ) { }

}