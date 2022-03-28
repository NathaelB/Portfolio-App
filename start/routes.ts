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
})

Route.group(() => {
  Route.get('/login', 'AuthController.login').as('login')
  Route.post('/login', 'AuthController.loginWeb')
  Route.post('/logout', 'AuthController.logoutWeb')
}).prefix('authentication')





Route.group(() => {
  Route.resource('users', 'UsersController').apiOnly().middleware({})
}).prefix('manager')

Route.get('/test', async ({view, response, bouncer}) => {
  if (await bouncer.allows('view')) {
    return view.render('pages/test')
  }
  return response.redirect().toRoute('home')
})
