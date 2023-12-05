export const parseListDataMonth = (data) => {
    // Check if data is null or undefined
    if (data == null) {
        console.error("Input data is null or undefined.");
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
        if (index >= 0 && index < monthsWithCounts.length) {
            monthsWithCounts[index].count = item.count;
        }
    });

    return monthsWithCounts;
};

export const parseYearMinMaxToListOject = (data) => {
    const minYear = data.minYear;
    const maxYear = data.maxYear;
    const objects = [];
  
    for (let year = minYear; year <= maxYear; year++) {
      objects.push({ name: year, value: year });
    }
    return objects;
  };
