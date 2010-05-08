function ShoppingCart() {

    var items = new Array();

    this.add = function(item) {
        items.push(item);
    };

    this.orderPrice = function() {
        var price = 0;
        $.each(items, function(index, value) {
            price = price + value.price;
        });
        return price;
    }
}

$(document).ready(function() {
    new ProductsPresenter(new ProductsView(), new ProductsService()).init();
    
    var cart = new ShoppingCart();
    
    $(".buy").live("submit", function(event) {

        var item = {description: $(".buy [name='description']").val(),
                    price: parseInt($(".buy [name='price']").val()) };

        cart.add(item);

        $(".itemList ul").append("<li>");
        $(".itemList ul li:last")
                .append(item.description)
                .append(" - ")
                .append(item.price);
        $(".itemList ul").append("</li>");

        $(".totalPrice").text("Total price: " + cart.orderPrice());
        
        event.preventDefault();
    });
});
