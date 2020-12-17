// TODO: API Calls are stored here and can be exported.

import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

// Fetch Data for Cards
export const fetchData = async (country) => {
		let changableUrl = url;
		
	  if(country) { // if country is populated, then change url with changableUrl
			changableUrl = `${url}/countries/${country}`
		}

    try {
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changableUrl);


        return { confirmed, recovered, deaths, lastUpdate };
        
    } catch (error) {
        console.log(error)
    }
}

// Fetch Data for charts/Line graph
export const fetchDailyData = async () => {
    try { 

		const { data: {data} } = await axios.get("https://corona-api.com/timeline");
		
		return data.map((data) => ({
			confirmed: data.confirmed,
			deaths: data.deaths,
			recovered: data.recovered,
			date: data.updated_at,
		}))

		
    } catch(error) {
        console.log("Error from fetchDailyData API: ", error)
    }
}

// Fetch Data for country picker
export const fetchCountries = async () => {
	try {
		const { data: {countries} } = await axios.get(`${url}/countries`);

		return countries.map((country) => country.name);

	} catch(error) {
			console.log(error)
	}
}