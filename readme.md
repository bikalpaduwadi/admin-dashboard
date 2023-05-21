## Getting Started

Clone the repository and set it up to run the server and client app locally.

```bash
$ git clone git@github.com:bikalpaduwadi/admin-dashboard.git <app-name>
```

**SERVER SETUP**

```bash
$ cd <application-name>/server

$ cp .env.example .env # Update MongoDB url

$ npm install

$ npm run start
```

Uncomment the seed data code in `src/index.ts`, line number `16:35` and `61:100`

Once the data is loaded in you mongo db server remove or comment out the lines

**CLIENT SETUP**

```bash
$ cd <application-name>/client

$ cp .env.local .env # Update server url

$ yarn

$ yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Browse the hosted application

Open [https://admin-dashboard-frontend-xa1h.onrender.com/dashboard](https://admin-dashboard-frontend-xa1h.onrender.com/dashboard)
