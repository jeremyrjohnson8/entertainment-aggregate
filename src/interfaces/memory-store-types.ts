import { Subject } from 'rxjs/Subject';

export interface IMemoryStoreData {
  dataSubject: Subject<any>;
  data: any;
  publish(...args): Promise<any>;
  republish(...args): Promise<any>;
}
