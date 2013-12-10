
function resizeFrame() {
  $('#inappbrowser-frame').outerHeight($(window).outerHeight() - $('#suAppHeader').outerHeight());
}

function loadPage(url) {
  $('#inappbrowser-frame').attr('src', url);
}

function setTitle(title) {
  updateTitle(title)
}

function updateTitle(title) {
  $('[data-role=header] h1').text(title);
}

$(resizeFrame);