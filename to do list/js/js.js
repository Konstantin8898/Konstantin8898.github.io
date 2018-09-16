$(function(){
	var span = $("<span class='close'>×</span>");
	span.click(close);
	$("li").append(span);
	$("li").click(check);
	$( ".addBtn" ).click(add);
	$( "#myInput" ).on( "keydown", addEnter );
});
var items = [
	
];

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
			done:false,
			text:$("#myInput").val()
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