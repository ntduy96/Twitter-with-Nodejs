var express = require('express')


app.get('', (req, res) => {
	res.send('Welcome to Node Twitter')
}).listen(8000, () => {
	console.log('App running on port 8000')
})
