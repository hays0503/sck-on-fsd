import { createSearchParamsCache, parseAsInteger, parseAsStringLiteral } from "nuqs/server";

const sortOrder = ['asc', 'desc'] as const

export type SortOrder = (typeof sortOrder)[number] // 'asc' | 'desc'

const paginationParsers = {
  page: parseAsInteger.withDefault(1),
  sortOrder: parseAsStringLiteral(sortOrder).withDefault('asc')
};

export const searchParamsCache = createSearchParamsCache(paginationParsers);
