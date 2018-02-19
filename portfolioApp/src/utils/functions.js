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

// export const addDataToUniqueArray = (dataSet, newEntry) => {
//     console.log(dataSet)
//     console.log(newEntry)
//     console.log(_.includes(dataSet, newEntry))
//     return _.includes(dataSet, newEntry) ? dataSet : [...dataSet, ...newEntry]
// }
