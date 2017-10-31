$(function () {
  if ($.cookie("username") && $.cookie("password")) {
    $.ajax({
      type: 'POST',
      url: 'login.php',
      cache: false,
      crossDomain: true,
      dataType: 'json',
      data: {
          username: $.cookie("username"),
          password: $.cookie("password"),
          stayloggedin: "NO"
      },
      success: function (data) {
        $('#login-error').css("display", "none");
        $('.dropdown.keep-open').on({
          "shown.bs.dropdown": function(){ this.closable = true;},
          "click": function (){this.closable = true;},
          "hide.bs.dropdown":function(){return this.closable;}
        });
        $('.dropdown.keep-open').hide();
        $('#navbar').html(data);
      },
      error: function (reason, ex) {
          $('#login-error').css("display", "inline");
      }
    });
   }
  }
);
