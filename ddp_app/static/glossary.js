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
  if (html !== undefined) {
    r = html
    var excl = []
    for (var idx = 0; idx < glossary.length; idx++) {
      var el = glossary[idx]
      var rep = make_replacer(el[0])
      if (!already_replaced(rep.arr_raw, excl)) {
        r = r.replace(
          rep.to_replace,
          ' <a class="glossary_term" href="#" onclick="toggle_term(' + idx + ', this)">$2</a> ',
        )
        excl.push(...rep.arr_raw)
      }
    }
  }
  return r
}

function make_replacer(str) {
  var rep = {}
  rep.word_raw = str
  rep.arr_raw = str.split(' ')
  rep.arr_advanced = []
  rep.arr_raw.forEach(function (el) {
    rep.arr_advanced.push(el + '[a-z]{0,1}')
  })
  rep.join_advanced = rep.arr_advanced.join(' ')
  rep.to_replace = new RegExp('(^| )(' + rep.join_advanced + ')(\\.|,| |$)', 'g')
  rep.to_test = new RegExp('(^| |>)(' + rep.join_advanced + ')(\\.|,|<| |$)', 'g')
  return rep
}

function already_replaced(str, excl) {
  var b = false
  excl.forEach(function (el) {
    if (el.length > 3 && el === str) {
      b = true
      return
    }
  })
  return b
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
