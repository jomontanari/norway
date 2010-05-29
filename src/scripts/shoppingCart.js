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


function ShoppingCartView() {

    this.modifyShoppingCartViewWithAnAdditional = function(item) {
        Browser.Dom.append(".itemList ul", "<li>");
        Browser.Dom.append(".itemList ul li:last",item.description + " - " + item.price);
        Browser.Dom.append(".totalPrice", "Total price: " + orderPrice());
        //a good candidate for browser.display ?
    };

    this.updateOrderPrice = function(price) {
        Browser.Dom.text(".totalPrice", "Total price: " + price);
    };
}


function ShoppingCart(shoppingCartView) {

    var view = shoppingCartView;
    var items = new Array();

    this.add = function(item) {
        items.push(item);
        modifyShoppingCartViewWithAnAdditional(item);
    };


    function modifyShoppingCartViewWithAnAdditional(item) {
        view.modifyShoppingCartViewWithAnAdditional(item);
        view.updateOrderPrice(orderPrice());
    }

    this.orderPrice = function() {
        var price = 0;
        $.each(items, function(index, value) {
            price = price + value.price;
        });
        return price;
    };
}