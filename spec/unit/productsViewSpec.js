describe "Products View"
    before_each
        mockControl = new MockControl();

        jQueryMock = mockControl.createDynamicMock($.fn);
    end

    after_each
        mockControl.verify();
    end

    it "Should add a listener to the book listing anchor"
        var callback = function() {};

        jQueryMock.tells().init(ProductsView.Ids.BookListingAnchor, undefined).toReturn(jQueryMock);
        jQueryMock.expects().click(callback);

        var productsView = new ProductsView();
        productsView.addBooksCategoryHandler(callback);
    end

    it "Should add a listener to the cd listing anchor"
        var callback = function() {};

        jQueryMock.tells().init(ProductsView.Ids.CDListingAnchor, undefined).toReturn(jQueryMock);
        jQueryMock.expects().click(callback);

        var productsView = new ProductsView();
        productsView.addCDCategoryHandler(callback);
    end

    it "Should add a listener to the dvd listing anchor"
        var callback = function() {};

        jQueryMock.tells().init(ProductsView.Ids.DVDListingAnchor, undefined).toReturn(jQueryMock);
        jQueryMock.expects().click(callback);

        var productsView = new ProductsView();
        productsView.addDVDCategoryHandler(callback);
    end

    it "Should display the passed content listing in the centre of the page"
        jQueryMock.tells().init(ProductsView.Ids.ContentArea, undefined).toReturn(jQueryMock);
        jQueryMock.expects().html("Hello");

        var productsView = new ProductsView();
        productsView.displayContentListing("Hello");
    end
end