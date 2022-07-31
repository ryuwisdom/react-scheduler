import React, {useState, useEffect} from 'react'
import moment from 'moment'
import './SchedulerView.scss'
import Modal from "./Modal";
import getCalendar from './api/calendar'
import daysOfWeek from './dateUtil'

const SchedulerView = (theday) => {
    const [nowDay, setNowDay] = useState(theday);
    const [daysOfCurrentWeek, setDaysOfCurrentWeek] = useState(daysOfWeek(nowDay));
    const [planOfThisWeek, setPlanOfThisWeek] = useState([])

    const [modalOpen, setModalOpen] = useState(false)

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

    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
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
                    <div>   {daysOfCurrentWeek.map((item) => {
                        const month = item.format("MM")
                        return <div className='date'>{month}</div>
                    })}</div>
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

                    {daysOfCurrentWeek.map((date) => {
                        let emptyEvent = '';
                        planOfThisWeek.map((plan)=> {
                            const dateTime = date.format("YYYY-MM-DD");
                            const startTime = moment(plan.start.dateTime).format("YYYY-MM-DD")
                            const endTime = moment(plan.end.dateTime).format("YYYY-MM-DD")
                                if(dateTime >= startTime && dateTime <= endTime){
                                    emptyEvent += plan.summary + "\n"
                                }
                        })
                        return <div className='event'>{emptyEvent}</div>
                    })}
                </div>

            </div>

            <div className='bottomSide'>

                <button className='btn' onClick={openModal}>일정확인</button>
                <Modal open={modalOpen} close={closeModal} header="이번주 일정 확인">
                    {
                        planOfThisWeek.map((plan)=> {
                            return <li className='plan'>{plan.summary}</li>
                        })
                    }
                </Modal>
            </div>
        </div>


    )

}

export default SchedulerView