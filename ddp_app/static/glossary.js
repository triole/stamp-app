$(document).ready(function() {
    var glossary;
    observe();
    init_glossary();
});

function observe() {
    const target = document.querySelector('.project-questions-form');
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            var newNodes = mutation.addedNodes; // DOM NodeList
            if (newNodes !== null) {
                $(newNodes).each(function() {
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
                            element.innerHTML = replace(element.innerHTML);
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

function replace(html) {
    if (html !== undefined) {
        var r = html;
        Object.keys(glossary).forEach(function(term) {
            var func_call = 'display_term(\'' + term + '\', this)';
            if (r.includes(term) === true && html.includes(func_call) === false) {
                reg = new RegExp(' ' + term + ' ', 'g');
                r = r.replace(
                    reg,
                    ' <a href="#">' +
                    '<span onclick="' + func_call + '" class="glossary">' +
                    term + '</span></a> '
                );
            }
        });
    }
    return r;
}

function init_glossary() {
    add_info_div();
    $.getJSON("/static/glossary.json")
        .done(function(gl) {
            glossary = gl;
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Error getting glossary json: ", err);
        });
}

function display_term(term, clicked_element) {
    var pos = get_postion(clicked_element);
    el = $('#glossary_info');
    el.empty();
    el.css('left', pos[0]);
    el.css('top', pos[1] + 20);
    el.append(glossary[term]);
    el.toggle();
}

function get_postion(selector) {
    var off = $(selector).offset();
    return [off.left, off.top]
}

function add_info_div() {
    $('body').append('<div id="glossary_info"></div>')
}
