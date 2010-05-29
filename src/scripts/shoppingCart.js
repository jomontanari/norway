function ShoppingCart() {

    var items = new Array();

    this.add = function(item) {
        items.push(item);
        modifyShoppingCartViewWithAnAdditional(item);
    };


    function modifyShoppingCartViewWithAnAdditional(item) {
        $(".itemList ul").append("<li>");
        $(".itemList ul li:last").append(item.description).append(" - ").append(item.price);
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