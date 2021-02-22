import React from 'react'
import '../../InstructorLogin/StudentDetails/style.scss'
import { Grid, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import {
    AccumulationChartComponent,
    AccumulationSeriesCollectionDirective,
    AccumulationSeriesDirective,
    PieSeries, Inject,
    AccumulationDataLabel
} from '@syncfusion/ej2-react-charts'
import { ProgressBarComponent } from '@syncfusion/ej2-react-progressbar'
import { useHistory } from 'react-router-dom'
import { commonRoute } from '../../../config/routes'

function StudentDetails() {

    const history = useHistory()

    const studentDetail = useSelector(state => state?.studentDetail)

    const data = [
        { x: "income", y: studentDetail.income, color: '#5EAAA8' },
        { x: "networth", y: studentDetail.networth, color: '#FFD66B' },
        { x: "score", y: studentDetail.totalScore, color: '#DB6400' }
    ]

    const incomePer = studentDetail.income / 150000 * 100;
    const networthPer = studentDetail.networth / studentDetail.income * 100;
    const scorePer = studentDetail.totalScore / studentDetail.income * 100;


    const goToStudentsList = () => {
        history.push(commonRoute.schoolAdminLogin.studentsList)
    }

    return (
        <Grid item xs={12} md={10} className="student-details-card">
            <div className="title">
                Student Stats
            </div>
            <div className="stu-detail-wrap">
                <div className="detailed-wrap">
                    <div className="name-wrap">
                        <div className="heading">Name</div>
                        <div className="value">{studentDetail.name}</div>
                    </div>
                    <div className="other-details">
                        <div className="field-wrap">
                            <div className="heading">Rank </div>
                            <div className="value">{studentDetail.leaderBoardRank}</div>
                        </div>
                        <div className="field-wrap">
                            <div className="heading">Game Mode </div>
                            <div className="value">{studentDetail.gameMode || 0}</div>
                        </div>
                        <div className="field-wrap">
                            <div className="heading">Game Length </div>
                            <div className="value">{studentDetail.gameLength || 0}</div>
                        </div>
                        <div className="field-wrap">
                            <div className="heading">Country </div>
                            <div className="value">{studentDetail.country}</div>
                        </div>
                    </div>
                </div>
                <div className="charts-wrap">
                    <AccumulationChartComponent id="charts" height="300" center={{ x: "50%", y: "50%" }}>
                        <Inject services={[PieSeries]} />
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective
                                dataSource={data}
                                xName="x"
                                yName="y"
                                type="Pie"
                                radius="70%"
                                pointColorMapping="color"
                            />
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                    <div className="income-field">
                        <div className="side-head">Income</div>
                        <ProgressBarComponent
                            id="income"
                            type="Linear"
                            width="50%"
                            value={incomePer}
                            progressColor="#5EAAA8"
                            animation={{ enable: true, duration: 2000, delay: 0 }}
                        />
                        <div className="value">{studentDetail.income}</div>
                    </div>
                    <div className="networth-field">
                        <div className="side-head">Networth</div>
                        <ProgressBarComponent
                            id="networth"
                            type="Linear"
                            width="100%"
                            value={networthPer}
                            progressColor="#FFD66B"
                            animation={{ enable: true, duration: 2000, delay: 0 }}
                        />
                        <div className="value">{studentDetail.networth}</div>
                    </div>
                    <div className="score-field">
                        <div className="side-head">Score</div>
                        <ProgressBarComponent
                            id="score"
                            type="Linear"
                            width="50%"
                            value={scorePer}
                            progressColor="#DB6400"
                            animation={{ enable: true, duration: 2000, delay: 0 }}
                        />
                        <div className="value">{studentDetail.totalScore}</div>
                    </div>
                </div>

                <div className="avatar-wrap">
                    <img src={require(`../../../assets/img/Avatar${studentDetail.avatarIcon}.svg`).default} alt="user-avatar" />
                    <div className="btn-wrap">
                        <Button className="back-btn" onClick={goToStudentsList}>Back </Button>
                    </div>
                </div>

            </div>

        </Grid>
    )
}

export default StudentDetails
