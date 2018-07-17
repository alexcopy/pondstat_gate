import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMeterReadingMySuffix } from 'app/shared/model/pond/meter-reading-my-suffix.model';

type EntityResponseType = HttpResponse<IMeterReadingMySuffix>;
type EntityArrayResponseType = HttpResponse<IMeterReadingMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class MeterReadingMySuffixService {
    private resourceUrl = SERVER_API_URL + 'pond/api/meter-readings';
    private resourceSearchUrl = SERVER_API_URL + 'pond/api/_search/meter-readings';

    constructor(private http: HttpClient) {}

    create(meterReading: IMeterReadingMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(meterReading);
        return this.http
            .post<IMeterReadingMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(meterReading: IMeterReadingMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(meterReading);
        return this.http
            .put<IMeterReadingMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMeterReadingMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMeterReadingMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMeterReadingMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(meterReading: IMeterReadingMySuffix): IMeterReadingMySuffix {
        const copy: IMeterReadingMySuffix = Object.assign({}, meterReading, {
            readingDate: meterReading.readingDate != null && meterReading.readingDate.isValid() ? meterReading.readingDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.readingDate = res.body.readingDate != null ? moment(res.body.readingDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((meterReading: IMeterReadingMySuffix) => {
            meterReading.readingDate = meterReading.readingDate != null ? moment(meterReading.readingDate) : null;
        });
        return res;
    }
}
