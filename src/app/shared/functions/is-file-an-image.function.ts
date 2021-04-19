const ImgExtensionRegex: RegExp = /\.(gif|jpe?g|tiff?|png|webp|bmp|jfif)$/;

export function isFileAnImage(fileName: string): boolean {
    return ImgExtensionRegex.test(fileName)
}