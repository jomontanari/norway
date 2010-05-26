TestCase("Shopping cart", {

    setUp: function() {
        mockControl = new MockControl();
    },

    testShouldAddItemToList:function() {
        var shoppingCartViewMock = mockControl.createDynamicMock(ShoppingCartView);
        var orderCalculatorStub = mockControl.createDynamicMock(OrderCalculator);

        var shoppingCart = new ShoppingCart(shoppingCartViewMock, orderCalculatorStub);

        var item = {description: "item", price:12};

        shoppingCartViewMock.expects().modifyShoppingCartViewWithAnAdditional(item);

        shoppingCart.add(item);

        mockControl.verify();
    },

    testShouldUpdateTotalPrice:function() {
        var shoppingCartViewMock = mockControl.createDynamicMock(ShoppingCartView);
        var orderCalculatorStub = mockControl.createStrictMock(OrderCalculator);

        var shoppingCart = new ShoppingCart(shoppingCartViewMock, orderCalculatorStub);

        var item = {description: "item", price:12};

        orderCalculatorStub.expects().calculatePriceFor([item]).toReturn(item.price);
        shoppingCartViewMock.expects().updateOrderPrice(item.price);

        shoppingCart.add(item);

        mockControl.verify();

    }

});