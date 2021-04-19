import { ImageResolution } from '../interfaces/image-resolution';

export enum Image {
    FacilityLogo = 1,
    ProfilePictureHeader = 2,
    ProfilePicture = 3,
}
 
export const ImageDimensions = {
    [Image.FacilityLogo]: { width: 162, height: 60 } as ImageResolution,
    [Image.ProfilePictureHeader]: { width: 72, height: 72 } as ImageResolution,
    [Image.ProfilePicture]: { width: 150, height: 150 } as ImageResolution,
}