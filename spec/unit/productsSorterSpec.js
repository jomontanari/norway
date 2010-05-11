describe "Products Sorter"
    before_each
        products = [
                    {
                        imageUrl : "http://hostname/images/image1.jpg",
                        price: 5,
                        author: "Doe, Bob"
                    },
                    {
                        imageUrl : "http://hostname/images/image2.jpg",
                        price: 8,
                        author: "Doe, Jane"
                    },
                    {
                        imageUrl : "http://hostname/images/image3.jpg",
                        price: 1,
                        author: "Parker, Peter"
                    },
                    {
                        imageUrl : "http://hostname/images/image3.jpg",
                        price: 5,
                        author: "Fox, Roger"
                    }
                   ];
    end

    it "Should throw an error if an unknow sort type is passed in"
        var productsSorter = new ProductsSorter();

        try {
            productsSorter.sort(products, "999");;

            fail("An error should have been thrown");
        }catch(e) {
            pass();
        }
    end

    it "Should sort products by price ascending"
        var productsSorter = new ProductsSorter();
        var result = productsSorter.sort(products, "1");

        result.length.should.eql 4
        result[0].price.should.eql 1
        result[1].price.should.eql 5
        result[2].price.should.eql 5
        result[3].price.should.eql 8
    end

    it "Should sort products by price ascending"
        var productsSorter = new ProductsSorter();
        var result = productsSorter.sort(products, "2");

        result.length.should.eql 4
        result[0].price.should.eql 8
        result[1].price.should.eql 5
        result[2].price.should.eql 5
        result[3].price.should.eql 1
    end
end