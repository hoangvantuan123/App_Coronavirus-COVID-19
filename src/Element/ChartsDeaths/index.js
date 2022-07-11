
import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

export default function ChartsDeaths({ report }) {

  const generateOptions = (report) => {
    const categories = report.map((item) => moment(item.Date).format('MM/YYYY'));
    return {
      chart: {
        height: 400,
        zoomType: 'x',
      },
      title: {
        text: 'Number of Deaths',
      },
      xAxis: {
        categories: categories,
        crosshair: true,
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
          'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      colors: ['#F3585B'],
      yAxis: {
        min: 0,
        title: {
          text: null,
        },
        labels: {
          align: 'right',
        },
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      series: [
        {
          name: 'Number of Deaths',
          data: report.map((item) => item.Deaths),
          dashStyle: 'longdash'
        },
      ],

    };
  };
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions(generateOptions(report));
  }, [report]);

  /* console.log('lightcharts', { report }); */
  return (
    <div className='Echarts'>
      <div className='chart__statistical' >
        <div className='chart__deaths'>
          <HighchartsReact
            data={report}
            highcharts={Highcharts}
            options={options}
          />
        </div>
      </div>
    </div>

  )
}

