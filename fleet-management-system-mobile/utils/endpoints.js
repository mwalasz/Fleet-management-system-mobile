import { API_URL } from './constans';
import { formatTimeData, formatSpeed, formatDistance } from './formating';
import axios from 'axios';

export const getDriverStatistics = (user, setUserApiData) => {
    console.log(user);
    axios
        .get(`${API_URL}/statistics/get_driver_statistics?mail=${user.email}`, {
            withCredentials: true,
            headers: {
                Authorization: user.token,
            },
        })
        .then((res) => {
            const data = res.data.result;
            if (data != null) {
                console.log('dupa');
                console.log(data);
                setUserApiData({
                    numOfTrips: data.numberOfTrips,
                    avgSpeed: formatSpeed(data.averageSpeedInKilometersPerHour),
                    maxSpeed: formatSpeed(data.maximumSpeedInKilometersPerHour),
                    totalDistance: formatDistance(data.totalDistanceInMeters),
                    totalDuration: formatTimeData(data.totalDurationInSeconds),
                });
            }

            // setIsLoading(false);
        })
        .catch((error) => {
            console.log(
                `Error while attempting to fetch data about driver statistics: ${error}`
            );
        });
};
