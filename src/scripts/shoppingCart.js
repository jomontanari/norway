function ShoppingCart(shoppingCartView, orderCalculator) {

    var items = new Array();

    this.add = function(item) {
        items.push(item);
        modifyShoppingCartViewWithAnAdditional(item);
    };


    function modifyShoppingCartViewWithAnAdditional(item) {
        shoppingCartView.modifyShoppingCartViewWithAnAdditional(item);
        shoppingCartView.updateOrderPrice(orderCalculator.calculatePriceFor(items));
    };
    
};

function ShoppingCartView() {

    this.modifyShoppingCartViewWithAnAdditional = function(item) {
        Browser.Dom.append(".itemList ul", "<li>");
        Browser.Dom.append(".itemList ul li:last", item.description + " - " + item.price);
        Browser.Dom.append(".itemList ul", "</li>");
    };

    this.updateOrderPrice = function(price) {
        Browser.Dom.text(".totalPrice", "Total price: " + price);
    }
};

function OrderCalculator() {

    this.calculatePriceFor = function(items) {
        var price = 0;
        $.each(items, function(index, value) {
            price = price + value.price;
        });
        return price;
    }
}
