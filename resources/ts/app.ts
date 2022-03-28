import Alpine from 'alpinejs'
import '../css/app.css'
import './navbar/OpenDropdownMenu.ts'



Alpine.data('dropdown', () => ({
  open: false,

  toggle() {
    this.open = !this.open
  }
}))

Alpine.start()
