import express from 'express';
import connection from './db';
import userRouter from './routers/user.router';
import scheduleRouter from './routers/schedule.router';
import bookingRouter from './routers/booking.router';
import adminRouter from './routers/admin.router'
import cors from 'cors';
import {config} from './config/config';

const app = express();


app.use(cors({ origin: '*' }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/schedule", scheduleRouter);
app.use("/booking", bookingRouter);
app.use("/admin", adminRouter);


app.listen(config.server.port, () => {
  console.log(`Server is running on porttt ${config.server.port} on herokuuu`);
});

app.get('/', (req, res) => {
  res.send('Hello World');
});
