import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IChemicalAnalysisMySuffix } from 'app/shared/model/pond/chemical-analysis-my-suffix.model';

type EntityResponseType = HttpResponse<IChemicalAnalysisMySuffix>;
type EntityArrayResponseType = HttpResponse<IChemicalAnalysisMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ChemicalAnalysisMySuffixService {
    private resourceUrl = SERVER_API_URL + 'pond/api/chemical-analyses';
    private resourceSearchUrl = SERVER_API_URL + 'pond/api/_search/chemical-analyses';

    constructor(private http: HttpClient) {}

    create(chemicalAnalysis: IChemicalAnalysisMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(chemicalAnalysis);
        return this.http
            .post<IChemicalAnalysisMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(chemicalAnalysis: IChemicalAnalysisMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(chemicalAnalysis);
        return this.http
            .put<IChemicalAnalysisMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IChemicalAnalysisMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IChemicalAnalysisMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IChemicalAnalysisMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(chemicalAnalysis: IChemicalAnalysisMySuffix): IChemicalAnalysisMySuffix {
        const copy: IChemicalAnalysisMySuffix = Object.assign({}, chemicalAnalysis, {
            date: chemicalAnalysis.date != null && chemicalAnalysis.date.isValid() ? chemicalAnalysis.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((chemicalAnalysis: IChemicalAnalysisMySuffix) => {
            chemicalAnalysis.date = chemicalAnalysis.date != null ? moment(chemicalAnalysis.date) : null;
        });
        return res;
    }
}
