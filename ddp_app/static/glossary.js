function init_glossary() {
    glossary_add_info_div();
    $.getJSON("/static/glossary.json")
        .done(function(gl) {
            glossary = gl;
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Error getting glossary json: ", err);
        });
}

function glossary_replace(html) {
    if (html !== undefined) {
        var r = html;
        Object.keys(glossary).forEach(function(term) {
            var func_call = 'glossary_display_term(\'' + term + '\', this)';
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

function glossary_display_term(term, clicked_element) {
    var pos = get_postion(clicked_element);
    var el = $('#glossary_info');
    el.empty();
    el.css('left', pos[0]);
    el.css('top', pos[1] + 20);
    el.append(glossary[term]);
    el.toggle();
}

function glossary_add_info_div() {
    $('body').append('<div id="glossary_info"></div>')
}
