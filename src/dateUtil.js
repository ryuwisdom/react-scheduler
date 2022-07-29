import moment from 'moment'

const daysOfWeek = (day) => {
        return [
            moment(day).day(0),
            moment(day).day(1),
            moment(day).day(2),
            moment(day).day(3),
            moment(day).day(4),
            moment(day).day(5),
            moment(day).day(6),
        ]
    }

export default daysOfWeek

