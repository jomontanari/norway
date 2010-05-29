function ShoppingCart(shoppingCartView, orderCalculator) {

    var items = [];

    this.add = function(item) {
        items.push(item);
        modifyShoppingCartViewWithAnAdditional(item);
    };

    function modifyShoppingCartViewWithAnAdditional(item) {
        shoppingCartView.modifyShoppingCartViewWithAnAdditional(item);
        shoppingCartView.updateOrderPrice(orderCalculator.calculatePriceFor(items));
    };
    
};

