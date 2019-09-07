import CryptoJS from "crypto-js";

const key = process.env.REACT_APP_PTV_API_KEY;
const devId = process.env.REACT_APP_PTV_DEVID;

export default class NetworkService {
  static apiRequest(query) {
    const request = `${query}&devid=${devId}`;
    const signature = CryptoJS.HmacSHA1(request, key);
    return fetch(
      `https://timetableapi.ptv.vic.gov.au${request}&signature=${signature}`
    )
      .then(resp => resp.json())
      .then(data => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  }
}
