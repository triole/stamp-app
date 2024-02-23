var glossary

window.addEventListener('load', function () {
  init_glossary()
  init_glossary_observer()
})

function init_glossary_observer() {
  const target = document.querySelector('.project-questions-form')
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      var newNodes = mutation.addedNodes
      if (newNodes !== null) {
        $(newNodes).each(function () {
          // format help text
          var elements = $(this).find('.form-label>p, .help-text>p')
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

  observer.observe(target, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  })

  // observer.disconnect();
}

function init_glossary() {
  glossary_add_info_div()
  $.getJSON('/static/glossary.json')
    .done(function (gl) {
      glossary = gl
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
    Object.keys(glossary).forEach(function (term) {
      var func_call = "toggle_term('" + term + "', this)"
      if (r.includes(term) === true && html.includes(func_call) === false) {
        r = rxreplace(
          r,
          ' ' + term + ' ',
          ' <a href="#" onclick="' + func_call + '">' + term + '</a> ',
        )
      }
    })
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
    el.append(glossary[term])
  }
  el.toggle()
}

function glossary_add_info_div() {
  $('body').append('<div id="glossary_info" onclick="toggle_term()"></div>')
}

function get_postion(selector) {
  var off = $(selector).offset()
  return [off.left, off.top]
}

function rxreplace(str, rx, replacer) {
  var reg = new RegExp(rx, 'g')
  var r = str.replace(reg, replacer)
  return r
}
