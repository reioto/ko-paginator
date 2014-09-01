
var koPaginator = koPaginator || function(params = {}) {
    
    var self = this;
    
    /**
     * properties
     */
    self.currentPageNumber = ko.observable(params.currentPageNumber || 1);
    self.itemCountPerPage = ko.observable(params.itemCountPerPage || 10);
	self.pageRange = ko.observable(params.pageRange || 10);
	
	if(typeof params.itemSource === 'function')
       self.itemSource = params.itemSource || ko.observableArray([]);
   else
       self.itemSource = ko.observableArray(params.itemSource || []);
	
	/**
	 * @return int
	 */
	self.offset = ko.computed(function (){
       var result = (this.currentPageNumber() -1) * this.itemCountPerPage();
       if (result < 0)
	       return 0;
       else 
           return result;
    }, self);

    /**
     * get Items on current Page
     * @return array
     */
	self.getItem = ko.computed(function (){
	   var end = this.itemCountPerPage() * this.currentPageNumber();
	   return this.itemSource.slice(this.offset(), end);
	}, self);
	
	/**
	 * @return int
	 */
	self.pageCount = ko.computed(function(){
	    var result = Math.ceil(this.itemSource().length / this.itemCountPerPage());
	    if (result < 1)
	       return 1;
	    else
	       return result;
	}, self);

    /**
     * @return int
     */
	self.current = ko.computed(function(){
        var current = this.currentPageNumber();
        var max = this.pageCount();
        if (current > max)
            return  max;
        else if (current < 1)
            return 1;
        else
            return current;
    }, self);

    /**
     * @return array
     */
    self.pagesInRange = ko.computed(function(){
        var pageRange = this.pageRange();
        var pageCount = this.pageCount();
        var pageNumber = this.current();
        
        if (pageRange > pageCount) {
            pageRange = pageCount;
        }
        
        var delta = Math.ceil(pageRange / 2);
        var lowerBound = 0, upperBound = 0;
        
        if (pageNumber - delta > pageCount - pageRange) {
            lowerBound = pageCount - pageRange + 1;
            upperBound = pageCount;
        } else {
            if (pageNumber - delta < 0) {
                delta = pageNumber;
            }
            var offset = pageNumber - delta;
            lowerBound = offset + 1;
            upperBound = offset + pageRange;
        }

        var pages = [];
        for (var pNumber = lowerBound; pNumber <= upperBound; pNumber++) {
            pages.push(pNumber);
        }
        
        return pages;
    }, self);

    /**
     * @return Object
     */
    self.getPage = ko.computed(function(){
        
        var page = {
            pageCount: self.pageCount,
            first: function(){
                return 1;
            },
            last: self.pageCount,
            next: ko.computed(function(){
                if (this.current() === this.pageCount())
                    return this.current();
                else
                    return this.current() + 1;
            }, this),
            previous: ko.computed(function(){
                var current = this.current();
                if (current <= 1)
                    return 1;
                else
                    return current - 1;
            }, this),
            current: self.current,

            firstItemNumber: ko.computed(function(){
                if (this.itemSource().length > 0)
                    return this.offset() +1;
                else
                    return 0;
            }, this),
            lastItemNumber: ko.computed(function(){
                var itemCount = this.itemSource().length;
                if (itemCount > 0) {
                    var rest = itemCount % this.itemCountPerPage();
                    if ( rest > 0)
                        return this.offset() + rest;
                    else
                        return this.offset() + this.itemCountPerPage();
                }else {
                    return 0;
                }
            }, this),
            

            currentItemCount: ko.computed(function(){
                return this.getItem().length;
            }, this),
            itemCountPerPage: ko.computed(function(){
                return this.itemCountPerPage();
            }, this),
            
            pagesInRange: self.pagesInRange,
            firstPageInRange: ko.computed(function(){
                var pageRange = this.pagesInRange();
                if (pageRange.length > 0)
                    return pageRange[0];
                else
                    return 0;
            }, this),
            lastPageInRange: ko.computed(function(){
                var pageRange = this.pagesInRange();
                if (pageRange.length > 0) {
                    var index = pageRange.length -1;  
                    return pageRange[index];
                }else {
                    return 0;
                }
            }, this),
            
            totalItemCount: ko.computed(function(){
                return this.itemSource().length; 
            }, this)
        };
        
        return page;
    }, self);
};

