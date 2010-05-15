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

    it "Should add the sort listeners"
        var callback = function() {};

        jQueryMock.tells().init(ProductsView.Ids.SortButton, undefined).toReturn(jQueryMock);
        jQueryMock.expects().click(callback);

        var productsView = new ProductsView();
        productsView.addSortHandler(callback);
    end

    it "Should return the selected sort option"
        jQueryMock.tells().init(ProductsView.Ids.SortOptions, undefined).toReturn(jQueryMock);
        jQueryMock.expects().val().toReturn("1");

        var productsView = new ProductsView();
        productsView.getSelectedSortOption().should.eql "1"
    end

    it "Should display the passed content listing in the centre of the page"
        jQueryMock.tells().init(ProductsView.Ids.ContentArea, undefined).toReturn(jQueryMock);
        jQueryMock.expects().html("Hello");

        var productsView = new ProductsView();
        productsView.setContentListing("Hello");
    end
end