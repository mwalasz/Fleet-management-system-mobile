export const calcRouteDistance = (arrOfCoords) => {
    if (arrOfCoords) {
        const numberOfCoords = arrOfCoords.length;
        if (numberOfCoords > 1) {
            let overallDistance = 0;
            let processedCoords = 1;

            for (var i = 0; i < numberOfCoords; i++) {
                overallDistance += calcDistanceBetweenCoordinates(
                    arrOfCoords[i],
                    arrOfCoords[i + 1]
                );

                if (++processedCoords >= numberOfCoords)
                    return roundTo(2, overallDistance);
            }
        } else {
            console.log('Not enough data to process!');
            return 0;
        }
    }
};

//Returns distances between two coordinates in meters.
const calcDistanceBetweenCoordinates = (coordFrom, coordTo) => {
    const { latitude: lat1, longitude: lon1 } = coordFrom;
    const { latitude: lat2, longitude: lon2 } = coordTo;
    const p = 0.017453292519943295; // Math.PI / 180
    const c = Math.cos;
    const a =
        0.5 -
        c((lat2 - lat1) * p) / 2 +
        (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
};

//Returns max speed in kmph.
export const calcMaxSpeed = (maxSpeed, speedToCheck) => {
    var speed = 0;
    if (speedToCheck && maxSpeed) {
        speed = (speed * 1000) / 3600; //translate from m/s to km/h

        return roundTo(2, speed >= maxSpeed ? speed : maxSpeed);
    }
    return 0;
};

//Returns average speed in kmph.
export const calcAverageSpeed = (distance, duration) => {
    if (distance && duration) {
        const distanceKm = distance / 1000;
        const durationH = duration / (60 * 60);

        return roundTo(2, distanceKm / durationH);
    }
};

//Returns duration in seconds.
export const calcRouteDuration = (startTime, endTime) => {
    return parseInt(Math.abs(new Date(endTime) - new Date(startTime)) / 1000);
};

export const roundTo = (numOfPlaces, numberToRound) => {
    return numOfPlaces !== 0
        ? parseFloat(numberToRound).toFixed(numOfPlaces)
        : parseFloat(numberToRound);
};
