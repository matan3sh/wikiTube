'use-strict'

function getClass() {
    var classes = ['primary', 'light', 'dark', 'danger', 'success']
    return classes[Math.floor(Math.random() * classes.length)]
}