import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IChemicalsMySuffix } from 'app/shared/model/pond/chemicals-my-suffix.model';

type EntityResponseType = HttpResponse<IChemicalsMySuffix>;
type EntityArrayResponseType = HttpResponse<IChemicalsMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ChemicalsMySuffixService {
    private resourceUrl = SERVER_API_URL + 'pond/api/chemicals';
    private resourceSearchUrl = SERVER_API_URL + 'pond/api/_search/chemicals';

    constructor(private http: HttpClient) {}

    create(chemicals: IChemicalsMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(chemicals);
        return this.http
            .post<IChemicalsMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(chemicals: IChemicalsMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(chemicals);
        return this.http
            .put<IChemicalsMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IChemicalsMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IChemicalsMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IChemicalsMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(chemicals: IChemicalsMySuffix): IChemicalsMySuffix {
        const copy: IChemicalsMySuffix = Object.assign({}, chemicals, {
            date: chemicals.date != null && chemicals.date.isValid() ? chemicals.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((chemicals: IChemicalsMySuffix) => {
            chemicals.date = chemicals.date != null ? moment(chemicals.date) : null;
        });
        return res;
    }
}
