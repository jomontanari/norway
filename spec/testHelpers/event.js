function Event(href) {
    this.currentTarget = { href: href };
    this.preventDefault = function() {}
}