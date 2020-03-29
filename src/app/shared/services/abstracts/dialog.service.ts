import { Observable } from 'rxjs';
import { DialogSettingsModel } from '../../models/dialog/dialog-settings-model';

export abstract class DialogService {
  abstract info(settings: DialogSettingsModel): Observable<any>;
  abstract warning(settings: DialogSettingsModel): Observable<any>;
  abstract confirm(settings: DialogSettingsModel): Observable<any>;  
}

