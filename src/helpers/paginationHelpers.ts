import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatePagination = (option: IOptions): IOptionsResult => {
  const page = Number(option.page || 1);
  const limit = Number(option.limit || 10);
  const sortBy = option.sortBy || 'createdAt';
  const sortOrder = option.sortOrder || 'desc';

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};
