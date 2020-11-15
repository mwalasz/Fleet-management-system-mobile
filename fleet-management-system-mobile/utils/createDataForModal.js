export const userStatisticsData = (data) => {
    return [
        {
            info: 'Ilość tras',
            data: data.numOfTrips,
        },
        {
            info: 'Łączny dystans',
            data: data.totalDistance,
        },
        {
            info: 'Łączny czas',
            data: data.totalDuration,
        },
        {
            info: 'Średnia prędkość',
            data: data.avgSpeed,
        },
        {
            info: 'Maks. prędkość',
            data: data.maxSpeed,
        },
    ];
};
