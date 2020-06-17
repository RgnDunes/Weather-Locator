const request = require('request')

const forecast =(lat,long,callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=cf53453001526524874c6a72e0ae8acf&query='+lat+','+long+'&units=m'

	request({url: url, json: true},(error, response)=>{
		if(error)
		{
			callback('Unable to connect to weather service !',undefined)
		}
		else if(response.body.error)
		{
			callback('Unable to find location !',undefined)
		}
		else
		{
			callback(undefined,	'<font color="green">Weather Description :</font> '+response.body.current.weather_descriptions[0]+'<br><font color="green">Temperature :</font> '+response.body.current.temperature+' degrees <br><font color="green">Apparent Temperature :</font> '+response.body.current.feelslike+' degrees <br><font color="green">Wind Speed :</font> '+response.body.current.wind_speed+' Kilometers/Hour')
		}
	})
}

module.exports = forecast