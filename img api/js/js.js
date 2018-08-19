$.getScript( "http://dynamic.xkcd.com/api-0/jsonp/comic/250?callback=handleCard" );
function handleCard(info){
	var cloneCard = $( ".card" ).clone();
	cloneCard.css("display","block");
	cloneCard.find(".title").text(info.title);
	cloneCard.find(".description").text(info.alt);
	cloneCard.find("img").attr("src",info.img);
	$(".gallery").append(cloneCard);
}