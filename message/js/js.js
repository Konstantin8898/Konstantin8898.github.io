function cloneMessage(event){
	if (event.keyCode == 13) {

		if (/^\S+$/.test($("textarea").val())){
			var message = $(".message").eq(0).clone();
			message.text($("textarea").val()); 
			event.preventDefault();
			$("#messages").append(message);
		}
		$("textarea").val("");
	}		

}
$(function(){
	$( "textarea" ).on( "keydown", cloneMessage );
});