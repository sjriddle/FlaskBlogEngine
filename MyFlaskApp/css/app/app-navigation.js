$("#submitbutton").click(function () {
  cookies='NO';
  if($("#stayloggedin").is(':checked')){cookies = 'YES'; }
  $.ajax({
    type: 'POST',
    url: 'login.php',
    cache: false,
    crossDomain: true,
    dataType: 'json',
    data: {
        username: $('#username').val(),
        password: $('#thepassword').val(),
        stayloggedin: cookies
    },
    success: function (data) {
      $('#login-error').css("display", "none");
      $('.daropdown.keep-open').on({
          "shown.bs.dropdown": function(){this.closable = true;},
          "click": function () {this.closable = true;},
          "hide.bs.dropdown": function(){return this.closable;}
      });
      $('.dropdown.keep-open').hide();
      $('#navbar').html(data);
    },
    error: function (reason, ex) {
        $('#login-error').css("display", "inline");
    }
  });
});
$('.stop-propagation').on('click', function (e) {
    e.stopPropagation();
});
