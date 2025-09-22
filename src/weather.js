export async function getWeather(cityName) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=K6ZZ56DKPXKJKQ2FR5VXBFPEP&contentType=json`);

    const result = await response.json();
    return result;
}
