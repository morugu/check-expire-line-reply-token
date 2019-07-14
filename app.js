const express = require('express')
const Client = require('@line/bot-sdk').Client;
const lineConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
}
const client = new Client(lineConfig);
const middleware = require('@line/bot-sdk').middleware
const port = process.env.PORT || 8080
const app = express()

app.post('/webhook', middleware(lineConfig), async (req, res) => {
    res.json()

    const event = req.body.events[0];
    if (event.type === 'message') {
        const message = event.message;
        if (message.type === 'text') {
            try {
                if (isNaN(event.message.text)) {
                    await replyTextMessage(event.replyToken, '数字を入力してください。')
                } else {
                    await timeout(event.message.text)
                    await replyTextMessage(event.replyToken, `replyTokenは${event.message.text}秒経過しても有効でした！`)
                }
            } catch (error) {
                await client.pushMessage(event.source.userId, {
                    type: 'text',
                    text: `replyMessageでエラーが発生しました。${error}`
                })
            }
        }
    }
})

const replyTextMessage = (token, text) => {
    return new Promise(async (resolve, reject) => {
        try {
            await client.replyMessage(token, {
                type: 'text',
                text: text,
            });
            resolve()
        } catch (error) {
            reject(error.originalError.response.data.message)
        }
    })
}

const timeout = (sec) => {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

app.listen(port, () => console.log(`bot server listening on port ${port}`))