//SPA FUNCTIONALITY

$(window).on('beforeunload', function(){    //this code triggers before page refreshes, here a cookie is created with the list data
	var load =$( "#sortable" ).html();
	localStorage.setItem("load",load);
});

$(window).on('load', function(){    //this will delete the older cookie so it doesn't create a conflict
	var reload = localStorage.getItem("load");
	if (reload !== ''){
		$("#sortable").append(reload);
		updateCounter();
	}
});

//END SPA F

var count_element=0; //has to be outside and accesible
var updateCounter = function(){
	count_element = $('.listed').length;
	$("#counter").text(count_element);
};

$( function() {
	//native jquery property to drag and drop
	$( "#sortable" ).sortable();
	$( "#sortable" ).disableSelection();
	updateCounter();
});

var addItem = function(){
	var iName = $('#name').val();
	var iDesc = $('#description').val();
	$("#sortable").append('<li class="listed"><button id="edit"><i class="fa fa-edit"></i></button>'
		+'<span id="liName">'+iName+'</span>'
		+'<br><br><button id="del"><i class="fa fa-trash"></i></button>'
		+'<span id="liDesc">'+iDesc+'</span>'
		+'<img class="myImg" src=""></li>');
	updateCounter();
	$("#inputs").hide();
	$('#name,#description').val('');
};

$(function () { //file uploading controls, images will be saved as Base64 URl
	$("#fil").change(function () {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = imageIsLoaded;
			reader.readAsDataURL(this.files[0]);
		}
	});
});

function imageIsLoaded(e) {
	addItem();
	$('.myImg').attr('src', e.target.result);
	$(".focus").removeClass('focus');
	$("#inputs").dialog("close");
};

$(document).on('click', '#del', function() { //delete item from li
	$(this).closest('li').remove(); 
	updateCounter();
});

$(document).on('click', '#edit', function() {  //edit item in li
	//Build inputs form and clear afterwards:

	$('#edinputs').append('Item:<br>'+
		'<input id="named" type="text"><br>'+
		'Description:<br>'+
		'<textarea rows="7" cols="21" maxlength="300" id="descriptiond"></textarea><br><br>'+
		'<img id="myImgd" src="" alt=""/>'+
		'<input type="file" id="dfil" accept="image/gif, image/jpg, image/jpeg, image/png"/>'
		);

$( "#edinputs" ).dialog({
	dialogClass: "no-close",
	resizable: false,
	height: "auto",
	width: 400,
	modal: true,
	buttons: {
		"Done Editing": function() {
			$('.focus').remove();
			let iDescd=null;
			let iNamed=null;
			let imurl = $('#myImgd').attr("src"); //this var is saving the url of the image on the edit form in case it was changed
			iNamed = $('#named').val();
			iDescd = $('#descriptiond').val();
			$("#sortable").append('<li class="listed"><button id="edit"><i class="fa fa-edit"></i></button>'
				+'<span id="liName">'+iNamed+'</span>'
				+'<br><br><button id="del"><i class="fa fa-trash"></i></button>'
				+'<span id="liDesc">'+iDescd+'</span>'
				+'<img class="image" src="'+imurl+'"></li>');
			updateCounter();
			$('#edinputs').empty(); //clearing of the input forms
			$(this).dialog("close");
		},
		Cancel: function() {
			$( this ).dialog( "close" );
			$('#edinputs').empty(); //clearing of the input forms
		}
		}//closing of buttons input
	});

	$(this).parent().addClass('focus');
	$("#named").val( $(".focus #liName").text() );
	$("#descriptiond" ).val( $(".focus #liDesc").text() );
	let originalurl = $('.focus').find('img').attr("src"); //catching url for later usage
	$('#myImgd').attr('src',originalurl);

	$(function () {
		$("#dfil").change(function () {
			if (this.files && this.files[0]) {
				var reader = new FileReader();
				reader.onload = iimageIsLoaded;
				reader.readAsDataURL(this.files[0]);
			}
		});
	});
function iimageIsLoaded(e) {
	$('#myImgd').attr('src', e.target.result);
};

});// END OF EDIT BUTTON

$(document).on("click", ".float",function(){

	$( "#inputs" ).dialog({
		dialogClass: "no-close",
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		buttons: {
			"Add Item": function() {
				addItem();
				$(this).dialog("close");
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
	});

	$('.myImg').removeClass('myImg').addClass('image'); //this is made in case an item is added with no image attached
});
