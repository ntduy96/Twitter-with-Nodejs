var http = require('http'),
		assert = require('assert')

var opts = {
	host: '127.0.0.1',
	port: 8000,
	path: '/send',
	method: 'POST',
	headers: {'Content-Type':'application/x-www-form-urlencoded'}
}

var req = http.request(opts, (res) => {
	res.setEncoding('utf8')

	var data = ''
	res.on('data', (d) => {
		data += d
	})

	res.on('end', () => {
		assert.strictEqual(data, '{"status":"ok","message":"Tweet received"}')
		console.log(data)
	})
})

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
})

req.write('tweet=test')
req.end()