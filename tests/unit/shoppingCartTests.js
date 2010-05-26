TestCase("Shopping cart", {

    setUp: function() {
        mockControl = new MockControl();
    },

    testShouldAddItemToList:function() {
        var shoppingCartViewMock = mockControl.createStrictMock(ShoppingCartView);
        var orderCalculatorStub = mockControl.createDynamicMock(OrderCalculator);

        var shoppingCart = new ShoppingCart(shoppingCartViewMock, orderCalculatorStub);

        var item = {description: "item", price:12};

        var orderPrice = orderCalculatorStub.expects().calculatePriceFor([item]).toReturn(item.price);
        shoppingCartViewMock.expects().modifyShoppingCartViewWithAnAdditional(item);
        shoppingCartViewMock.expects().updateOrderPrice(item.price);

        shoppingCart.add(item);

        mockControl.verify();
    },

    testShouldUpdateTotalPrice:function() {
        var shoppingCartViewStub = mockControl.createDynamicMock(ShoppingCartView);
        var orderCalculatorMock = mockControl.createStrictMock(OrderCalculator);

        var shoppingCart = new ShoppingCart(shoppingCartViewStub, orderCalculatorMock);

        var item = {description: "item", price:12};

        orderCalculatorMock.expects().calculatePriceFor([item]).toReturn(item.price);

        shoppingCart.add(item);

        mockControl.verify();

    }

});