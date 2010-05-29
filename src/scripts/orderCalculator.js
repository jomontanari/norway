function OrderCalculator() {

    this.calculatePriceFor = function(items) {
        var price = 0;
        $.each(items, function(index, value) {
            price = price + value.price;
        });
        return price;
    }
}
