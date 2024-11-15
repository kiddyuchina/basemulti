import { handleError } from "./error";
import { Hono } from 'hono';

const app = new Hono().basePath('/api')

app.onError(handleError);