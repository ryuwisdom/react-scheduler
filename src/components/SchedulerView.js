import React, {useState, useEffect} from 'react'
import moment from 'moment'
import './SchedulerView.scss'
import Modal from "./Modal";
import {getCalendar, handleSubmit} from '../api/calendar'
import daysOfWeek from '../utils/date_util'

const SchedulerView = (theday) => {
    const [nowDay, setNowDay] = useState(theday);
    const [daysOfCurrentWeek, setDaysOfCurrentWeek] = useState(daysOfWeek(nowDay));
    const [planOfThisWeek, setPlanOfThisWeek] = useState([])
    const [summary, setSummary] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [startDateTime, setStartDateTime] =useState('')
    const [endDateTime, setEndDateTime] =useState('')

    const [eventAddModalOpen, setEventAddModalOpen] = useState(false)
    const [eventViewModalOpen, setEventViewModalOpen] = useState(false)

    const moveLastWeek = () => {
       const last = moment(nowDay).add(-7, 'days');
        setNowDay(last)
        setDaysOfCurrentWeek(daysOfWeek(nowDay))
    }

    const moveNextWeek = () => {
        const last = moment(nowDay).add(7, 'days');
        setNowDay(last)
        setDaysOfCurrentWeek(daysOfWeek(nowDay))
    }

    const reloadCalendar = () => {
        getCalendar(daysOfCurrentWeek[0], daysOfCurrentWeek[6], setPlanOfThisWeek)
    }

    useEffect(()=> reloadCalendar(), [nowDay])


    return (

        <div className='viewPage'>
            <div className='calendarForm'>
                <div className='buttonGroup'>
                    <div className='btn' onClick={()=> {
                        moveLastWeek()
                    }}>◀️</div>
                    <div className='btn month' >{daysOfCurrentWeek[0].format('MM')}</div>
                    <div className='btn' onClick={()=> {
                        moveNextWeek()
                    }}>▶️</div>
                </div>
                <div className='days'>
                    <div className='daysName'>일</div>
                    <div className='daysName'>월</div>
                    <div className='daysName'>화</div>
                    <div className='daysName'>수</div>
                    <div className='daysName'>목</div>
                    <div className='daysName'>금</div>
                    <div className='daysName'>토</div>
                </div>
                <div className='dates'>
                    {daysOfCurrentWeek.map((item, idx) => {
                        const month = item.format("MM")
                        const day = item.format("DD")
                        let str = day
                        if(day === "01"){
                            str = month + "-" + day
                        }
                        return <div className='date' key={idx}>{str}</div>
                    })}
                </div>
                <div className='events'>

                    {daysOfCurrentWeek.map((date,idx) => {
                        let emptyEvent = '';
                        planOfThisWeek.map((plan)=> {
                            const dateTime = date.format("YYYY-MM-DD");
                            const startTime = moment(plan.start.dateTime).format("YYYY-MM-DD")
                            const endTime = moment(plan.end.dateTime).format("YYYY-MM-DD")
                            const fromTime = moment(plan.start.dateTime).format("hh:mm a")
                                if(dateTime >= startTime && dateTime <= endTime){
                                    emptyEvent += '[' + fromTime +'] ' + plan.summary + '\n'
                                }
                        })
                        return <div className='event' key={idx}>{emptyEvent}</div>
                    })}
                </div>

            </div>

            <div className='bottomSide'>
                <button className='btn' onClick={()=> setEventAddModalOpen(true)}>일정추가</button>
                <Modal open={eventAddModalOpen} close={()=> setEventAddModalOpen(false)} header="일정추가">
                    {<form onSubmit={(e)=>
                        handleSubmit(e, summary, description, location, startDateTime, endDateTime, setEventAddModalOpen, reloadCalendar)}>
                        <label htmlFor='summary'>summary</label>
                        <br/>
                        <input type='text' id='summary'
                               value={summary}
                               onChange={e=>setSummary(e.target.value)}/>
                        <br/>
                        <label htmlFor='description'>description</label>
                        <br/>
                        <textarea
                               id='description'
                               value={description}
                               onChange={e=>setDescription(e.target.value)}
                        />
                        <br/>
                        <label htmlFor='location'>location</label>
                        <br/>
                        <input type='text' id='location'
                               value={location}
                               onChange={e=>setLocation(e.target.value)}/>
                        <br/>
                        <br/>
                        <label htmlFor='startDateTime'>Start Date Time</label>
                        <br/>
                        <input type='datetime-local' id='startDateTime'
                               value={startDateTime}
                               onChange={e=>setStartDateTime(e.target.value)}/>
                        <br/>
                        <br/>
                        <label htmlFor='endDateTime'>End Date Time</label>
                        <br/>
                        <input type='datetime-local' id='endDateTime'
                               value={endDateTime}
                               onChange={e=>setEndDateTime(e.target.value)}/>
                        <br/>
                        <br/>
                        <button type='submit'>Create Event</button>
                    </form>
                       }
                </Modal>

                <button className='btn' onClick={() => setEventViewModalOpen(true)}>일정확인</button>
                <Modal open={eventViewModalOpen} close={()=> setEventViewModalOpen(false)} header="이번주 일정 확인">
                    {
                        planOfThisWeek.map((plan, idx)=> {
                            const fromTime = moment(plan.start.dateTime).format("hh:mm a")
                            return <li className='plan' key={idx}>{'[' + fromTime +'] ' + plan.summary }</li>
                        })
                    }
                </Modal>
            </div>
        </div>


    )

}

export default SchedulerView