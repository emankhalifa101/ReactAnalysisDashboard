import axios from 'axios';


export const getDashboardList = async () => {
	const url = 'https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json';
	return axios.get(url);
}