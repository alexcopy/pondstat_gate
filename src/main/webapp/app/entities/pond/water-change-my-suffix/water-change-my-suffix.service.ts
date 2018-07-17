import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWaterChangeMySuffix } from 'app/shared/model/pond/water-change-my-suffix.model';

type EntityResponseType = HttpResponse<IWaterChangeMySuffix>;
type EntityArrayResponseType = HttpResponse<IWaterChangeMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class WaterChangeMySuffixService {
    private resourceUrl = SERVER_API_URL + 'pond/api/water-changes';
    private resourceSearchUrl = SERVER_API_URL + 'pond/api/_search/water-changes';

    constructor(private http: HttpClient) {}

    create(waterChange: IWaterChangeMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(waterChange);
        return this.http
            .post<IWaterChangeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(waterChange: IWaterChangeMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(waterChange);
        return this.http
            .put<IWaterChangeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IWaterChangeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IWaterChangeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IWaterChangeMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(waterChange: IWaterChangeMySuffix): IWaterChangeMySuffix {
        const copy: IWaterChangeMySuffix = Object.assign({}, waterChange, {
            changeDate: waterChange.changeDate != null && waterChange.changeDate.isValid() ? waterChange.changeDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.changeDate = res.body.changeDate != null ? moment(res.body.changeDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((waterChange: IWaterChangeMySuffix) => {
            waterChange.changeDate = waterChange.changeDate != null ? moment(waterChange.changeDate) : null;
        });
        return res;
    }
}
