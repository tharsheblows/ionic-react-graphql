
import { express } from 'express'
const app = express()

import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: 'true' }))
app.use(bodyParser.json())
app.use(cors())

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

app.use(express.static('www'))
app.set('port', process.env.PORT || 5000)
app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'))
})
