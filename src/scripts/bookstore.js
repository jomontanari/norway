function ShoppingCart() {

    var items = new Array();

    this.add = function(item) {
        items.push(item);
    }

    this.orderPrice = function() {
        var price = 0;
        $.each(items, function(index, value) {
            price = price + value.price;
        });
        return price;
    }
}

$(document).ready(function() {

    var cart = new ShoppingCart();
    $(".buy").live("submit", function(event) {

        var item = {description: $(".buy [name='title']").val(),
                    price: $(".buy [name='price']").val()};

        cart.add(item);

        $(".itemList").append(item.description)
                .append(" - ")
                .append(item.price);

        $(".totalPrice").append("Total price:" + cart.orderPrice());
        
        event.preventDefault();
    });
});


