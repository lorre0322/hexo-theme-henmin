var url = window.location.pathname
console.log(url)
var items = $('.menu-item-link')
items.each(function (index, element) {
    console.log($(this).attr("href"))
    if ($(this).attr("href") == url) {
        $(this).css('color', '#607d8b')
    } else {
        $(this).css('color', '#333')
    }
});