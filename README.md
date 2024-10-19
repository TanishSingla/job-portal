# Job Portal

This is a full-stack job portal application with separate frontend and backend environments. The project uses Twilio for mobile OTP verification, and node mailer for emails.

#### 1) Here you can post the jobs.
#### 2) Can apply on jobs.
#### 3) Can send job notification to multiple users at same time.
#### 4) Can create job posts.

## Installation

Before running this project, ensure that you have Node.js, npm, and MongoDB installed on your machine.

for Frontend 
```bash
cd ./job
npm i
npm run dev
```


for Backend
```bash
cd ./Backend
npm i
npm run dev
```

## Environment variables

create a .env file in backend root directory. and your .env should have these variables.


```bash
PORT=YOUR_PORT_NUMBER
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
NODE_ENV=production
JWT_TOKEN_SECRET=YOUR_JWT_SECRET
MAIL_APP_PASSWORD=YOUR_EMAIL_APP_PASSWORD
TWILIO_ACC_SID=YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
TWILIO_MOB_NUM=YOUR_TWILIO_MOBILE_NUMBER
```


## NOTE :- As for using twilio you should have a subscription, in free subscription the otp is sent to only registered users.So to verify the mobile number you can use "1111" for now

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)