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
    new Task('Relax on work', 'Do nothing 2 hours', 2),
    new Task('Programming', 'Write the backend of this application XD', 2),
  ];

  cards[0].addMoretasksId([1, 2, 3]);
  cards[1].addMoretasksId([4, 5, 6]);
  console.log(cards[0].getId());

  app.get('/api/tasks', (req, res) => {
    res.json({ data: tasks });
  });

  app.post('/api/tasks', (req, res) => {
    const { title, description, cardId } = req.body;
    const newTask = new Task(title, description, cardId);
    const currentCard = cards.find((c) => c.getId().toString() === cardId);

    if (currentCard) {
      currentCard.addTask(newTask.id);
      tasks.push(newTask);
      res.status(201).json({ id: newTask.getId() });
    } else {
      res.status(400).json({ error: 'Can`t found card' });
    }
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

  app.get('/api/cards', (req, res) => {
    res.json({ data: cards });
  });

  app.post('/api/cards', (req, res) => {
    const { title } = req.body;
    const newCard = new Card(title);
    cards.push(newCard);
    res.sendStatus(204).end();
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
