var obj;

module("ko-paginator", {
  setup: function () {
    obj = new koPaginator;
  }
});

test("construct", function(){
    strictEqual(obj.currentPageNumber(), 1);
    strictEqual(obj.itemCountPerPage(), 10);
    strictEqual(obj.pageRange(), 10);
    deepEqual([], obj.itemSource());
});

test("construct_params", function(){
    var params = {};
    params.currentPageNumber = 5;
    params.itemCountPerPage = 2;
    params.itemSource = [{name: "name"}];
    
    var ins = new koPaginator(params);
    strictEqual(ins.currentPageNumber(), params.currentPageNumber);
    strictEqual(ins.itemCountPerPage(), params.itemCountPerPage);
    deepEqual(ins.itemSource(), params.itemSource);
});

test("offset_page1", function(){
    
    var item = [];
    
    for(var i=0; i < 10; i++) {
        var name = 'test' + i;
        item.push({name: name});
    }
    
    obj.itemCountPerPage(10);
    obj.currentPageNumber(1);
    obj.itemSource(item);
    
    strictEqual(0, obj.offset());
});

test("offset_page2", function(){

    var item = [];
    
    for(var i=0; i < 10; i++) {
        var name = 'test' + i;
        item.push({name: name});
    }

    obj.itemCountPerPage(10);
    obj.currentPageNumber(2);
    obj.itemSource(item);
    
    strictEqual(10, obj.offset());
});

test("offset_page2_per5", function(){

    var item = [];
    
    for(var i=0; i < 10; i++) {
        var name = 'test' + i;
        item.push({name: name});
    }

    obj.itemCountPerPage(5);
    obj.currentPageNumber(2);
    obj.itemSource(item);
    
    strictEqual(5, obj.offset());
});

test("getItem_page1", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    obj.itemCountPerPage(5);
    obj.currentPageNumber(1);
    obj.itemSource(item);
    
    deepEqual(obj.itemSource(), item);
    
    var ext = [];
    
    for (row in item) {
        ext.push(item[row]);
        
        if (ext.length === obj.itemCountPerPage())
            break;
    }

    strictEqual(obj.getItem().length, 5);
    deepEqual(obj.getItem(), ext);
    deepEqual(obj.itemSource(), item);
});

test("slice", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    var ext = [];
    ext.push(item[0]);
    ext.push(item[1]);
    
    deepEqual(item.slice(0,2), ext);
    deepEqual(item.slice(0,10), item);
});

test("slice_offset", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    var ext = [];
    ext.push(item[1]);
    ext.push(item[2]);
    
    deepEqual(item.slice(1,3), ext);
});

test("slice_outrange", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    deepEqual(item.slice(20,10), []);
});

test("slice_end_rev", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    deepEqual(item.slice(20,0), []);
});

test("getItem_page2", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    obj.itemCountPerPage(5);
    obj.currentPageNumber(2);
    obj.itemSource(item);
    
    var ext = []
    ext.push(item[5]);
   
    deepEqual(obj.getItem(), ext);
});


module("ko-paginator.page", {
  setup: function () {
    obj = new koPaginator;
  }
});

test("getPage_pageCount", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    obj.itemCountPerPage(5);
    obj.currentPageNumber(2);
    obj.itemSource(item);
    
    var page = obj.getPage();
    strictEqual(page.pageCount(), 2);
    
    obj.itemCountPerPage(2);
    strictEqual(page.pageCount(), 3);
    
    obj.itemSource([]);
    strictEqual(page.pageCount(), 1);
});

test("getPage_totalItemCount", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    obj.itemCountPerPage(5);
    obj.currentPageNumber(2);
    obj.itemSource(item);
    
    var page = obj.getPage();
    strictEqual(page.totalItemCount(), item.length);
});

test("getPage_last", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    obj.itemCountPerPage(2);
    obj.currentPageNumber(2);
    obj.itemSource(item);
    
    var page = obj.getPage();
    strictEqual(page.last(), 3);
    
    obj.itemSource([]);
    strictEqual(page.last(), 1);
});

test("getPage_current", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    obj.itemCountPerPage(2);
    obj.currentPageNumber(2);
    obj.itemSource(item);
    
    var page = obj.getPage();
    strictEqual(page.current(), 2);
    
    obj.currentPageNumber(99);
    strictEqual(page.current(), page.last());
    
    obj.itemSource([]);
    strictEqual(page.current(), 1);
});

