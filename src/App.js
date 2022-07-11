import React, { useEffect } from 'react';
import { sortBy } from 'lodash';
import { getCountries, getReportByCountry } from './Element/API';
import Headtitle from './Element/Headtitle'
import Model3D from './Element/Model3D'
import Echarts from './Element/EchartsRestores'
import ChartsDeaths from './Element/ChartsDeaths'
import Test from './Element/test';



function App() {
  const [countries, setCountries] = React.useState([]);
  const [selectedCountryId, setSelectedCountryId] = React.useState('');
  const [report, setReport] = React.useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      const { data } = res;
      const countries = sortBy(data, 'Country');
      setCountries(countries);
      setSelectedCountryId('vn');

    });
  /*   getReportByVacxin().then((vacxin) => {
      console.log('getReportByVacxin', { vacxin });
      
    }); */
    

  }, []);
/* 
  const alldata = useEffect(() => {
    if (report && report.length) {
      const laData = report[report.length - 1];
      return [
        {
          title: 'vacXin',
          count: laData.daily_people_vaccinated,
          type: 'confirmed',
        
        }
      ];
    }
    return [];
  }) */
  const handleOnChange = React.useCallback((e) => {
    setSelectedCountryId(e.target.value);

  }, []);
  


  /*  console.log('tiel',selectedCountryId);  */

  useEffect(() => {
    if (selectedCountryId) {
      const selectedCountry = countries.find(
        (country) => country.ISO2 === selectedCountryId.toUpperCase()
      );
      getReportByCountry(selectedCountry.Slug).then((res) => {
       /*  console.log('getReportByCountry', { res }); */
        // remove last item = current date
        res.data.pop();
        setReport(res.data);
      });

    }
  }, [selectedCountryId, countries]);

  return (
    <>
      <div className="Header">
        <h1>
          Coronavirus (COVID-19)
        </h1>
      </div>
      <div className='choose__box'>
        <Headtitle />
        <Test countries={countries} value={selectedCountryId} handleOnChange={handleOnChange} />
      </div>
      <Model3D report={report} />
      <Echarts report={report} countryId={selectedCountryId}   />
      <ChartsDeaths report={report} countryId={selectedCountryId} />
    </>
  );
}

export default App;
