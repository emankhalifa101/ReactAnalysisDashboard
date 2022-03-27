import axios from 'axios';

export const getDashboardList = async (url) => {
	return axios.get(url);
}