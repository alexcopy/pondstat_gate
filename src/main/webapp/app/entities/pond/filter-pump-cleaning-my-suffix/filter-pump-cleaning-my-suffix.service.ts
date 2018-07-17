import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFilterPumpCleaningMySuffix } from 'app/shared/model/pond/filter-pump-cleaning-my-suffix.model';

type EntityResponseType = HttpResponse<IFilterPumpCleaningMySuffix>;
type EntityArrayResponseType = HttpResponse<IFilterPumpCleaningMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class FilterPumpCleaningMySuffixService {
    private resourceUrl = SERVER_API_URL + 'pond/api/filter-pump-cleanings';
    private resourceSearchUrl = SERVER_API_URL + 'pond/api/_search/filter-pump-cleanings';

    constructor(private http: HttpClient) {}

    create(filterPumpCleaning: IFilterPumpCleaningMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(filterPumpCleaning);
        return this.http
            .post<IFilterPumpCleaningMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(filterPumpCleaning: IFilterPumpCleaningMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(filterPumpCleaning);
        return this.http
            .put<IFilterPumpCleaningMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFilterPumpCleaningMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFilterPumpCleaningMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFilterPumpCleaningMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(filterPumpCleaning: IFilterPumpCleaningMySuffix): IFilterPumpCleaningMySuffix {
        const copy: IFilterPumpCleaningMySuffix = Object.assign({}, filterPumpCleaning, {
            cleaningDate:
                filterPumpCleaning.cleaningDate != null && filterPumpCleaning.cleaningDate.isValid()
                    ? filterPumpCleaning.cleaningDate.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.cleaningDate = res.body.cleaningDate != null ? moment(res.body.cleaningDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((filterPumpCleaning: IFilterPumpCleaningMySuffix) => {
            filterPumpCleaning.cleaningDate = filterPumpCleaning.cleaningDate != null ? moment(filterPumpCleaning.cleaningDate) : null;
        });
        return res;
    }
}
