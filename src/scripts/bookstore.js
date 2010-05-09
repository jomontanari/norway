function ShoppingCart() {

    var items = new Array();

    this.add = function(item) {
        items.push(item);
        modifyView(item);
    };


    function modifyView(item) {
        $(".itemList ul").append("<li>");
        $(".itemList ul li:last")
                .append(item.description)
                .append(" - ")
                .append(item.price);
        $(".itemList ul").append("</li>");

        $(".totalPrice").text("Total price: " + orderPrice());
    }

    orderPrice = function() {
        var price = 0;
        $.each(items, function(index, value) {
            price = price + value.price;
        });
        return price;
    };
}

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
