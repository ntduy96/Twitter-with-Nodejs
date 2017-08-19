var express = require('express'),
		bodyParser =  require('body-parser')

var app = express()

app.use(bodyParser.urlencoded({ extended: false}))
.use(bodyParser.json())

app.set('view engine', 'ejs')

app.listen(8000, () => {
	console.log('App running on port 8000')
})

var tweets = []

app.get('/', (req, res) => {
	var title = 'Duy Ngo',
			header = 'Welcome to Duy Ngo'

	res.render('home', {
		// locals: {
			title: title,
			header: header,
			tweets: tweets,
			stylesheets: ['public/style.css']
		// }
	})
})

function acceptsHtml(header) {
	var accepts = header.split(',')
	for (var i = 0; i < accepts.length; i++) {
		if (accepts[i] === 'text/html') {
			return true
		}
	}
}

app.post('/send', (req, res) => {
	if (req.body && req.body.tweet) {
		tweets.push(req.body.tweet)
		if (req.accepts('text/html')) {
			res.redirect('/',301)
		} else {
			res.send({
				status: 'ok',
				message: 'Tweet received'
			})
		}
		
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
