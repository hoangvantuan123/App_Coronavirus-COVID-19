/* https://api.covid19api.com/countries */
/* import axios from 'axios';


export const getCountries = () =>
  axios.get('https://api.covid19api.com/countries'); */

import axios from "axios";
import moment from 'moment';
export const getCountries = () =>
  axios.get('https://api.covid19api.com/countries');

export const getReportByCountry = (country) =>
  axios.get(
    `https://api.covid19api.com/dayone/country/${country}?${moment()
      .utc(0)
      .format()}`
  );
/* export const getReportByVacxin = (country) =>

  axios.get(
    `https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json`,
    
  ); */

  export const getReportByVacxin = async () => {
    try {
      const { data } = await axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json');
  
      return data.map(({ country, data}) => ({ country, data}));
    } catch (error) {
      return error;
    }
  };

/* 
export const getReportByVacxin = fetch('db.json').then(function (response) {
  return response.json();
})
  .then(function (posts) {
   console.log('api',posts) 
     const { data} = posts.VNM;
    console.log('g',data[892].people_fully_vaccinated) 
 
  })
  .catch(function (err) {
    console.error();
  }) */