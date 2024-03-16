export const useCalculateDecimalDate = (date, dataset) => {
    const birthday = new Date('2021-01-01');
    const millisecondsInDay = 1000 * 60 * 60 * 24;

    if (dataset === '0 to 13 weeks') {
        const millisecondsInWeek = millisecondsInDay * 7;

        const formattedDate = new Date(date);
        const diffInMilliseconds = formattedDate - birthday;
        const diffInWeeks = (diffInMilliseconds / millisecondsInWeek);

        if (diffInWeeks < 0) return null;
        if (diffInWeeks > 13) return null;
        return diffInWeeks.toFixed(2);
    }

    if (dataset === '0 to 2 years') {
        const millisecondsInMonth = millisecondsInDay * 30.44;

        const formattedDate = new Date(date);
        const diffInMilliseconds = formattedDate - birthday;
        const diffInMonths = (diffInMilliseconds / millisecondsInMonth);

        if (diffInMonths < 0) return null;
        if (diffInMonths > 24) return null;
        return diffInMonths.toFixed(2);
    }

    if (dataset === '2 to 5 years') {
        const millisecondsInMonth = millisecondsInDay * 30.44;

        const formattedDate = new Date(date);
        const diffInMilliseconds = formattedDate - birthday;
        const diffInMonths = (diffInMilliseconds / millisecondsInMonth);

        if (diffInMonths < 24) return null;
        if (diffInMonths > 60) return null;
        return diffInMonths.toFixed(2);
    }

    return null;
};
