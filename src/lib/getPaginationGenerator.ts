export const getPaginationGenerator = (
  currentPageNumber: number,
  totalPageNumber: number,
  offset = 2,
): number[] | string[] => {
  // By doing this, when we are close to the beginning or end of the pagination, two numbers are generated after/before the current page,
  // but when we are far from these points (in the middle of the pagination), we generate only one number after/before the current page.
  const offsetNumber =
    currentPageNumber <= offset || currentPageNumber > totalPageNumber - offset
      ? offset
      : offset - 1;
  const numbersList = [];
  const numbersListWithDots: number[] = [];

  // If itemsPerPage is less than what the user selected with the Select component or if there is no page or only one page:
  if (totalPageNumber <= 1 || totalPageNumber === undefined) return [1];

  // Create list of numbers:
  numbersList.push(1);
  for (
    let i = currentPageNumber - offsetNumber;
    i <= currentPageNumber + offsetNumber;
    i++
  ) {
    if (i < totalPageNumber && i > 1) {
      numbersList.push(i);
    }
  }
  numbersList.push(totalPageNumber);

  // Add three dots to the list of numbers:
  numbersList.reduce((accumulator, currentValue) => {
    if (accumulator === 1) {
      numbersListWithDots.push(accumulator);
    }
    if (currentValue - accumulator !== 1) {
      numbersListWithDots.push(-1);
    }
    numbersListWithDots.push(currentValue);

    return currentValue;
  });

  return numbersListWithDots;
};
