import _ from 'lodash'

export const jsonToArray = (data) => {
    return _.map(data, o => {
        return o
    })
}

export const mergeDataSetsByKeys = (dataSet1, dataSet2, key1, key2) => {
    return _.map(dataSet1, (data1) => {
        const data2 = _.find(dataSet2, (b) => {
            return b[key2] === data1[key1]
        })
        return {
            ..._.omit(data1, [key1]),
            ...data2
        }
    })
}

export const isLastCloseDate = (dayString) => {
    const todayNum = new Date().getDay()
    let lastCloseDate = new Date()
    if (todayNum === 0 || todayNum === 1 || todayNum === 6) { // Sunday, Monday, Saturday -> return Friday's date
        while (lastCloseDate.getDay() !== 5) {
            lastCloseDate.setDate(lastCloseDate.getDate() - 1)
        }    
    } else { // return yesterday's date
        lastCloseDate.setDate(lastCloseDate.getDate() - 1)
    }
    return dayString === lastCloseDate.toJSON().slice(0, 10).replace(/-/g, '-')
}

