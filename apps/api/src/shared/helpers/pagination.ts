export const getPagination = (page: number, limit: number) => {
  const take = limit ? +limit : 0;
  const skip = page ? page * take : 0;

  return { take, skip };
};

export const getPagingData = (data: any[], limit: number, page: number) => {
  const items = data[0];
  const totalItems = data[1];
  const currentPage = page ? +page : 0;
  const totalPages = limit ? Math.ceil(totalItems / limit) : 0;
  return { totalItems, items, totalPages, currentPage };
};
