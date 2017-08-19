var express = require('express'),
		bodyParser =  require('body-parser')

var app = express()

app.use(bodyParser.urlencoded({ extended: false}))
.use(bodyParser.json())

app.listen(8000, () => {
	console.log('App running on port 8000')
})

var tweets = []

app.get('/', (req, res) => {
	res.send('Welcome to Node Twitter')
})

app.post('/send', (req, res) => {
	if (req.body && req.body.tweet) {
		tweets.push(req.body.tweet)
		res.send({
			status: 'ok',
			message: 'Tweet received'
		})
	} else {
		//no tweet?
		res.send({
			status: 'nok',
			message: 'No tweet received'
		})
	}
})

app.get('/tweets', (req, res) => {
	res.send(tweets)
})
