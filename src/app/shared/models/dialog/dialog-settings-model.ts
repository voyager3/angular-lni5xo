import { DialogSize } from './dialog-size';

export class DialogSettingsModel {    
    title: string;   
    content: string;
    width?: number | string;   
    height?: number | string;   
    autoFocusedElement?: string;
    size?: DialogSize = DialogSize.Medium;

    constructor(
    title: string, 
    content: string,
    width: number | string = undefined,   
    height: number | string = undefined,   
    autoFocusedElement: string = undefined,
    size: DialogSize = DialogSize.Medium
    ) {
        this.title = title;
        this.content = content;
        this.width = width;
        this.height = height;
        this.autoFocusedElement = autoFocusedElement;
        this.size = size;
    }    
}