import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import personService from './services/person';
import customerService from './services/customer';
import projectService from './services/project';
import officeService from './services/office';
import R from 'ramda';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ success: 'API server works! :-)' });
});

app.get('/person', async (req, res, next) => {
  const persons = await personService.all();
  res.json(persons);
});

app.post('/person', async (req, res, next) => {
  if (!Object.values(req.body).length) {
    res.status(400).send('no empty persons will be created');
    return;
  }
  const person = await personService.create(req.body);
  res.json(person);
});

app.get('/person/:id', async (req, res, next) => {
  const person = await personService.findById(req.params.id);

  if (!person) {
    res.status(404).send('person not found');
    return;
  }

  res.json(person);
});

app.put('/person/:id', async (req, res, next) => {
  const updatedPerson = await personService.update(req.params.id, req.body);

  if (!updatedPerson) {
    res.status(404).send(`person not found with ID: ${req.param.id}`);
    return;
  }

  res.json(updatedPerson);
});

app.delete('/person/:id', async (req, res, next) => {
  const person = await personService.findById(req.params.id);
  if (!person) {
    res.status(404).send('person not found');
  }

  await personService.remove(req.params.id);
  res.json(person);
});

const resources = {
  customer: customerService,
  project: projectService,
  office: officeService
};

R.forEachObjIndexed((service, key) => {
  app.get(`/${key}`, async (req, res, next) => {
    const objects = await service.all();
    res.json(objects);
  });

  app.get(`/${key}/:id`, async (req, res, next) => {
    const object = await service.findById(req.params.id);

    if (!object) {
      res.status(404).send(`${key} not found`);
    }
    res.json(object);
  });
}, resources);

app.listen(process.env.PORT, () => {
  console.log(`Address: http://localhost:${process.env.PORT}`);
});
