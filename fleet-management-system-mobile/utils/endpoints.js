import { API_URL } from './constans';
import { formatTimeData, formatSpeed, formatDistance } from './formating';
import axios from 'axios';

export const getDriverStatistics = (user, setData) => {
    axios
        .get(`${API_URL}/statistics/get_driver_statistics?mail=${user.email}`, {
            withCredentials: true,
            headers: {
                Authorization: user.token,
            },
        })
        .then((res) => {
            const data = res.data.result;
            console.log(data);

            if (data != null) {
                setData({
                    numOfTrips: data.numberOfTrips,
                    avgSpeed: formatSpeed(data.averageSpeedInKilometersPerHour),
                    maxSpeed: formatSpeed(data.maximumSpeedInKilometersPerHour),
                    totalDistance: formatDistance(data.totalDistanceInMeters),
                    totalDuration: formatTimeData(data.totalDurationInSeconds),
                    licenseNumber: data.driverLicenseNumber,
                });
            }
        })
        .catch((error) => {
            console.log(
                `Error while attempting to fetch data about driver statistics:\n ${error}`
            );
        });
};

export const getDriverCompanyInfo = (user, setData) => {
    console.log(user);
    axios
        .get(`${API_URL}/drivers/get_driver_company?mail=${user.email}`, {
            withCredentials: true,
            headers: {
                Authorization: user.token,
            },
        })
        .then((res) => {
            const data = res.data.result;
            if (data != null) {
                const {
                    firstName,
                    lastName,
                    phoneNumber,
                } = data.managerAccount.account;
                setData({
                    companyName: data.name,
                    address: data.address,
                    mail: data.mail,
                    nip: data.nip,
                    phoneNumber: data.phoneNumber,
                    description: data.description,
                    managerName: `${firstName} ${lastName}`,
                    managerPhoneNumber: phoneNumber,
                });
            }

            // setIsLoading(false);
        })
        .catch((error) => {
            console.log(
                `Error while attempting to fetch data about driver company info:\n ${error}`
            );
        });
};
