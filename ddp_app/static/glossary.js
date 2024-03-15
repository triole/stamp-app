var glossary

window.addEventListener('load', function () {
  init_glossary()
  init_glossary_observer()

  $('.content').click(function (event) {
    var named_item = event.target.attributes.getNamedItem('onclick')
    if (named_item !== null) {
      if (/.*toggle_term.*/.test(named_item.value)) {
        return
      }
    }
    $('#glossary_info').css('display', 'none')
  })
})

function init_glossary_observer() {
  const target = document.querySelector('.project-questions-form')
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      var newNodes = mutation.addedNodes
      if (newNodes !== null) {
        $(newNodes).each(function () {
          var elements = $(this).find('p')
          if ($(this).length > 0) {
            if ($(this)[0].parentNode !== null) {
              if ($(this)[0].parentNode.className.includes('help-text')) {
                elements.push($(this)[0])
              }
            }
          }
          if (elements !== undefined) {
            $.each(elements, function (_, element) {
              element.innerHTML = glossary_replace(element.innerHTML)
            })
          }
        })
      }
    })
  })

  if (target !== null) {
    observer.observe(target, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    })
  }
  // observer.disconnect();
}

function init_glossary() {
  glossary_add_info_div()
  $.getJSON('/static/glossary.json')
    .done(function (gl) {
      var arr = []
      for (var key in gl) {
        if (gl.hasOwnProperty(key)) {
          arr.push([key, gl[key]])
        }
      }
      glossary = arr.sort(function (a, b) {
        return b[0].length - a[0].length
      })
    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ', ' + error
      console.error('Error getting glossary json: ', err)
    })
}

function glossary_replace(html) {
  var r = ''
  var excl = []
  if (html !== undefined) {
    r = html
    for (var idx = 0; idx < glossary.length; idx++) {
      var el = glossary[idx]
      var rx_to_replace = new RegExp('(^| )(' + el[0] + ')(\.|,| |$)', 'g')
      var rx_to_test = new RegExp('(^| |>)(' + el[0] + ')(\.|,|<| |$)', 'g')
      if (excl.includes(el[0]) === false && rx_to_test.test(html)) {
        r = r.replace(
          rx_to_replace,
          ' <a class="glossary_term" href="#" onclick="toggle_term(' + idx + ', this)">$2</a> ',
        )
        excl.push(...el[0].split(' '))
      }
    }
  }
  return r
}

function toggle_term(term, clicked_element) {
  var el = $('#glossary_info')
  if (clicked_element !== undefined) {
    var pos = get_postion(clicked_element)
    el.empty()
    el.css('left', pos[0])
    el.css('top', pos[1] + 20)
    el.append(glossary[term][1])
  }
  el.toggle()
}

function glossary_add_info_div() {
  $('body').append('<div id="glossary_info" onclick="toggle_term()"></div>')
}

function get_postion(selector) {
  if (selector !== null) {
    var off = $(selector).offset()
    return [off.left, off.top]
  }
  return null
}
