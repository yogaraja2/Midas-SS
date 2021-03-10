import React, { useState, useEffect } from 'react'
import './styles.scss'
import {
    ChartComponent,
    SeriesCollectionDirective,
    SeriesDirective,
    Inject,
    Legend,
    Category,
    Tooltip,
    DataLabel,
    ColumnSeries,
    SplineSeries,
    StripLine,
} from '@syncfusion/ej2-react-charts'
import { Button, Grid } from '@material-ui/core'
import { API } from '../../../config/apis'
import useFetch from '../../../hooks/useFetch'
import { useHistory } from 'react-router-dom'
import { commonRoute } from '../../../config/routes'



function Stats() {

    const { data } = useFetch({
        url: API.gamePlay.stats
    })
    // console.log('stats data')
    // console.log(data)

    useEffect(() => {
        document.getElementById("charts_ChartBorder").setAttribute("opacity", "0.5")
        document.getElementById("charts1_ChartBorder").setAttribute("opacity", "0.5")
    })

    const scorexaxis = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        labelStyle: {
            fontWeight: "Bold"
        },
        title: 'Years',
    }
    const scoreyaxis = {
        //maximum: 25000, interval: 2000, 
        // rangePadding: 'Round',
        majorGridLines: { width: 0 },
        labelStyle: {
            fontWeight: "Bold"
        },
        stripLines: [{ start: 0, size: 3, sizeType: 'Pixel', color: 'rgba(167,169,171, 0.3)' }]
    };

    const score = data?.score;

    const networthxaxis = {
        valueType: 'Category', majorGridLines: { width: 0 },
        labelStyle: {
            fontWeight: "Bold"
        },
        // title: 'weeks',
    }
    const networthyaxis = {
        // maximum: 500000, interval: 50000,
        majorGridLines: { width: 0 }, labelFormat: '${value}',
        labelStyle: {
            fontWeight: "Bold"
        },
        stripLines: [{ start: 0, size: 3, sizeType: 'Pixel', color: 'rgba(167,169,171, 0.3)' }]
    }

    const netWorth = data?.netWorth;
    const retirementSavings = data?.retirementSavings;

    const marker = { visible: true, width: 10, height: 10 }

    const history = useHistory()
    const goToDashboard = () => {
        history.push(commonRoute.dashboard.mainDash)
    }

    return (
        <Grid container className="stats-main">
            {/* <div className="title">
                <h1>Game Stats</h1>
            </div> */}
            <Grid item xs={12} md={10} className="score-wrap">
                <div className="chart-wrap">
                    <div className="chart-title">
                        <h1>Score</h1>
                    </div>
                    <ChartComponent id="charts" primaryXAxis={scorexaxis} primaryYAxis={scoreyaxis} tooltip={{ enable: true }} title="Score">
                        <Inject services={[ColumnSeries, Legend, Tooltip, DataLabel, Category, StripLine]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective
                                dataSource={score}
                                xName='year'
                                yName='score'
                                name='Score'
                                type='Column'
                                columnWidth={0.15}
                                fill='#009ffd'
                            // cornerRadius={{ topLeft: 10, topRight: 10 }}
                            />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </Grid>
            <Grid item xs={12} md={10} className="score-wrap">
                <div className="chart-wrap">
                    <div className="chart-title">
                        <h1>Net Worth</h1>
                    </div>
                    <ChartComponent id="charts1" primaryXAxis={networthxaxis} primaryYAxis={networthyaxis} tooltip={{ enable: true, shared: true }} title="Networth-BreakDown">
                        <Inject services={[SplineSeries, ColumnSeries, Legend, Tooltip, DataLabel, Category, StripLine]} />
                        <SeriesCollectionDirective>

                            <SeriesDirective
                                dataSource={netWorth}
                                xName='year'
                                yName='netWorth'
                                name='Networth'
                                type='Column'
                                fill='#009ffd'
                                columnWidth={0.1}
                                width={2}
                            />
                            <SeriesDirective
                                dataSource={retirementSavings}
                                xName='year'
                                yName='retirementSavings'
                                name='Retirement Savings'
                                type='Spline'
                                fill='#f18e03'
                                marker={marker}
                                width={3}
                            />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </Grid>

            <div className="btn-stat-wrap">
                <div className="btn-wrap" onClick={goToDashboard}>
                    <Button className="nxt-btn">Next</Button>
                </div>
            </div>
            {/* <Grid item xs={12} md={10} className="journal-wrap">
                <div className="journal-title">
                    <h1>Journal(Event Log)</h1>
                </div>
                <div className="summary">
                    <h1 className="summary-title">Summary of events from last 2 turns :</h1>
                    <p className="summary-details">last year I paid <span className="money">$5000</span> for amazing cruise and also bought a new phone for <span className="money">$900</span></p>
                    <p className="summary-details">last year I paid <span className="money">$4000</span> for amazing cruise and also bought a new car for <span className="money">$1200</span></p>
                </div>
            </Grid> */}
        </Grid>
    )
}

export default Stats
