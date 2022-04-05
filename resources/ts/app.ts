import Alpine from 'alpinejs'
import '../css/app.css'
/*import axios from 'axios'
const token = 'EAAEQZCAHZANAgBABRZA3iZB1ok11ZCDZAuk4swG7o0xZCnodk9n5MxUqJcNOvWL6l7WZASAZA4e80mjpM2UrM9yExfpxNJ2cFPhRezQr8A93TuXZB8D4NQ9ypiyUywEBovAvyCjqEmMzK9w9Wlv6o19gIBELKJ4xmyJbg5qVhjPVoQsviprMmow4x9mZCJXrn4UVMKGUAYJPaKJkAWLI9hb51ue'
const request =  axios.get(`https://graph.facebook.com/v13.0/17841403861377377?fields=id,followers_count,follows_count,name,username,biography&access_token=${token}`)
console.log(request)*/

Alpine.data('achievement', () => ({
  parser(title: string) {
    const data = title.split(' ')
    return data.join('-')
  }
}))
Alpine.data('dropdown', () => ({
  open: false,

  toggle() {
    this.open = !this.open
  }
}))

Alpine.start()
