import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOtherWorksMySuffix } from 'app/shared/model/pond/other-works-my-suffix.model';

type EntityResponseType = HttpResponse<IOtherWorksMySuffix>;
type EntityArrayResponseType = HttpResponse<IOtherWorksMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class OtherWorksMySuffixService {
    private resourceUrl = SERVER_API_URL + 'pond/api/other-works';
    private resourceSearchUrl = SERVER_API_URL + 'pond/api/_search/other-works';

    constructor(private http: HttpClient) {}

    create(otherWorks: IOtherWorksMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(otherWorks);
        return this.http
            .post<IOtherWorksMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(otherWorks: IOtherWorksMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(otherWorks);
        return this.http
            .put<IOtherWorksMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOtherWorksMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOtherWorksMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOtherWorksMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(otherWorks: IOtherWorksMySuffix): IOtherWorksMySuffix {
        const copy: IOtherWorksMySuffix = Object.assign({}, otherWorks, {
            date: otherWorks.date != null && otherWorks.date.isValid() ? otherWorks.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((otherWorks: IOtherWorksMySuffix) => {
            otherWorks.date = otherWorks.date != null ? moment(otherWorks.date) : null;
        });
        return res;
    }
}
