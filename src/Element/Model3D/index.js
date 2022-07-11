import React, { useMemo, useEffect, useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';


/*  */
export default function Model3D({ report }) {

    ; const boxitem = useMemo(() => {
        if (report && report.length) {
            const latestData = report[report.length - 1];
            return [
                {
                    count: latestData.Country,
                    type: 'country'
                },
                {
                    count1: latestData.Confirmed,
                    type: 'confirmed',
                },
                {
                    count2: latestData.Recovered,
                    type: 'recovered',
                },
                {
                    count3: latestData.Deaths,
                    type: 'death',
                },
            ];
        }
        return [];
    }, [report]);


    /* charts Total number of infections */

    const generateOptions = (report) => {
        const categories = report.map((item) => moment(item.Date).format('MM/YYYY'));
        return {
            chart: {
                height: 400,
                zoomType: 'x',
               
            },
            title: {
                text: 'Number of infections',
            },
              subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                categories: categories,
                crosshair: true,
            },
            
            yAxis: {
                min: 0,
                title: {
                    text: null,
                },
                labels: {
                    align: 'right',
                },
            },
            colors: ['#F3585B'],
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
                  
                    name: 'Number of infections',
                    data: report.map((item) => item.Confirmed),
                    dashStyle: 'longdash'

                },
            ],
        };
    };
    const [options, setOptions] = useState({});

    useEffect(() => {
        setOptions(generateOptions(report));
    }, [report]);

    /*  */


    return (
        < div className='model_box'>
            <div class="sketchfab-embed-wrapper  model_3d">
                <iframe title="SARS-CoV-2 (COVID-19)"
                    frameborder="0" allowfullscreen mozallowfullscreen="true"
                    webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking"
                    xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share
                    src="https://sketchfab.com/models/1533d2519b084a1580ddba0d3c5a3aff/embed?autostart=1&preload=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0">
                </iframe>
            </div>
            <div className='box'>
                <div className='box-list'>
                    <div className='title'>
                        <h2
                        >
                            {
                                boxitem.map((data) =>
                                (

                                    <span>
                                        {data.count}

                                    </span>
                                ))


                            }
                        </h2>

                    </div>
                    <div className='box-ul'>
                        <ul>
                            <li>
                                Total number of infections
                                <br />
                                {
                                    boxitem.map((data) =>
                                    (

                                        <span>
                                            {data.count1}
                                        </span>
                                    ))
                                }
                            </li>
                            <li>
                                Total number of restores
                                <br />
                                {
                                    boxitem.map((data) =>
                                    (

                                        <span>
                                            {data.count2}
                                        </span>
                                    ))
                                }
                            </li>
                        </ul>
                        <ul>
                            <li>
                                Number of deaths
                                <br />
                                {
                                    boxitem.map((data) =>
                                    (

                                        <span>
                                            {data.count3}
                                        </span>
                                    ))
                                }
                            </li>


                        </ul>
                    </div>
                    <div className='box-footer'>
                        <p>
                            "On this page, daily updated data on confirmed and recovered cases and deaths from COVID-19 are provided.
                            of people who have had the full dose of COVID-19 vaccine."
                        </p>

                    </div>
                </div>
                <div className='box-list box-list__item'>
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
