$(function(){
	var span = $("<span class='close'>×</span>");
	span.click(close);
	$("li").append(span);
	$("li").click(check);
	$( ".addBtn" ).click(add);
});

function close(){
	$(this).parent().css("display","none");
}
function check (){
	$(this).toggleClass("checked");
}
function add(event){ 
	if (/^\S+$/.test($("#myInput").val())){
		var item = $("li").eq(0).clone();
		item.text($("#myInput").val()); 
		var span = $("<span class='close'>×</span>");
		span.click(close);
		item.append(span);
		item.click(check);
		$("#myUL").append(item);
	}
	$("#myInput").val("");	
}