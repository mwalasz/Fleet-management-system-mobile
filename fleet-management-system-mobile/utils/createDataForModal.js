import {
    formatDate,
    formatSpeed,
    formatDistance,
    formatTimeData,
} from './formating';

export const userStatisticsData = (data) => {
    return [
        {
            info: 'Ilość tras',
            data: data.numOfTrips,
        },
        {
            info: 'Łączny dystans',
            data: formatDistance(data.totalDistance),
        },
        {
            info: 'Łączny czas',
            data: formatTimeData(data.totalDuration),
        },
        {
            info: 'Średnia prędkość',
            data: formatSpeed(data.avgSpeed),
        },
        {
            info: 'Maks. prędkość',
            data: formatSpeed(data.maxSpeed),
        },
    ];
};

export const userCompanyInformations = (data) => {
    return [
        {
            info: 'Opis',
            data: data.description,
        },
        {
            info: 'Adres',
            data: data.address,
        },
        {
            info: 'NIP',
            data: data.nip,
        },
        {
            info: 'Telefon',
            data: data.phoneNumber,
        },
        {
            info: 'Mail',
            data: data.mail,
        },
        {
            info: 'Kierownik',
            data: data.managerName,
        },
        {
            info: 'Kierownik tel.',
            data: data.managerPhoneNumber,
        },
    ];
};

export const driverRecordedTrip = (data) => {
    return [
        {
            info: 'Rozpoczęcie',
            data: formatDate(data.startTime),
        },
        {
            info: 'Zakończenie',
            data: formatDate(data.endTime),
        },
        {
            info: 'Długość trwania',
            data: formatTimeData(data.duration),
        },
        {
            info: 'Całkowity dystans',
            data: formatDistance(data.distance),
        },
        {
            info: 'Maksymalna prędkość',
            data: formatSpeed(data.maxSpeed),
        },
        {
            info: 'Średnia prędkość',
            data: formatSpeed(data.averageSpeed),
        },
    ];
};
