var items = [
	
];
var itemsData = Cookies.getJSON('items');

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
	}
});

function close(){
	$(this).parent().css("display","none");
}
function check (){
	$(this).toggleClass("checked");
}
function add(event){ 
	if ( !(/^\s*$/.test($("#myInput").val())) ){
		var item = $("li").eq(0).clone();
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
	if (event.keyCode == 13) {
		add();
	}
}