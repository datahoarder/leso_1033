function TopNews(objRoot, height, width, summaryheight, title, interval) {
    //Init
    //root element in DOM.module container.used in jquery selector to gain unique objects
    this._root = objRoot;
    this.Title = title;
    this.Dimensions = [height, width, summaryheight];
    this._slideShowInterval = interval;

    this._currNewsIndex = 1;
    this._prevNewsIndex = 5;
    this.nextNewsIntervalId = 0;
        
    this.BindNews();    
}

TopNews.prototype = {
    //call asp.net page method asynchronous (send and recives data in JSON format)
    PageMethod: function(fn, paramArray, successFn, errorFn) {
        var pagePath = window.location.pathname;
        var outerThis = this;
        
        //Call the page method  
        $.ajax({
            type: "POST",
            url: pagePath + "?Callback=" + fn,
            contentType: "application/json; charset=utf-8",
            data: paramArray,
            dataType: "json",
            success: function(res) { successFn(res, outerThis) },
            error: errorFn,
            async: false
        });
    },

    // Override jquery selector to ensure selected DOM objects are unique in multiple instances of module
    getElement: function(selector) {
        return $(this._root).find(selector);
    },

    initUI: function() {
        var HeaderLink = this.getElement('td[title="' + this.Title + '"]').find("h3 a");
        HeaderLink.removeClass().addClass('TopNewsHeader');

        $(this._root).css({ 'width': this.Dimensions[1] + 6, 'overflow': 'hidden',
            'border': 'solid 2px white', 'background-color': 'white', 'display': 'block' });
            
        for (i = 1; i <= 5; i++)
            this.getElement('[id$="_img' + i +'"] img').css({height: this.Dimensions[0] - this.Dimensions[2], width: '100%' });
        
        var outerThis = this;
        // We want navClick to have access to both our TopNews item AND the <li> that was clicked. The context of a jQuery
        // event handler is the DOM element that the event is for; so the clicked <li> will be the context of the anonymous function
        // Set the click handler for each navagation <li>
        this.getElement('.newsNavControls li').click(function() { outerThis.navClick(this); });
        
        this.getElement('#nextArea').bind('mouseenter', function() { outerThis.getElement('#next').attr('src', '/_layouts/images/next_hover.png'); });
        this.getElement('#nextArea').bind('mouseleave', function() { outerThis.getElement('#next').attr('src', '/_layouts/images/next.png'); });
        this.getElement('#nextArea').bind('click', function() { outerThis.nextNews(); clearInterval(outerThis.nextNewsIntervalId); return false; });
        
        this.getElement('#prevArea').bind('mouseenter', function() { outerThis.getElement('#prev').attr('src', '/_layouts/images/prev_hover.png'); });
        this.getElement('#prevArea').bind('mouseleave', function() { outerThis.getElement('#prev').attr('src', '/_layouts/images/prev.png'); });
        this.getElement('#prevArea').bind('click', function() { outerThis.prevNews(); clearInterval(outerThis.nextNewsIntervalId); return false; });
    },

    navClick: function(listItem)
    {
       // We do NOT want to do any fading if the user clicks the currently selected item
       // (use $ and not this.getElement because we are wrapping DOM element)
       if ($(listItem).hasClass("selectedItem") == false)
       {
           this._currNewsIndex = 1 + this.getElement('.newsNavControls li').index(listItem);
           this.setTopOne(0, this._currNewsIndex);
       }
       
       // Stop rotating when the user clicks
       clearInterval(this.nextNewsIntervalId);  // qq What if already cleared?  Could the ID have been reused on a different call to setInterval?
    },
    
    // qq oldIndex is no longer used
    setTopOne: function(oldIndex, newIndex) {
//            this.getElement('[id$="_img' + oldIndex + '"]').fadeOut(1000);
//            this.getElement('[id$="_desc' + oldIndex + '"]').fadeOut(1000);
        
        // Fade out old stuff
        this.getElement('a.selectedItem').fadeOut(1000);
        this.getElement('div.selectedItem').hide();

        // Unselect all old stuff (img, div, and box)
        this.getElement('.selectedItem').removeClass("selectedItem");

        // Fade in new stuff and select them
        this.getElement('[id$="_img' + newIndex + '"]').fadeIn(1000).addClass("selectedItem");
        this.getElement('[id$="_desc' + newIndex + '"]').show().addClass("selectedItem");

        // Select box (use $ and not this.getElement because we are wrapping DOM element)
        $(this.getElement('.newsNavControls')[0].children[newIndex - 1]).addClass("selectedItem");
    },

    nextNews: function() {
        if (this._currNewsIndex == 5)
        {
            this._currNewsIndex = 1;
            this._prevNewsIndex = 5;
        }
        else
        {
            this._prevNewsIndex = this._currNewsIndex;
            this._currNewsIndex++;
        }
        this.setTopOne(this._prevNewsIndex, this._currNewsIndex);
    },
    
    prevNews: function() {
        if (this._currNewsIndex == 1)
        {
            this._currNewsIndex = 5;
            this._prevNewsIndex = 1;
        }
        else
        {
            this._prevNewsIndex = this._currNewsIndex;
            this._currNewsIndex--;
        }
        this.setTopOne(this._prevNewsIndex, this._currNewsIndex);
    },

    Pause: function(itm) {
        clearInterval(this.nextNewsIntervalId);
    },

    BindNews: function() {
        this.initUI();
        var outerThis = this;
        this.nextNewsIntervalId = setInterval(function() { outerThis.nextNews(); }, this._slideShowInterval);
    }

}
 
 