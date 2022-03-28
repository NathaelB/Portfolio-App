import Alpine from 'alpinejs'
import '../css/app.css'



Alpine.data('dropdown', () => ({
  open: false,

  toggle() {
    this.open = !this.open
  }
}))

Alpine.start()
