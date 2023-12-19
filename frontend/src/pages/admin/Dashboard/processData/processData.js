export const parseListDataMonth = (data) => {
    // Check if data is null or undefined
    if (data == null) {
        console.error('Input data is null or undefined.');
        return [];
    }

    // Initialize an array with counts initialized to 0 for all months
    const monthsWithCounts = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        count: 0,
    }));

    // Update counts based on the input data
    data.forEach((item) => {
        const index = item.month - 1;
        if (index >= 0 && index < monthsWithCounts?.length) {
            monthsWithCounts[index].count = item.count;
        }
    });

    return monthsWithCounts;
};

export const parseYearMinMaxToListOject = (data) => {
    const minYear = data?.minYear;
    const maxYear = data?.maxYear;
    const objects = [];
    for (let year = minYear; year <= maxYear; year++) {
        objects.push({ name: year, value: year });
    }
    return objects;
};
export const parseListDataYear = (minYear, data) => {
    const currentYear = new Date().getFullYear();

    // Create a Set to store years present in the original data
    const yearsInData = new Set(data?.map(item => item.year));

    // Generate the final result with all years between minYear and currentYear
    const result = [];
    for (let year = minYear; year <= currentYear; year++) {
        const count = yearsInData.has(year) ? data.find(item => item.year === year).count : 0;
        result.push({ year, count });
    }

    return result;
};