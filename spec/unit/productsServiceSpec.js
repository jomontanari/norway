describe "Product Service"
    before_each
        mockControl = new MockControl();

        httpMock = mockControl.createDynamicMock(Browser.HTTP);
    end

    after_each
        mockControl.verify();
    end

    it "Should load the the category listing for the passed url"
        var callback = function() {};

        httpMock.expects().get("/book/list", callback).toReturn("Book listing");

        var productsService = new ProductsService();
        productsService.getCategoryListing("/book/list", callback);
    end
end