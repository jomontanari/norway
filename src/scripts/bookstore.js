$(document).ready(function() {
    new ProductsPresenter(new ProductsView(), new ProductsService()).init();

    var cart = new ShoppingCart();
    $(".buy").live("submit", function(event) {

        var item = {description: this["description"].value,
            price: parseInt(this["price"].value) };

        cart.add(item);

        event.preventDefault();
    });
});
