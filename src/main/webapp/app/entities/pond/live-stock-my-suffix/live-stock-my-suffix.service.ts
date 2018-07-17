import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILiveStockMySuffix } from 'app/shared/model/pond/live-stock-my-suffix.model';

type EntityResponseType = HttpResponse<ILiveStockMySuffix>;
type EntityArrayResponseType = HttpResponse<ILiveStockMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class LiveStockMySuffixService {
    private resourceUrl = SERVER_API_URL + 'pond/api/live-stocks';
    private resourceSearchUrl = SERVER_API_URL + 'pond/api/_search/live-stocks';

    constructor(private http: HttpClient) {}

    create(liveStock: ILiveStockMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(liveStock);
        return this.http
            .post<ILiveStockMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(liveStock: ILiveStockMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(liveStock);
        return this.http
            .put<ILiveStockMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ILiveStockMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILiveStockMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILiveStockMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(liveStock: ILiveStockMySuffix): ILiveStockMySuffix {
        const copy: ILiveStockMySuffix = Object.assign({}, liveStock, {
            date: liveStock.date != null && liveStock.date.isValid() ? liveStock.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((liveStock: ILiveStockMySuffix) => {
            liveStock.date = liveStock.date != null ? moment(liveStock.date) : null;
        });
        return res;
    }
}
