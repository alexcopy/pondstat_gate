import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { VkGroupMySuffix } from './vk-group-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VkGroupMySuffix>;

@Injectable()
export class VkGroupMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'vkbot/api/vk-groups';

    constructor(private http: HttpClient) { }

    create(vkGroup: VkGroupMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(vkGroup);
        return this.http.post<VkGroupMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(vkGroup: VkGroupMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(vkGroup);
        return this.http.put<VkGroupMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VkGroupMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VkGroupMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<VkGroupMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VkGroupMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VkGroupMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VkGroupMySuffix[]>): HttpResponse<VkGroupMySuffix[]> {
        const jsonResponse: VkGroupMySuffix[] = res.body;
        const body: VkGroupMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VkGroupMySuffix.
     */
    private convertItemFromServer(vkGroup: VkGroupMySuffix): VkGroupMySuffix {
        const copy: VkGroupMySuffix = Object.assign({}, vkGroup);
        return copy;
    }

    /**
     * Convert a VkGroupMySuffix to a JSON which can be sent to the server.
     */
    private convert(vkGroup: VkGroupMySuffix): VkGroupMySuffix {
        const copy: VkGroupMySuffix = Object.assign({}, vkGroup);
        return copy;
    }
}