test("getPage_next", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    obj.itemCountPerPage(2);
    obj.currentPageNumber(2);
    obj.itemSource(item);
    
    var page = obj.getPage();
    strictEqual(page.next(), 3);
    
    obj.currentPageNumber(99);
    strictEqual(page.next(), page.last());
    
    obj.itemSource([]);
    strictEqual(page.next(), 1);
});

test("getPage_previous", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    obj.itemCountPerPage(2);
    obj.currentPageNumber(2);
    obj.itemSource(item);
    
    var page = obj.getPage();
    strictEqual(page.previous(), 1);
    
    obj.currentPageNumber(0);
    strictEqual(page.previous(), page.first());
    
    obj.itemSource([]);
    strictEqual(page.previous(), 1);
});

test("getPage_firstItemNumber", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    obj.itemCountPerPage(2);
    obj.currentPageNumber(1);
    obj.itemSource(item);
    
    var page = obj.getPage();
    strictEqual(page.firstItemNumber(), 1);
    
    obj.currentPageNumber(2);
    strictEqual(page.firstItemNumber(), 3);
      
    obj.itemSource([]);
    strictEqual(page.firstItemNumber(), 0);
});

test("getPage_lastItemNumber", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    obj.itemCountPerPage(2);
    obj.currentPageNumber(1);
    obj.itemSource(item);
    
    var page = obj.getPage();
    strictEqual(page.lastItemNumber(), 2);
    
    obj.currentPageNumber(2);
    strictEqual(page.lastItemNumber(), 4);
      
    obj.itemSource([]);
    strictEqual(page.lastItemNumber(), 0);
});

test("getPage_lastItemNumber_rest", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    obj.itemCountPerPage(4);
    obj.currentPageNumber(2);
    obj.itemSource(item);
    
    var page = obj.getPage();
    strictEqual(page.lastItemNumber(), 6);
});


test("getPage_currentItemCount", function(){
    var item = [
        {name:"test1"},
        {name:"test2"},
        {name:"test3"},
        {name:"test4"},
        {name:"test5"},
        {name:"test6"}
    ];
    
    obj.itemCountPerPage(4);
    obj.currentPageNumber(1);
    obj.itemSource(item);
    
    var page = obj.getPage();
    strictEqual(page.currentItemCount(), 4);
    
    obj.currentPageNumber(2);
    strictEqual(page.currentItemCount(), 2);
      
    obj.itemSource([]);
    strictEqual(page.currentItemCount(), 0);
});

test("getPage_pagesInRange", function(){
    var item = [];
    
    for(var i=0; i < 21; i++) {
        var name = 'test' + i;
        item.push({name: name});
    }
    
    obj.itemCountPerPage(2);
    obj.currentPageNumber(1);
    obj.pageRange(10);
    obj.itemSource(item);
    
    var page = obj.getPage();
    var result = page.pagesInRange();
    
    var ext = [];
    for(var i=0; i < 10; i++) {
        ext.push(i+1);
    }
     
    obj.itemSource([]);
    deepEqual(page.pagesInRange(), [1]);
});

test("getPage_pagesInRange_move", function(){
    var item = [];
    
    for(var i=0; i < 21; i++) {
        var name = 'test' + i;
        item.push({name: name});
    }
    
    obj.itemCountPerPage(2);
    obj.currentPageNumber(1);
    obj.pageRange(5);
    obj.itemSource(item);
    
    var page = obj.getPage();
    var result = page.pagesInRange();
    
    for (var pageNumber =1; pageNumber <= 3; pageNumber++) {
        obj.currentPageNumber(pageNumber);
        result = page.pagesInRange();
        strictEqual(result[0], 1);
        strictEqual(result[4], 5);
    }
    
    obj.currentPageNumber(4);
    result = page.pagesInRange();
    strictEqual(result[0], 2);
    strictEqual(result[4], 6);
    
    obj.currentPageNumber(5);
    result = page.pagesInRange();
    strictEqual(result[0], 3);
    strictEqual(result[4], 7);
    
    for (var pageNumber =9; pageNumber <= 10; pageNumber++) {
        obj.currentPageNumber(pageNumber);
        result = page.pagesInRange();
        strictEqual(result[0], 7);
        strictEqual(result[4], 11);
    }
});


/*
asyncTest("request", function(){
    expect(1);
    obj.request().fail(function(xhr, status, error) {
        console.log( status + ' : '+ error.message);
        strictEqual(status, 'error');
        start();
    });
});

test("autoID", function(){
    obj.autoID = true;
    obj.request();
    strictEqual(obj.data.id, 1);
    obj.request();
    strictEqual(obj.data.id, 2);
});
*/