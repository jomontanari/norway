describe "Dom"
    before_each
        mockControl = new MockControl();

        jQueryMock = mockControl.createDynamicMock($.fn);
    end

    after_each
        mockControl.verify();
    end

    it "Should register the passed function as a listener to the click event of the element"
        var selector = ".class-name";

        jQueryMock.expects().init(selector, null).toReturn(jQueryMock);
        jQueryMock.expects().click(Arg.isA(Function));

        Browser.Dom.addClickHandler(selector, function() {});
    end

    it "Should set the passed html on the element"
        var selector = ".class-name";

        jQueryMock.expects().init(selector, null).toReturn(jQueryMock);
        jQueryMock.expects().html("html");

        Browser.Dom.setHtml(selector, "html");
    end

    it "Should return the value of the element"
        var selector = ".class-name";

        jQueryMock.expects().init(selector, null).toReturn(jQueryMock);
        jQueryMock.expects().val().toReturn("1");

        Browser.Dom.getValue(selector).should.eql "1"
    end

    it "Should enable the passed element"
        var selector = ".class-name";

        jQueryMock.expects().init(selector, null).toReturn(jQueryMock);
        jQueryMock.expects().removeAttr("disabled");

        Browser.Dom.enable(selector);
    end
end
