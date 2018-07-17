import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPictureRecognitionMySuffix } from 'app/shared/model/vkbot/picture-recognition-my-suffix.model';

type EntityResponseType = HttpResponse<IPictureRecognitionMySuffix>;
type EntityArrayResponseType = HttpResponse<IPictureRecognitionMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PictureRecognitionMySuffixService {
    private resourceUrl = SERVER_API_URL + 'vkbot/api/picture-recognitions';
    private resourceSearchUrl = SERVER_API_URL + 'vkbot/api/_search/picture-recognitions';

    constructor(private http: HttpClient) {}

    create(pictureRecognition: IPictureRecognitionMySuffix): Observable<EntityResponseType> {
        return this.http.post<IPictureRecognitionMySuffix>(this.resourceUrl, pictureRecognition, { observe: 'response' });
    }

    update(pictureRecognition: IPictureRecognitionMySuffix): Observable<EntityResponseType> {
        return this.http.put<IPictureRecognitionMySuffix>(this.resourceUrl, pictureRecognition, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPictureRecognitionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPictureRecognitionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPictureRecognitionMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
