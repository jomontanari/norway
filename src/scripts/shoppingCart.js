function ShoppingCart(shoppingCartView) {

    var items = new Array();

    this.add = function(item) {
        items.push(item);
        modifyShoppingCartViewWithAnAdditional(item);
    };


    function modifyShoppingCartViewWithAnAdditional(item) {
        shoppingCartView.modifyShoppingCartViewWithAnAdditional(item);
        shoppingCartView.updateOrderPrice(orderPrice());
    };

    function orderPrice() {
        var price = 0;
        $.each(items, function(index, value) {
            price = price + value.price;
        });
        return price;
    };
}

function ShoppingCartView() {

    this.modifyShoppingCartViewWithAnAdditional = function(item) {
        Browser.Dom.append(".itemList ul", "<li>");
        Browser.Dom.append(".itemList ul li:last",item.description + " - " + item.price);
        Browser.Dom.append(".itemList ul", "</li>");
    };

    this.updateOrderPrice = function(price) {
        Browser.Dom.text(".totalPrice", "Total price: " + price);
    }
}
