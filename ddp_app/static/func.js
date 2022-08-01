// observer and init
$(document).ready(function() {
    if (document.querySelector('.project-questions-form') !== null) {
        var glossary;
        init_observer();
        init_glossary();
        init_mandatory_fields();
    }
});

function init_observer() {
    const target = document.querySelector('.project-questions-form');
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            var newNodes = mutation.addedNodes; // DOM NodeList
            if (newNodes !== null) {
                $(newNodes).each(function() {
                    // format help text
                    var elements = $(this).find('.form-label, .help-text>p');
                    if ($(this).length > 0) {
                        if ($(this)[0].parentNode !== null) {
                            if ($(this)[0].parentNode.className.includes('help-text')) {
                                elements.push($(this)[0]);
                            }
                        }
                    }
                    if (elements !== undefined) {
                        $.each(elements, function(_, element) {
                            // add glossary terms
                            element.innerHTML = glossary_replace(element.innerHTML);
                            // mark mandatory fields
                            element.innerHTML = mark_as_mandatory(element.innerHTML)
                        });
                    }
                });
            }
        });
    });

    observer.observe(target, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
    });

    // observer.disconnect();
}


// mandatory fields
function init_mandatory_fields() {
    $('body').prepend(
        '<div id="mandatory_box"></div>'
    );
}

function show_mandatory_box(clicked_element) {
    var pos = get_postion(clicked_element);
    el = $('#mandatory_box');
    el.empty();
    el.css('left', pos[0]);
    el.css('top', pos[1] + 20);
    el.append('Dies ist ein Pflichtfeld');
    el.toggle();
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
        '</p>'
    );
}

// utils
function get_postion(selector) {
    var off = $(selector).offset();
    return [off.left, off.top]
}
