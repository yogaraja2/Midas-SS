import React, { useEffect, useState } from 'react'
import GameCoin from '../../../components/GameCoin'
import Question from './Question'
import Events from './Events'
import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai'
import { Button } from '@material-ui/core'
import Fetch from '../../../Api'
import './style.scss'
import { API } from '../../../config/apis'
import { commonRoute } from '../../../config/routes'
import SnackBar from '../../../components/SnackBar'
import Textfield from '../../../components/Textfield'
import { useSelector, useDispatch } from 'react-redux'
import { setCashflowValues, setCashFlowApiData, setEventsCost, setEventCount } from '../../../redux/Action'
import { TextField } from '@material-ui/core'

const AvailableBal = ({ label, value }) => (
  <div className="avl-bal-entry">
    <span className="label">{label}</span>
    <span className="value-wrap">
      <GameCoin value={value} weight="bold" />
    </span>
  </div>
)

function CashFlowEntry(props) {

  const currentTurn = useSelector(state => state.dashboard.currentTurn)
  const cashflowValues = useSelector(state => state.cashFlowValues)
  const balancesheet = useSelector(state => state.balancesheetData)

  const loanData = balancesheet?.filter((item) => item.year === currentTurn - 1)[0]
  const liability = loanData?.liabilities;
  console.log(liability)

  const surplusAmt = useSelector(state => state.dashboard.surplusAmt)
  const savingAmt = useSelector(state => state.dashboard.savingsAmt)

  const eventState = useSelector(state => state.events)
  const eventCount = useSelector(state => state.eventCount)

  const dispatch = useDispatch()

  const [error, setError] = useState(null)
  const questions = [
    {
      id: 1,
      question: 'How much would you like to spend this year on?',
      fields: [
        { id: 1, name: 'livingExpenses', label: 'Living Expenses', isEnable: true, },
        { id: 2, name: 'entertainment', label: 'Entertainment', isEnable: true, },
        { id: 3, name: 'retirementSavings', label: 'Retirement Savings', isEnable: true, }
      ]
    },
    {
      id: 2,
      question:
        'How much extra would you like to spend this year repaying these debts?',
      fields: [
        { id: 1, name: 'creditCard', label: 'Credit Card', isEnable: liability?.creditLoan.balance > 0 ? true : false, },
        { id: 2, name: 'carLoan', label: 'Car Loan', isEnable: liability?.carLoan.balance > 0 ? true : false, },
        { id: 3, name: 'mortgage', label: 'Mortgage', isEnable: liability?.mortgageLoan.balance > 0 ? true : false, },
        { id: 4, name: 'studentLoan', label: 'Student Loan', isEnable: liability?.studentLoan.balance > 0 ? true : false, },
        { id: 5, name: 'personalLoan', label: 'Personal Loan', isEnable: liability?.personalLoan > 0 ? true : false, }
      ]
    }
  ]

  const [values, setValues] = useState(cashflowValues)

  const goToSelectDream = () => {
    props.history.push(commonRoute.selectDreams)
  }

  const [count, setCount] = useState(eventCount)

  const [events, setEvents] = useState(eventState)

  const addEvents = () => {
    setEvents([...events, { eventName: '', eventCost: '' }])
    setCount(count + 1)
    dispatch(setEventCount(count + 1))
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const eventField = [...events];
    eventField[index][name] = value;
    setEvents(eventField)
    dispatch(setEventsCost(events))
  }

  // console.log('eve')
  // console.log(events)

  const handleSubmit = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('midasToken')}`
    }

    const params = {
      ...values,
      livingExpenses: parseInt(values.livingExpenses || 0),
      entertainment: parseInt(values.entertainment || 0),
      retirementSavings: parseInt(values.retirementSavings || 0),
      creditCard: parseInt(values.creditCard || 0),
      carLoan: parseInt(values.carLoan || 0),
      studentLoan: parseInt(values.studentLoan || 0),
      mortgage: parseInt(values.mortgage || 0),
      personalLoan: parseInt(values.personalLoan || 0),
      events
    }

    dispatch(setCashflowValues(params))

    // console.log('params')
    // console.log(params)

    Fetch.post(API.gamePlay.cashFlow.entry, params, { headers })
      .then((res) => {

        if (res.status === 200) {
          dispatch(setCashFlowApiData(res.data))
          if (res.data.status >= 400) {
            // setError('Your Expenses crossed your credit limit !!!')
            setError(res.data.message)
            // props.history.push(commonRoute.gameOptions)
          }
          else {
            props.history.push({
              pathname: commonRoute.dashboard.cashFlowInfo
            })
          }
        }
        else {
          setError('Something went wrong !!!')
        }
      })
      .catch((err) => {
        setError(
          err.data?.error?.message || err?.response?.data?.error?.message
        )
        setError('Something went wrong !!!')
        console.error(err)
      })
  }

  return (
    <div className="dash-cash-flow-info-page">
      {/* <div className="avl-bal-wrap">
        <AvailableBal label="Income Available" value={surplusAmt < 0 ? 0 : surplusAmt} />
        <AvailableBal label="Savings Available" value={savingAmt < 0 ? 0 : savingAmt} />
      </div> */}

      <div className="turn-wrap">
        <h2 className="current-turn">Turn {currentTurn}</h2>
      </div>

      <div className="questions-wrap">
        {questions.map((i, index) => (
          <Question
            key={index}
            data={i}
            values={values}
            setValues={setValues}
          />
        ))}
      </div>


      <div className="events-wrap">
        <p className="question">How much would you like to spend for various elective events this year on ? </p>
        {events.map((item, index) => (
          <div key={index} className="event-wrap">
            <TextField
              className="eve-name-qus-field"
              id={index}
              label="Event Name"
              name="eventName"
              autoComplete="off"
              value={item.eventName}
              onChange={(e) => handleInputChange(e, index)}
            />
            <TextField
              className="eve-cost-qus-field"
              id={index}
              label="Event Cost"
              name="eventCost"
              autoComplete="off"
              type="number"
              value={item.eventCost}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
        ))}
        <Button className="add-eve-btn" onClick={addEvents} disabled={!(count <= 3)}>Add</Button>
      </div>

      <div className="btn-wrap">
        <Button
          className="dreams-btn"
          disabled={!(currentTurn <= 1)}
          onClick={goToSelectDream}
        >Change Dreams</Button>
        <Button
          className="info-btn"
          onClick={handleSubmit}
          disabled={currentTurn === 0}
        >Try</Button>
      </div>

      {/* <div className="btn-wrap">
        <Button className="info-btn" onClick={handleSubmit}>
          <div className="btn-cont">
            <InfoIcon className="info-icon" />
            <span className="label">info</span>
          </div>
          Try
        </Button>
      </div> */}

      <SnackBar
        openDialog={!!error}
        message={error}
        severity="info"
        onclose={setError.bind(this, null)}
      />
    </div>
  )
}

export default CashFlowEntry
