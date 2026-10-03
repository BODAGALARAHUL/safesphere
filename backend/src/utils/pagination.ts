export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
  take: number;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const parsePagination = (
  query: { page?: unknown; limit?: unknown },
  defaultLimit: number = 20,
  maxLimit: number = 100
): PaginationParams => {
  const pageNumber = typeof query.page === 'string' ? parseInt(query.page, 10) : Number(query.page);
  const limitNumber = typeof query.limit === 'string' ? parseInt(query.limit, 10) : Number(query.limit);

  const page = !isNaN(pageNumber) && pageNumber > 0 ? pageNumber : 1;
  const parsedLimit = !isNaN(limitNumber) && limitNumber > 0 ? limitNumber : defaultLimit;
  const limit = Math.min(parsedLimit, maxLimit);
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
    take: limit,
  };
};

export const buildPaginatedResult = <T>(
  items: T[],
  totalItems: number,
  page: number,
  limit: number
): PaginatedResult<T> => {
  const totalPages = Math.ceil(totalItems / limit) || 1;
  return {
    items,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};
