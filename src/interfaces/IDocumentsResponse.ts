import { PaginateResult } from "mongoose";

export interface PaginatedResult<T> extends PaginateResult<Partial<T>> {
  docs: (Partial<T> & { _id: string })[];
}

export interface PaginatedResultPrevNext {
  nextUrlPage: string;
  prevUrlPage: string;
}

export type HasNextPaginate<T> = PaginatedResultPrevNext & T;
