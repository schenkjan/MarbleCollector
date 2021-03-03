import axios from 'axios';

const API_URL = 'https://localhost:44382/api';

export async function loadChores() {
  //Todo: Implement axios with async await...
  return axios.get(API_URL + '/Chores');
}