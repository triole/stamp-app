var glossary

$(document).ready(function () {
  if (document.querySelector('.project-questions-form') !== null) {
    init_observer()
    init_glossary()
    init_mandatory_fields()
  }
})

function init_observer() {
  const target = document.querySelector('.project-questions-form')
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      var newNodes = mutation.addedNodes // DOM NodeList
      if (newNodes !== null) {
        $(newNodes).each(function () {
          // format help text
          var elements = $(this).find('.form-label, .help-text>p')
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
              element.innerHTML = pdf_links_replace(element.innerHTML)
              element.innerHTML = mark_as_mandatory(element.innerHTML)
              trigger_legal_guidance_renderer()
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

// glossary
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
  if (html !== undefined) {
    var r = html
    Object.keys(glossary).forEach(function (term) {
      var func_call = "glossary_display_term('" + term + "', this)"
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

function glossary_display_term(term, clicked_element) {
  var pos = get_postion(clicked_element)
  var el = $('#glossary_info')
  el.empty()
  el.css('left', pos[0])
  el.css('top', pos[1] + 20)
  el.append(glossary[term])
  el.toggle()
}

function glossary_add_info_div() {
  $('body').append('<div id="glossary_info"></div>')
}

// pdf links
function pdf_links_replace(html) {
  var empfurl = 'https://www.forschungsdaten-bildung.de/files/Stamp_Empfehlungen.pdf'
  var fallurl = 'https://www.forschungsdaten-bildung.de/files/Stamp_Fallbeispiele.pdf'
  var suffix = '\(([IVX]+\.[A-Za-z0-9\.]+)\)'
  var r = html
  r = rxreplace(
    r,
    '(Fallbeispiel.*?)' + suffix,
    '$1<a target="_blank" href="' + fallurl + '">$2</a>',
  )
  r = rxreplace(
    r,
    '(Empfehlung.*?)' + suffix,
    '$1<a target="_blank" href="' + empfurl + '">$2</a>',
  )
  return r
}

// legal guidance
function trigger_legal_guidance_renderer() {
  legal_guidance_replace(
    'II.Aa',
    'Datenschutz',
    'Zu den Grundlagen des Datenschutzes<br>siehe rechtliche Vorgaben zum Datenschutz',
    1,
  )
  legal_guidance_replace(
    'II.Ba',
    'Informierte Einwilligung',
    'Zu den rechtlichen Grundlagen der informierten Einwilligung siehe rechtliche Vorgaben zum Datenschutz',
    2,
  )
  legal_guidance_replace(
    'II.Ca',
    'Gesichertes Verarbeiten',
    'Zu den rechtlichen Grundlagen im Kontext von Schutzmaßnahmen und Schutzverletzung siehe rechtliche Vorgaben zum Datenschutz',
    3,
  )
  legal_guidance_replace(
    'II.De',
    'Verarbeitung durch Auftragsverarbeitende',
    'Zu den rechtlichen Grundlagen bei der Auftragsverarbeitung personenbezogener Daten siehe rechtliche Vorgaben zum Datenschutz',
    4,
  )
  legal_guidance_replace(
    'III.Aa',
    'Urheberrecht',
    'Zu den Grundlagen des Urheberrechts siehe rechtliche Vorgaben zum Urheberrecht',
    5,
  )
  legal_guidance_replace(
    'III.Ba',
    'Urheberrechte an den (projekteigenen) Daten und Begleitmaterialien',
    'Zu Urheberrechten an den (projekteigenen) Daten und Begleitmaterialien siehe rechtliche Vorgaben zum Urheberrecht',
    6,
  )
  legal_guidance_replace(
    'III.Ca',
    'Urheberrechte Dritter',
    'Zum Umgang mit Urheberrechten Dritter siehe rechtliche Vorgaben zum Urheberrecht',
    7,
  )
}

function legal_guidance_replace(no, name, prefix, section) {
  var noname = no + ' ' + name
  var sel = legal_guidance_replace_add_h3(noname)
  //   var sel = '.project-questions-form h2.ng-binding:contains(' + noname + ')'
  var el = $(sel)
  var html = el.html()
  if (html !== undefined && !html.includes(prefix)) {
    el.append(
      prefix + ': ' +
        add_pdf_link('Stamp_RechtlicheVorgaben.pdf', section) +
        '[' + no + '] ' + name +
        '</a>.</h3>',
    )
  }
}

function legal_guidance_replace_add_h3(noname) {
  var sel = '.project-questions-form h2.ng-binding:contains(' + noname + ')'
  var el = $(sel)
  var html = el.html()
  if (html !== undefined && !html.includes('<h3>')) {
    el.append('<h3></h3>')
  }
  var rel = $(sel + ' h3')
  rel.empty()
  return rel
}

// Stamp_RechtlicheVorgaben.pdf
function add_pdf_link(filename, section) {
  if (section !== undefined) {
    filename += '#subsection*.' + section
  }
  var l = '<a target=_blank href="https://www.forschungsdaten-bildung.de/files/' + filename + '">'
  return l
}

// mandatory fields
function init_mandatory_fields() {
  $('body').prepend(
    '<div id="mandatory_box"></div>',
  )
}

function show_mandatory_box(clicked_element) {
  var pos = get_postion(clicked_element)
  var el = $('#mandatory_box')
  el.empty()
  el.css('left', pos[0])
  el.css('top', pos[1] + 20)
  el.append('Dies ist ein Pflichtfeld')
  el.toggle()
}

function mark_as_mandatory(html) {
  if (typeof html !== 'string') {
    return ''
  }
  return html.replace(
    /(^<p>!+)(.*?)(<\/p>)/,
    '<p>$2' +
      '<span onclick="show_mandatory_box(this)" class="mandatory_field">' +
      '<i class="fa fa-exclamation-circle small" aria-hidden="true"></span>' +
      '</p>',
  )
}

// utils
function get_postion(selector) {
  var off = $(selector).offset()
  return [off.left, off.top]
}

function to_markdown(str) {
  var converter = new showdown.Converter()
  return converter.makeHtml(str)
}

function rxreplace(str, rx, replacer) {
  var reg = new RegExp(rx, 'g')
  var r = str.replace(reg, replacer)
  return r
}
