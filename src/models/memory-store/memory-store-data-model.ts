import { IMemoryStoreData } from './../../interfaces/memory-store-types';
import { Subject } from 'rxjs/Subject';

export class GenericMemoryData<T> implements IMemoryStoreData {

    public data: T = null;
    public dataSubject: Subject<T> = new Subject<T>();

    public publish(value: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.data = value;
            this.dataSubject.next(this.data);
            resolve(this.data);
        });
    }

    public republish(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.dataSubject.next(this.data);
            resolve(this.data);
        });
    }
}