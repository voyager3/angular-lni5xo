import { HttpContentType, HttpResultType } from '../../consts';
import { HttpSettingModel } from '..';
import { hasValue } from '../../../shared/functions';

export class ApiSettingsModel {
    resultType: string;
    contentType: string;

    constructor();
    constructor(httpSettings: HttpSettingModel);

    constructor(param1?: any){
        this.resultType = HttpResultType.Json;
        this.contentType = HttpContentType.ApplicationJson;

        if (hasValue(param1)) {
            this.resultType = param1.resultType;
            this.contentType = param1.contentType;
        }
        else {
            //Empty. If parameterless constructor is called. Keep all as default;
        }
    }
 
}