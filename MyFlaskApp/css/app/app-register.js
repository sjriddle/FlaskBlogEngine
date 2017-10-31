$(document).ready(function () {

    var validator = $("#register").validate({

        rules: {
            firstname: {
                minlength: 2,
                required: true
            },
            lastname: {
                minlength: 2,
                required: true
            },
            usernamer: {
                minlength: 3,
                required: true
            },
            email: {
                email: true,
                required: true
            },
            password1: {
                minlength: 5,
                required: true
            },
            password2: {
                minlength: 5,
                required: true,
                equalTo: "#password1"
            }
        },
        messages: {
            firstname: {
                minlength: "Name must be at least 2 characters.",
                required: "Please enter your first name."
            },
            lastname: {
                minlength: "Name must be at least 2 characters.",
                required: "Please enter your first name."
            },
            usernamer: {
                minlength: "Name must be at least 3 characters.",
                required: "Please enter a valid username."
            },
            email: {
                email: "Address must be in a valid email format.",
                required: "Please enter a valid email address."
            },
            password1: {
                minlength: "Your password must be at least 5 characters.",
                required: "Please enter a new password."
            },
            password2: {
                minlength: "Your password must be at least 5 characters.",
                required: "Please re-enter your password.",
                equalTo: "Your confirmation password must match your first password."
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },

        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },

        submitHandler: function (form) {
            var cookies = 'NO';
            if ($("#stayloggedin").is(':checked')) {
                cookies = 'YES';
            }
            $.ajax({
                type: 'POST',
                url: 'createuser.php',
                cache: false,
                crossDomain: true,
                dataType: 'json',
                data: {
                    username: $('#usernamer').val(),
                    firstname: $('#firstname').val(),
                    lastname: $('#lastname').val(),
                    email: $('#email').val(),
                    password1: $('#password1').val(),
                    password2: $('#password2').val(),
                    stayloggedin: cookies
                },
                success: function (data) {
                    $('#register-error').css("display", "none");
                    window.location.href = "index.php"
                },
                error: function (reason, ex) {
                    $('#register-error').text(reason.responseText);
                    $('#register-error').css("display", "block");
                }
            });

        }

    });

    $.validator.methods.email = function (value, element) {
        return this.optional(element) ||
            /[a-z0-9]+@[a-z]+\.[a-z]+/.test(value);
    };


    $("#reset").click(function () {
        //Iterate through named elements inside of the form, and mark them as error free
        $('form-control', $("#register")).each(function () {
            validator.successList.push(this); //mark as error free
            validator.showErrors(); //remove error messages if present
        });

        validator.resetForm(); //remove error class on name elements and clear history
        validator.reset(); //remove all error and success data       
    });


});
