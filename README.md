1)
curl -H 'Authorization: Bearer <YOUR TOKEN HERE>' 'https://api.wit.ai/message?v=20160526&q=what%20is%20the%20weather%20in%20California'

2)
Create Account: https://www.heroku.com
Install: https://toolbelt.heroku.com

3)
heroku apps:create
git push heroku master
heroku open

4)
heroku config:set WIT_TOKEN='your_token_here'
heroku config:set FB_PAGE_TOKEN='your_token_here'
