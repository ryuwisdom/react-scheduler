import React, {useState, useEffect} from 'react'
import moment from 'moment'
import './SchedulerView.scss'
import Modal from "./Modal";
import {getCalendar, handleSubmit} from '../api/calendar'
import daysOfWeek from '../utils/dateUtil'

const SchedulerView = (theday) => {
    const [nowDay, setNowDay] = useState(theday);
    const [daysOfCurrentWeek, setDaysOfCurrentWeek] = useState(daysOfWeek(nowDay));
    const [planOfThisWeek, setPlanOfThisWeek] = useState([])
    const [summary, setSummary] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [startDateTime, setStartDateTime] =useState('')
    const [endDateTime, setEndDateTime] =useState('')

    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpen1, setModalOpen1] = useState(false)

    const moveLastWeek = () => {
       const last = moment(nowDay).add(-7, 'days');
        setNowDay(last)
        setDaysOfCurrentWeek(daysOfWeek(nowDay))
        console.log('go last week')
    }

    const moveNextWeek = () => {
        const last = moment(nowDay).add(7, 'days');
        setNowDay(last)
        setDaysOfCurrentWeek(daysOfWeek(nowDay))
        console.log('go next week')
    }

    const reloadCalendar = () => {
        getCalendar(daysOfCurrentWeek[0], daysOfCurrentWeek[6], setPlanOfThisWeek)
    }

    useEffect(()=> { getCalendar(daysOfCurrentWeek[0], daysOfCurrentWeek[6], setPlanOfThisWeek)
    }, [nowDay])


    return (

        <div className='viewPage'>
            <div className='calendarForm'>
                <div className='buttonGroup'>
                    <div className='btn' onClick={()=> {
                        moveLastWeek()
                    }}>prev</div>
                    <div className='btn month' >{daysOfCurrentWeek[0].format('MM')}</div>
                    <div className='btn' onClick={()=> {
                        moveNextWeek()
                    }}>next</div>
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
                                if(dateTime >= startTime && dateTime <= endTime){
                                    emptyEvent += plan.summary + "\n"
                                }
                        })
                        return <div className='event' key={idx}>{emptyEvent}</div>
                    })}
                </div>

            </div>

            <div className='bottomSide'>
                <button className='btn' onClick={()=> setModalOpen1(true)}>일정추가</button>
                <Modal open={modalOpen1} close={()=> setModalOpen1(false)} header="일정추가">
                    {<form onSubmit={(e)=> handleSubmit(e, summary, description, startDateTime, endDateTime, setModalOpen1, reloadCalendar)}>
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
                               onChange={e=>setDescription(e.target.value)}/>
                        <br/>
                        <br/>

                        <label htmlFor='location'>location</label>
                        <br/>
                        <input type='text' id='location'
                               value={location}
                               onChange={e=>setLocation(e.target.value)}/>
                        <br/>
                        <br/>

                        <label htmlFor='startDateTime'>start Date Time</label>

                        <br/>
                        <input type='datetime-local' id='startDateTime'
                               value={startDateTime}
                               onChange={e=>setStartDateTime(e.target.value)}/>
                        <br/>
                        <br/>
                        <label htmlFor='endDateTime'>end Date Time</label>

                        <br/>
                        <input type='datetime-local' id='endDateTime'
                               value={endDateTime}
                               onChange={e=>setEndDateTime(e.target.value)}/>
                        <br/>
                        <br/>
                        <button type='submit'>create event</button>

                    </form>
                       }
                </Modal>

                <button className='btn' onClick={() => setModalOpen(true)}>일정확인</button>
                <Modal open={modalOpen} close={()=> setModalOpen(false)} header="이번주 일정 확인">
                    {
                        planOfThisWeek.map((plan, idx)=> {
                            return <li className='plan' key={idx}>{plan.summary}</li>
                        })
                    }
                </Modal>
            </div>
        </div>


    )

}

export default SchedulerView