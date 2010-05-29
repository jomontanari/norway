TestCase("Order Calculator test", {

    setUp: function() {
        mockControl = new MockControl();
    },

    testShouldSumItemsPriceCorrectly:function() {
        var orderCalculator = new OrderCalculator();

        var items = [
            {description:"item#1", price:10},
            {description:"item#2", price:15}
        ];

        assertEquals(25, orderCalculator.calculatePriceFor(items));
    },

    testZeroItemsShouldReturnInZero: function() {
            var orderCalculator = new OrderCalculator();

            var items = [];

            assertEquals(0, orderCalculator.calculatePriceFor(items));
        }

    });