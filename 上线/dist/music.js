const express = require('express')

const app = express()

app.use(express.static(__dirname))

app.listen(1999,() => {
	console.log('服务启动成功！')
})