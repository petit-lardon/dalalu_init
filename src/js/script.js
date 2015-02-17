$(function () {
    //$('[data-toggle="popover"]').popover();
    $("#pop").popover({
        html: true,
        placement: "left",
        content: function () {
            return $('.content').html();
        }
    });
    $('.modal-footer button').click(function() {
        var button = $(this);
        if (button.attr("data-dismiss") != "modal") {
            var inputs = $('form input');
            var title = $('.modal-title');
            var progress = $('.progress');
            var progressBar = $('.progress-bar');

            inputs.attr("disabled", "disabled");
            button.hide();
            progress.show();
            progressBar.animate({width: "100%"}, 100);
            progress.delay(1000)
                    .fadeOut(600);
            button.text("Fermer")
                    .removeClass("btn-primary")
                    .addClass("btn-success")
                    .blur()
                    .delay(1600)
                    .fadeIn(function() {
                        title.text("Connexion réussie");
                        button.attr("data-dismiss", "modal");
                    });
        }
    });
    $('#myModal').on('hidden.bs.modal', function(e) {
        var inputs = $('form input');
        var title = $('.modal-title');
        var progressBar = $('.progress-bar');
        var button = $('.modal-footer button');

        inputs.removeAttr("disabled");
        title.text("Connexion à l'intranet");
        progressBar.css({"width": "0%"});
        button.removeClass("btn-success")
                .addClass("btn-primary")
                .text("Ok")
                .removeAttr("data-dismiss");

    });
});

$('.popover-markup>.trigger').popover({
    html: true,
    title: function () {
        return $(this).parent().find('.head').html();
    },
    content: function () {
        return $(this).parent().find('.content').html();
    },
    placement: function (context, source) {
        var position = $(source).position();

        if (position.left > 515) {
            return "left";
        }

        if (position.left < 515) {
            return "right";
        }

        if (position.top < 110) {
            return "bottom";
        }

        return "top";
    }
    /*placement: 'left'*/
});

