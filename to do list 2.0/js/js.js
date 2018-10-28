var items = [
	
];

var itemsData;
function getter( data ) {
    itemsData = data;
}
$.get( "api/actions", getter);

$(function(){
	var span = $("<span class='close'>×</span>");
	span.click(close);
	$("li").append(span);
	$("li").click(check);
	$( ".addBtn" ).click(add);
	$( "#myInput" ).on( "keydown", addEnter );
	

	for(var i = 0; i < itemsData.length; i++){
		var it = itemsData[i];
		var item = $("<li>");
		item.text(it.text); 
		if (it.done){
			item.addClass("checked");
		}
		var span = $("<span class='close'>×</span>");
		span.click(close);
		item.append(span);
		item.click(check);
		$("#myUL").append(item);
		items.push(it);
	}
});

function close(){
    let item = $(this).parent();
	var index = $( "li" ).index(item);
    item.css("display","none");
    $.ajax({
        method: "DELETE",
        url: "api/actions/" + index
    });
}
function check (){
	$(this).toggleClass("checked");
	
	var index = $( "li" ).index(this);
	if ( $(this).hasClass("checked") ){
		items[index].done = true;
	}
	else {
		items[index].done = false;
	}
	Cookies.set('items', items);
}
function add(event){
    if ( !(/^\s*$/.test($("#myInput").val())) ){
        var item = $("<li>");
        item.text($("#myInput").val());
        var span = $("<span class='close'>×</span>");
        span.click(close);
        item.append(span);
        item.click(check);
        $("#myUL").append(item);
        var action = {
            done: false,
            text: $("#myInput").val()
        };
        items.push(action);
        $.post( "/api/actions", action );
    }
    $("#myInput").val("");
}
function addEnter(event) {
	if (event.keyCode == 13) { // enter
		add();
	}
}

