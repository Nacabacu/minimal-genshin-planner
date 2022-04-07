import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = 2000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response): Promise<Response> => res.status(200).send({ message: 'Hello World!' }));

app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
});
