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

Route.get('/notion', 'BlogsController.show')
Route.get('/about-me', async ({view}) => {
  return view.render('pages/about')
}).as('about')

Route.get('/achievements', 'AchievementsController.get').as('achievements')
Route.get('/achievements/:id', 'AchievementsController.visit').as('achievement')
Route.get('/blogs', 'BlogsController.get').as('blogs').as('blogs')
Route.get('/contact', async ({view}) => {
  return view.render('pages/index')
}).as('contact')
Route.group(() => {
  Route.get('/login', 'AuthController.login').as('login')
  Route.post('/login', 'AuthController.loginWeb')
  Route.post('/logout', 'AuthController.logoutWeb')
}).prefix('authentication')





Route.group(() => {
  Route.get('/', 'ManagersController.show')
  Route.get('/users', 'UsersController.index').as('manager.user')

  Route.get('/achievements', 'AchievementsController.index').as('manager.achievements')
  Route.get('/achievements/new', 'AchievementsController.create').as('manager.achievements.create')
  Route.post('/achievements/new', 'AchievementsController.store')
  Route.get('/achievements/:id', 'AchievementsController.show').as('manager.achievement')
  Route.delete('/achievements/:id', 'AchievementsController.destroy')

}).prefix('manager')

Route.get('/test', async ({view, response, bouncer}) => {
  if (await bouncer.allows('view')) {
    return view.render('pages/test')
  }
  return response.redirect().toRoute('home')
})
