$.getScript( "http://dynamic.xkcd.com/api-0/jsonp/comic/1002?callback=handleCard" );
function handleCard(info){
	var cloneCard = $( ".card" ).eq(0).clone();
	cloneCard.css("display","block");
	cloneCard.find(".title").text(info.title);
	cloneCard.find(".description").text(info.alt);
	cloneCard.find("img").attr("src",info.img);
	$(".gallery").prepend(cloneCard);
}
function search(event){
	if (event.keyCode == 13) {
		var id = $("#cardById").val();
		if (/^\d+$/.test(id)){
			$.getScript( "http://dynamic.xkcd.com/api-0/jsonp/comic/"+id+"?callback=handleCard" );
		}
		$("#cardById").val("");	
	}
}
$(function(){
	$( "#cardById" ).on( "keydown", search );
});