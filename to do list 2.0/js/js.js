var itemsData;

$(function(){
    $.get( "api/actions", getter);

	$( ".addBtn" ).click(add);
	$( "#myInput" ).on( "keydown", addEnter );
});

function getter( data ) {
    itemsData = data;

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
}

function close(){
    let item = $(this).parent();
	var index = $( "li" ).index(item);
    item.remove();
    $.ajax({
        method: "DELETE",
        url: "api/actions/" + index
    });
}
function check (){
	$(this).toggleClass("checked");
	
	var index = $( "li" ).index(this);
    var action = {
        done: $(this).hasClass("checked")
    };
    $.ajax({
        method: "PUT",
        url: "api/actions/" + index,
        data:action
    });
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
        $.post( "/api/actions", action );
    }
    $("#myInput").val("");
}
function addEnter(event) {
	if (event.keyCode == 13) { // enter
		add();
	}
}

