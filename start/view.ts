import View from '@ioc:Adonis/Core/View'


View.global('number', (val: string) => {
  return +val
})
