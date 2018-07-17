import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITempMeterMySuffix } from 'app/shared/model/pond/temp-meter-my-suffix.model';

type EntityResponseType = HttpResponse<ITempMeterMySuffix>;
type EntityArrayResponseType = HttpResponse<ITempMeterMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TempMeterMySuffixService {
    private resourceUrl = SERVER_API_URL + 'pond/api/temp-meters';
    private resourceSearchUrl = SERVER_API_URL + 'pond/api/_search/temp-meters';

    constructor(private http: HttpClient) {}

    create(tempMeter: ITempMeterMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tempMeter);
        return this.http
            .post<ITempMeterMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(tempMeter: ITempMeterMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tempMeter);
        return this.http
            .put<ITempMeterMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITempMeterMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITempMeterMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITempMeterMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(tempMeter: ITempMeterMySuffix): ITempMeterMySuffix {
        const copy: ITempMeterMySuffix = Object.assign({}, tempMeter, {
            readingDate: tempMeter.readingDate != null && tempMeter.readingDate.isValid() ? tempMeter.readingDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.readingDate = res.body.readingDate != null ? moment(res.body.readingDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((tempMeter: ITempMeterMySuffix) => {
            tempMeter.readingDate = tempMeter.readingDate != null ? moment(tempMeter.readingDate) : null;
        });
        return res;
    }
}
