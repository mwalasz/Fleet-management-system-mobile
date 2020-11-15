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
