import { HttpContentType } from "../../consts/http-content-type";

export class HttpSettingModel {
    constructor (
        public resultType: string,
        public contentType: string = HttpContentType.ApplicationJson
    ) {
        this.resultType = resultType;
        this.contentType = contentType
    }     
}