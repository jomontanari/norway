describe "Products View"
    before_each
        mockControl = new MockControl();

        jQueryMock = mockControl.createDynamicMock($.fn);
    end

    after_each
        mockControl.verify();
    end

    it "Should add category listing listeners"
        var callback = function() {};

        jQueryMock.tells().init(ProductsView.Ids.CategoryListingAnchors, undefined).toReturn(jQueryMock);
        jQueryMock.expects().click(callback);

        var productsView = new ProductsView();
        productsView.addCategoryListingHandlers(callback);
    end

    it "Should display the passed content listing in the centre of the page"
        jQueryMock.tells().init(ProductsView.Ids.ContentArea, undefined).toReturn(jQueryMock);
        jQueryMock.expects().html("Hello");

        var productsView = new ProductsView();
        productsView.displayContentListing("Hello");
    end
end