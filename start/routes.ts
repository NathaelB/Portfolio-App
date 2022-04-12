/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('pages/index')
}).as('home')

Route.get('/about-me', async ({view}) => {
  return view.render('pages/about')
}).as('about')

Route.get('/achievements', 'AchievementsController.get').as('achievements')
Route.get('/achievements/:id', 'AchievementsController.visit').as('achievement')
Route.get('/blogs', 'BlogsController.get').as('blogs').as('blogs')

/* Route.group(() => {
  Route.get('/', 'ContactsController.index').as('contact')
  Route.post('/', 'ContactsController.store')
}).prefix('contact') */

Route.group(() => {
  Route.get('/login', 'AuthController.login').as('login')
  Route.get('/register', 'AuthController.register').as('register')
  Route.post('/login', 'AuthController.loginWeb')
  Route.post('/register', 'AuthController.registerWeb')
  Route.post('/logout', 'AuthController.logoutWeb')
}).prefix('authentication')

Route.group(() => {
  Route.get('/', 'ManagersController.show')

  Route.group(() => {
    Route.get('/', 'UsersController.index').as('manager.users')
    Route.get('/new', 'UsersController.create').as('manager.users.create')
    Route.post('/new', 'UsersController.store')
    Route.get('/:id', 'UsersController.show').as('manager.user')
  }).prefix('users')

  Route.group(() => {
    Route.get('/', 'AchievementsController.index').as('manager.achievements')
    Route.get('/new', 'AchievementsController.create').as('manager.achievements.create')
    Route.post('/new', 'AchievementsController.store')
    Route.get('/:id', 'AchievementsController.show').as('manager.achievement')
    Route.delete('/:id', 'AchievementsController.destroy')
  }).prefix('achievements')


}).prefix('manager')
