var mysql = require('promise-mysql');
var pool
mysql.createPool({
    connectionLimit : 3,
    host            : 'localhost',
    user            : 'root',
    password        : 'Zq72Yp$8',
    database        : 'geography'
    })
    .then((result) => {
        pool = result
    })
    .catch((error) => {
        console.log(error)
});

// function to get the countries
var getCountries = function() {
    return new Promise((resolve, reject) => {
        pool.query('select * from country')
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}
// function to get the cities
var getCities = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from city')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = {getCountries, getCities}