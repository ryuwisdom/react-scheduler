import React, {useState, useEffect} from 'react'
import moment from 'moment'
import './SchedulerView.scss'

import getCalendar from './api/calendar'
import daysOfWeek from './dateUtil'

const SchedulerView = (theday) => {
    const [nowDay, setNowDay] = useState(theday);
    const [daysOfCurrentWeek, setDaysOfCurrentWeek] = useState(daysOfweek(nowDay));
    const [planOfThisWeek, setPlanOfThisWeek] = useState([])


    console.log(daysOfCurrentWeek[0], daysOfCurrentWeek[6])
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

    useEffect(()=> { getCalendar(daysOfCurrentWeek[0], daysOfCurrentWeek[6], setPlanOfThisWeek)
    }, [nowDay])

    const processItem = (date) => {
        let emptyEvent = '';
        for(let plan of planOfThisWeek){
            // console.log(plan)
            const dateTime = date.format("yyyy-MM-DD");
            const startTime = moment(plan.start.dateTime).format("yyyy-MM-DD")
            const endTime = moment(plan.end.dateTime).format("yyyy-MM-DD")

            // console.log(dateTime)
            // console.log(dateTime >= startTime && dateTime <= endTime )

            if(dateTime >= startTime && dateTime <= endTime){
                emptyEvent += plan.summary + "\n"
                console.log('match')
            }
            return <div className='event'>{emptyEvent}</div>
        }
    }

    return (

        <div className='viewPage'>
            {/*<p>SchedulerView page</p>*/}

            <div className='calendarForm'>
                <div className='buttonGroup'>
                    <div className='btn' onClick={()=> {
                        moveLastWeek()

                    }}>prev</div>
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
                    {daysOfCurrentWeek.map((item) => {
                        const month = item.format("MM")
                        const day = item.format("DD")
                        let str = day
                        if(day === "01"){
                            str = month + "-" + day
                        }
                        return <div className='date'>{str}</div>
                    })}
                </div>
                <div className='events'>
                    {daysOfCurrentWeek.map((date) => {return processItem(date)})}
                </div>

            </div>
        </div>


    )

}

export default SchedulerView