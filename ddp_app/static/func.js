$(document).ready(function() {
    init_requirements();
});

function init_requirements() {
    const target = document.querySelector('.content');
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            display_requirements();
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

function display_requirements() {
    el = $('.ddp_requirements_display');
    el_text = el.text().trim();
    h2_text = $('.project-questions-form h2').text().trim();
    console.log(el_text + ' === ' + h2_text);
    if (h2_text.endsWith(el_text)) {
        $('.ddp_requirements_text').css('display', 'block')
    } else {
        $('.ddp_requirements_text').css('display', 'none')
    }
}
