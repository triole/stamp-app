$(document).ready(function () {
  var current_path = window.location.pathname
  var target_el = $('a[href="' + current_path + 'answers/"]')
  var views_el = $('a[href^="' + current_path + 'views/"]')

  console.log(target_el)
  console.log(views_el)
})
