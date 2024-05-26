// @ts-check

import Express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
// import path from 'path';
// import methodOverride from 'method-override';

import Card from './entities/Card.js';
import Task from './entities/Task.js';

export default () => {
  const app = Express();
  // app.use(Express.static(path.join(__dirname, 'public')));
  app.use(morgan('combined'));
  // app.set('view engine', 'pug');
  // app.use('/assets', Express.static((process.env.NODE_PATH?? '')?.split(':')[0]?? ''));
  // app.use(methodOverride('_method'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend application's URL
    optionsSuccessStatus: 200,
  }));

  let cards = [
    new Card('Home'),
    new Card('Work'),
  ];
  let tasks = [
    new Task('Buy products', 'Buy bread, milk, eggs and butter', 1),
    new Task('Clean the house', 'Vacuum and wash the clothes', 1),
    new Task('Relax', 'Relax and watch a movie', 1),
    new Task('Report', 'Report to the accounting department', 2),
    new Task('Relax on work', 'Do nothing 2 hours', 2, true),
    new Task('Programming', 'Write the backend of this application XD', 2, true),
  ];

  let settings = { lng: null, bgThemeEl: null };

  cards[0].addMoretasksId([1, 2, 3]);
  cards[1].addMoretasksId([4, 5, 6]);

  app.get('/api/settings', (req, res) => {
    res.json({ settings });
  });

  app.patch('/api/settings', (req, res) => {
    const { lng, bgThemeEl } = req.body;
    if (lng === null || lng === undefined) {
      settings = { ...settings, bgThemeEl };
      res.sendStatus(204).end();
    }
    if (bgThemeEl === null || bgThemeEl === undefined) {
      settings = {...settings, lng };
      res.sendStatus(204).end();
    }
    if (lng === null || lng === undefined && bgThemeEl === null || bgThemeEl === undefined) {
      res.status(400).json({ error: 'Data not correct' });
    }
    settings = { lng, bgThemeEl };
    res.sendStatus(204).end();
  });

  app.get('/api/tasks', (req, res) => {
    res.json({ items: tasks });
  });

  app.post('/api/tasks', (req, res) => {
    const { title, description, cardId } = req.body;
    const newTask = new Task(title, description, cardId);
    const currentCard = cards.find((c) => c.getId().toString() === String(cardId));

    if (currentCard) {
      currentCard.addTask(newTask.id);
      tasks.push(newTask);
      res.status(201).json({ id: newTask.getId() });
    } else {
      res.status(400).json({ error: 'Can`t found card' });
    }
  });

  app.delete('/api/tasks/complited', (req, res) => {
    const complitedTasks = tasks.filter((t) => t.getIsComplited());
    const ids = complitedTasks.map((t) => {
      const id = t.getId();
      return String(id);
    });
    const newTasks = tasks.filter((t) => !ids.includes(t.id.toString()));
    tasks = newTasks;
    res.sendStatus(204).end();
  });

  app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const oldTask = tasks.find((t) => t.id.toString() === id);
    const newTasks = tasks.filter((t) => t.id.toString() !== id);
    const currentCard = cards.find((c) => c.getId().toString() === oldTask?.getCardId().toString());
    currentCard?.removeTask(oldTask?.getId());
    tasks = newTasks;
    res.sendStatus(204).end();
  });

  app.patch('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const currTask = tasks.find((t) => t.id.toString() === String(id));
  
    if (currTask) {
      currTask.changeComplit();
      res.sendStatus(204).end();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  });

  app.get('/api/cards', (req, res) => {
    res.json({ items: cards });
  });

  app.post('/api/cards', (req, res) => {
    const { title } = req.body;
    const newCard = new Card(title);
    cards.push(newCard);
    res.status(201).json({ id: newCard.getId() });
  });

  app.delete('/api/cards/:id', (req, res) => {
    const { id } = req.params;
    const oldCard = cards.find((c) => c.id.toString() === id);
    const taskIdsArr = oldCard?.getTasksId();
    const newTasks = tasks.filter((t) => !taskIdsArr?.includes(t.id));
    const newCards = cards.filter((t) => t.id.toString() !== id);
    tasks = newTasks;
    cards = newCards;
    res.sendStatus(204).end();
  });



  // app.get('/posts/:id', (req, res) => {
  //   const post = posts.find((p) => p.id.toString() === req.params.id);
  //   res.render('posts/show', { post });
  // });

  // app.post('/posts', (req, res) => {
  //   const { title, body } = req.body;

  //   const errors = {};
  //   if (!title) {
  //     errors.title = "Title can't be blank";
  //   }

  //   if (!body) {
  //     errors.body = "Body can't be blank";
  //   }

  //   if (Object.keys(errors).length === 0) {
  //     const post = new Post(title, body);
  //     posts.push(post);
  //     res.redirect(`/posts/${post.id}`);
  //     return;
  //   }

  //   res.status(422);
  //   res.render('posts/new', { form: req.body, errors });
  // });

  // app.get('/posts/:id/edit', (req, res) => {
  //   const post = posts.find((p) => p.id.toString() === req.params.id);
  //   res.render('posts/edit', { post, form: post, errors: {} });
  // });

  // app.delete('/posts/:id', (req, res) => {
  //   posts = posts.filter((post) => post.id.toString() !== req.params.id);
  //   res.redirect('posts');
  // });

  return app;
};
