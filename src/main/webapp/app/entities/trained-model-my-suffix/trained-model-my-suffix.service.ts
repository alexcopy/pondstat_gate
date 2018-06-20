import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TrainedModelMySuffix } from './trained-model-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TrainedModelMySuffix>;

@Injectable()
export class TrainedModelMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'vkbot/api/trained-models';

    constructor(private http: HttpClient) { }

    create(trainedModel: TrainedModelMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(trainedModel);
        return this.http.post<TrainedModelMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(trainedModel: TrainedModelMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(trainedModel);
        return this.http.put<TrainedModelMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TrainedModelMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TrainedModelMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TrainedModelMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TrainedModelMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TrainedModelMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TrainedModelMySuffix[]>): HttpResponse<TrainedModelMySuffix[]> {
        const jsonResponse: TrainedModelMySuffix[] = res.body;
        const body: TrainedModelMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TrainedModelMySuffix.
     */
    private convertItemFromServer(trainedModel: TrainedModelMySuffix): TrainedModelMySuffix {
        const copy: TrainedModelMySuffix = Object.assign({}, trainedModel);
        return copy;
    }

    /**
     * Convert a TrainedModelMySuffix to a JSON which can be sent to the server.
     */
    private convert(trainedModel: TrainedModelMySuffix): TrainedModelMySuffix {
        const copy: TrainedModelMySuffix = Object.assign({}, trainedModel);
        return copy;
    }
}
