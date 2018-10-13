//Code based on Connecting Foursquare youtube video by Forrest Walker (https://www.youtube.com/watch?v=Dj5hzKBxCBI&index=3&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP)
class API {
	static baseURL() {
		return 'https://api.foursquare.com/v2';
	}
	static auth() {
		const keys = {
			client_id: 'YCICD4JPL3WSNWHPOC3GK2XJD4AGESLOZBBNSDIQM1KZDVMU',
			client_secret: 'OFWZQI3D01ZAB0KT1L3AIBABHX4DEKEOK42LALRBLPYOSNLV',
			v: '20181009'
		};
		return Object.keys(keys)
		.map(key => `${key}=${keys[key]}`)
		.join('&');
	}
	static urlBuilder(urlParameters) {
		if(!urlParameters){
			return '';
		}
		return Object.keys(urlParameters)
			.map(key => `${key}=${urlParameters[key]}`)
			.join('&');
	}

	static headers() {
		return {
			Accept: 'application/json'
		};
	}
	//takes 3 parameters: endpoint which is anything after 'v2' in base URL, method and url parameters
	static simpleFetch(endPoint, method, urlParameters) {
		let requestData = {
			method,
			headers: API.headers()
		};
		return fetch(
			`${API.baseURL()}${endPoint}?${API.auth()}&${API.urlBuilder(urlParameters)}`,
			requestData
		).then(res => res.json());
	}
}
export default class SquareAPI {
	static search(urlParameters) {
		return API.simpleFetch('/venues/search', 'GET', urlParameters);
	}
	static findVenueDetails(VENUE_ID){
		return API.simpleFetch(`/venues/${VENUE_ID}`, 'GET');
	}
	static findVenuePhotos(VENUE_ID){
		return API.simpleFetch(`/venues/${VENUE_ID}/photos`, 'GET');
	}
}