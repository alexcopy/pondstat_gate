import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IModelTrainingMySuffix } from 'app/shared/model/vkbot/model-training-my-suffix.model';

type EntityResponseType = HttpResponse<IModelTrainingMySuffix>;
type EntityArrayResponseType = HttpResponse<IModelTrainingMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ModelTrainingMySuffixService {
    private resourceUrl = SERVER_API_URL + 'vkbot/api/model-trainings';
    private resourceSearchUrl = SERVER_API_URL + 'vkbot/api/_search/model-trainings';

    constructor(private http: HttpClient) {}

    create(modelTraining: IModelTrainingMySuffix): Observable<EntityResponseType> {
        return this.http.post<IModelTrainingMySuffix>(this.resourceUrl, modelTraining, { observe: 'response' });
    }

    update(modelTraining: IModelTrainingMySuffix): Observable<EntityResponseType> {
        return this.http.put<IModelTrainingMySuffix>(this.resourceUrl, modelTraining, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IModelTrainingMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IModelTrainingMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IModelTrainingMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
