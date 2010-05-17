TestCase("Products Sorter", {
    setUp : function() {
        products = [
                    {
                        imageUrl : "http://hostname/images/image2.jpg",
                        price: 5,
                        name: "Book 2"
                    },
                    {
                        imageUrl : "http://hostname/images/image1.jpg",
                        price: 8,
                        name: "Book 1"
                    },
                    {
                        imageUrl : "http://hostname/images/image3.jpg",
                        price: 1,
                        name: "Book 3"
                    },
                    {
                        imageUrl : "http://hostname/images/image3.jpg",
                        price: 5,
                        name: "Book 4"
                    }
                   ];
    },

    test_should_throw_an_error_if_an_unknow_sort_type_is_passed_in : function() {
        var productsSorter = new ProductsSorter();

        try {
            productsSorter.sort(products, "999");;

            fail("An error should have been thrown");
        }catch(e) {
            assertTrue(true);            
        }
    },

    test_should_sort_products_by_price_ascending : function() {
        var productsSorter = new ProductsSorter();
        var result = productsSorter.sort(products, "1");

        assertEquals(4, result.length);
        assertEquals(1, result[0].price);
        assertEquals(5, result[1].price);
        assertEquals(5, result[2].price);
        assertEquals(8, result[3].price);
    },

    test_should_sort_products_by_price_descending : function() {
        var productsSorter = new ProductsSorter();
        var result = productsSorter.sort(products, "2");

        assertEquals(4, result.length);
        assertEquals(8, result[0].price);
        assertEquals(5, result[1].price);
        assertEquals(5, result[2].price);
        assertEquals(1, result[3].price);
    },

    test_should_sort_products_by_name : function() {
        var productsSorter = new ProductsSorter();
        var result = productsSorter.sort(products, "3");

        assertEquals(4, result.length);
        assertEquals("Book 1", result[0].name);
        assertEquals("Book 2", result[1].name);
        assertEquals("Book 3", result[2].name);
        assertEquals("Book 4", result[3].name);
    }
});