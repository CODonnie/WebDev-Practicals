import express from 'express';
import { createData, readData } from '../controllers/dataController.js'

const dataRoutes = express.Router();

dataRoutes.post('/data', createData);
dataRoutes.get('/data', readData);

export default dataRoutes;

