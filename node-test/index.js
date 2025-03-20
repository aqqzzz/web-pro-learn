// const semver = require('semver')

// console.log(semver.valid('1.2.3')) // '1.2.3'
// console.log(semver.satisfies('1.1.3-beta.1', '^1.1.0'))

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// const folderPath = '../../files/b-error';
const folderCPath = '../../files';
// const folderCFile = '0709-0715.json';
// const outFolderPath = '../../0702-0715-weekc';
// const outFolderFile = '0709-0715.json'

const folderCFile = 'c-error-1101~1202.json';
const outFolderPath = '../../week-c';
const outFolderFile = '1101-1202.json'


const customizer = (objValue, srcValue) => {
    return Number(objValue || 0) + Number(srcValue || 0);
};

const getErrorSum = (obj) => {
    return Object.values(obj).reduce((sum, count) => sum + count, 0);
}

const sortObj = (obj) => {
    const keys = Object.keys(obj);
    let arr = [];
    keys.forEach((key) => {
        arr.push({ key, value: obj[key] });
    })
    
    arr = arr.sort((a, b) => {
        return b.value - a.value;
    })

    const res = arr.reduce((obj, item) => {
        return {
            ...obj,
            [item.key]: item.value
        }
    }, {});
    return res;
}

const getWeekData = (data) => {
    const keys = Object.keys(data);
    let pvErrorCount = 0;
    let sumErrorCount = 0;
    let jsTotalErrors = {};
    let ajaxTotalErrors = {};
    let resourceTotalErrors = {};
    let name = '';
    keys.forEach((key) => {
        const value = data[key];
        name = Object.keys(value)[0];
        const obj = value[name];
        const { pvError = 0, sumError = 0, jsErrors, ajaxErrors, resourceErrors } = obj;
        pvErrorCount += pvError;
        sumErrorCount += sumError;
        _.mergeWith(jsTotalErrors, jsErrors, customizer);
        _.mergeWith(ajaxTotalErrors, ajaxErrors, customizer);
        _.mergeWith(resourceTotalErrors, resourceErrors, customizer);
    })

    const jsSumError = getErrorSum(jsTotalErrors);
    const ajaxSumError = getErrorSum(ajaxTotalErrors);
    const resourceSumError = getErrorSum(resourceTotalErrors);

    return {
        project: name,
        pvError: pvErrorCount,
        sumError: sumErrorCount,
        jsSumError,
        ajaxSumError,
        resourceSumError,
        jsErrors: jsTotalErrors,
        ajaxErrors: ajaxTotalErrors,
        resourceErrors: resourceTotalErrors,
    }

}

// B:
// const weekData = {};
// const files = fs.readdirSync(folderPath).map(fileName => {
//     return {
//         filePath: path.join(folderPath, fileName),
//         fileName
//     };
// })
// files.forEach((file, idx) => {
//     const { fileName, filePath } = file;
//     if (fileName.indexOf('.json') < 0) {
//         return;
//     }
//     const fileContent = fs.readFileSync(filePath);
//     const data = JSON.parse(fileContent);
//     const curWeekData = getWeekData(data);
    
//     fs.writeFile(path.join(outFolderPath, `${curWeekData.project}.json`), JSON.stringify(curWeekData), err => {
//         if (err) {
//             console.log(err);
//         }
//     });
// })
// B end

// C:
const fileContent = fs.readFileSync(path.join(folderCPath, folderCFile));
const data = JSON.parse(fileContent);
const curWeekData = getWeekData(data);
const { jsErrors, ajaxErrors, resourceErrors } = curWeekData;
curWeekData.jsErrors = sortObj(jsErrors);
curWeekData.ajaxErrors = sortObj(ajaxErrors);
curWeekData.resourceErrors = sortObj(resourceErrors);

fs.writeFile(path.join(outFolderPath, outFolderFile), JSON.stringify(curWeekData), err => {
    if (err) {
        console.log(err);
    }
});
// fs.writeFile()

