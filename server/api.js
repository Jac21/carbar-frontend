import express from 'express';
import {
  addSession,
  getTasks,
  getTask
} from './data';
import {
  temporaryUsername,
  temporaryPassword
} from './env';
import {
  AppRoutes
} from './src/routes';

const router = express.Router();

router.get(AppRoutes[0].path, AppRoutes[0].action);
router.get(AppRoutes[1].path, AppRoutes[1].action);
router.post(AppRoutes[2].path, AppRoutes[2].action);
router.get(AppRoutes[3].path, AppRoutes[3].action);

router.post('/sessions', (req, res) => {
  const {
    email,
    password
  } = req.body;
  if (!email || !password || email === 'error' || email !==
    temporaryUsername || password !==
    temporaryPassword) {
    res.statusMessage = 'Invalid email or password';
    res.status(401).end();
  } else {
    const name = email.split('@')[0].replace(/\.|_/, ' '); // simulated
    const now = new Date();
    const token = `token-${now.getTime()}`; // simulated
    const session = {
      email,
      name,
      token
    };
    addSession(token, session);
    res.json(session);
  }
});

router.get('/task', (req, res) => {
  getTasks(req.query).then(tasks => res.json(tasks));
});

router.get('/task/:id', (req, res) => {
  getTask(req.params.id).then((result) => {
    if (!result.task) {
      res.status(404).end();
    } else {
      res.json(result);
    }
  });
});

router.delete('/sessions/*', (req, res) => {
  res.json(undefined);
});

module.exports = router;
