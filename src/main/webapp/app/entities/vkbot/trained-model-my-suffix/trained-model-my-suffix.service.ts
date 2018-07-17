import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITrainedModelMySuffix } from 'app/shared/model/vkbot/trained-model-my-suffix.model';

type EntityResponseType = HttpResponse<ITrainedModelMySuffix>;
type EntityArrayResponseType = HttpResponse<ITrainedModelMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TrainedModelMySuffixService {
    private resourceUrl = SERVER_API_URL + 'vkbot/api/trained-models';
    private resourceSearchUrl = SERVER_API_URL + 'vkbot/api/_search/trained-models';

    constructor(private http: HttpClient) {}

    create(trainedModel: ITrainedModelMySuffix): Observable<EntityResponseType> {
        return this.http.post<ITrainedModelMySuffix>(this.resourceUrl, trainedModel, { observe: 'response' });
    }

    update(trainedModel: ITrainedModelMySuffix): Observable<EntityResponseType> {
        return this.http.put<ITrainedModelMySuffix>(this.resourceUrl, trainedModel, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITrainedModelMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITrainedModelMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITrainedModelMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
