var items = [
	
];

var itemsData;
function getter( data ) {
    itemsData = data;
}
$.get( "http://localhost:1337/api/actions", getter);

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
		Cookies.set('items', items);
	}
});

function close(){
	$(this).parent().css("display","none");
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
		var business = {
			done: false,
			text: $("#myInput").val()
		};
		items.push(business);
		Cookies.set('items', items);
	}
	$("#myInput").val("");
}
function addEnter(event) {
	if (event.keyCode == 13) { // enter
		add();
	}
}
