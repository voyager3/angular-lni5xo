import { Observable } from 'rxjs';
import { ApiSettingsModel } from '../../models';

export abstract class ApiService {
  abstract get(url: string, settings?: ApiSettingsModel) : Observable<any>;
  abstract put(url: string, data: any, settings?: ApiSettingsModel) : Observable<any>;
  abstract post(url: string, data: any, settings?: ApiSettingsModel) : Observable<any>;
  abstract delete(url: string, settings?: ApiSettingsModel): Observable<any>
}