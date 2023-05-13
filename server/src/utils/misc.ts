// Expected input string format: "{'field': 'userId', 'sort': 'desc'}"
export const generateFormattedSort = (sortJsonString?: string) => {
  if (!sortJsonString) {
    return null;
  }

  const parsedSort = JSON.parse(sortJsonString);
  const formattedSort: { [key: string]: 1 | -1 } = {
    [parsedSort.field]: parsedSort.sort === 'asc' ? 1 : -1
  };

  return formattedSort;
};
