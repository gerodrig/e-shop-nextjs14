

export const generatePagination = (currentPage: number, totalPages: number) => {

    //1. if number of total pages is less than 7
    // return an array without '...'

    if(totalPages < 7) {
        return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    //2. if current page is within the first 3 pages
    //shoe the first 3 pages, then '...', then the last 2 pages
    if(currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    //3. if current page is within the last 3 pages
    //show the first 2 pages, then '...', then the last 3 pages
    if(currentPage > totalPages - 3) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    //4. if current page is within the middle pages
    //show the first pages, then '...', then the current page, then '...', then the last 2 pages
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];

};