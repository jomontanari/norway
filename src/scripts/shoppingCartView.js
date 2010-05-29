function ShoppingCartView() {

    this.modifyShoppingCartViewWithAnAdditional = function(item) {
        Browser.Dom.append(".itemList ul", "<li>");
        Browser.Dom.append(".itemList ul li:last", item.description + " - " + item.price);
        Browser.Dom.append(".itemList ul", "</li>");
    };

    this.updateOrderPrice = function(price) {
        Browser.Dom.text(".totalPrice", "Total price: " + price);
    };
}
