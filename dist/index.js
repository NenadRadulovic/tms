import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}
// app.get('/test', (req,res,next) => {
//   res.send('Hello')
// })
app.use('/', routes());
export default app;
//# sourceMappingURL=index.js.map