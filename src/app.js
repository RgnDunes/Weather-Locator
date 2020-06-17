const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
	res.render('index')
})

app.get('/help',(req, res)=>{
	res.render('help')
})

app.get('/about',(req, res)=>{
	res.render('about')
})

app.get('/weather',(req, res)=>{
	if(!req.query.address)
	{
		return res.send({
			error : 'Enter the address !'
		})
	}

	geocode(req.query.address,(error,data) => {
		if(error)
		{
			console.log(chalk.red('Geocoding Error : '),error)
			return res.send({
				error : error
			})
		}
		forecast(data.latitude,data.longitude,(error,forecastData) => {
			
			if(error)
			{
				console.log(chalk.red('Forecast Error : '),error)
				return res.send({
					error : error
				})
			}
			return res.send({
				Location : data.location,
				Data : forecastData
			})
		})
	})
})

app.get('*',(req,res)=>{
	res.render('404',{
		errormessage: '404 Page not found'
	})
})

app.listen(port, ()=>{
	console.log('[Server '+chalk.blue.inverse('STARTED')+' at port ...]'+port)
})