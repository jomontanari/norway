Browser.Dom = {
    addClickHandler : function(selector, callback) {
        $(selector).click(callback);
    },
    
    setHtml : function(selector, html) {
        $(selector).html(html);
    },

    getValue : function(selector) {
        return $(selector).val();
    },

    enable : function(selector) {
        $(selector).removeAttr("disabled");
    }
};