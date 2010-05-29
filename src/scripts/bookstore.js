$(document).ready(function() {
    new ProductsPresenter(new ProductsView(), new ProductsService(), new ProductsSorter()).init();

    var cart = new ShoppingCart(new ShoppingCartView(), new OrderCalculator());
    $(".buy").live("submit", function(event) {

        var item = {description: this["description"].value,
            price: parseInt(this["price"].value) };

        cart.add(item);

        event.preventDefault();
    });
});
