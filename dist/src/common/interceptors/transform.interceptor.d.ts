import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
export interface TransformedResponse<T> {
    data: T;
    statusCode: number;
    timestamp: string;
    path: string;
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, TransformedResponse<T>> {
    private readonly reflector;
    constructor(reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<TransformedResponse<T>>;
}
