// JavaScript Document

$(window).load(function () {
    "use strict";
    // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})

$(document).ready(function () {
    "use strict";

    // scroll menu, progress bar & back-to-top
    var sections = $('.section'),
        nav = $('.navbar-fixed-top,footer'),
        nav_height = nav.outerHeight();

    function handleScroll() {
        var cur_pos = $(window).scrollTop();
        var win_height = $(window).height();
        var doc_height = $(document).height();

        // Reading progress bar
        var total_scroll = doc_height - win_height;
        var progress = (total_scroll > 0) ? (cur_pos / total_scroll) * 100 : 0;
        $('#scroll-progress').css('width', Math.min(100, Math.max(0, progress)) + '%');

        // Back to top button visibility
        if (cur_pos > 300) {
            $('#back-to-top').addClass('show-btn');
        } else {
            $('#back-to-top').removeClass('show-btn');
        }

        // Header opacity
        if (cur_pos > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }

        // Check if reached bottom of page -> activate last section (#contact)
        if (cur_pos + win_height >= doc_height - 60) {
            nav.find('a').removeClass('active');
            sections.removeClass('active');
            $('#contact').addClass('active');
            nav.find('a[href="#contact"]').addClass('active');
            return;
        }

        // Section active detection
        sections.each(function () {
            var top = $(this).offset().top - nav_height - 20,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    }

    $(window).on('scroll', handleScroll);
    handleScroll();

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);

        return false;
    });

    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });



    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        parallax();
    });

    // AOS
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    //  isotope
    $('#projects').waitForImages(function () {
        var $container = $('.portfolio_container');
        $container.isotope({
            filter: '*',
        });

        $('.portfolio_filter a').click(function () {
            $('.portfolio_filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            return false;
        });

    });

    //animatedModal
    // $("#demo01,#demo02,#demo03,#demo04,#demo05,#demo06,#demo07,#demo08,#demo09").animatedModal();
    // $("#demo01").animatedModal1();
    
    // Contact Form 	

    // validate contact form
    $(function () {
        $('#contact-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true
                },
                phone: {
                    required: false
                },
                message: {
                    required: true
                }

            },
            messages: {
                name: {
                    required: "This field is required",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "This field is required"
                },
                message: {
                    required: "This field is required"
                }
            },
        });

    });
});


// Contact Form

// submitHandler: function (form) {
//     $(form).ajaxSubmit({
//         type: "POST",
//         data: $(form).serialize(),
//         url: "process.php",
//         success: function () {
//             $('#contact :input').attr('disabled', 'disabled');
//             $('#contact').fadeTo("slow", 1, function () {
//                 $(this).find(':input').attr('disabled', 'disabled');
//                 $(this).find('label').css('cursor', 'default');
//                 $('#success').fadeIn();
//             });
//         },
//         error: function () {
//             $('#contact').fadeTo("slow", 1, function () {
//                 $('#error').fadeIn();
//             });
//         }
//     });
// }