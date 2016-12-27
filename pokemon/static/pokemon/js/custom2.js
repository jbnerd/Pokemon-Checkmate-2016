$(document).ready(function() {
    /**svg related functions**/
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $('.poke-stop').tooltip({
        title: 'A battle awaits you here!',
        container: 'body'
    });
    $('.poke-gym').tooltip({
        title: 'Ready for even tougher battle?',
        container: 'body'
    });
    $('.poke-center').tooltip({
        title: 'POKECENTER',
        container: 'body'
    });
    $('.disabled').tooltip({
        title: 'Disabled',
        container: 'body'
    });

    $('.poke-stop').mouseenter(function() {

        $(this).find('.poke-stop-color').addClass('changeColorStop');

    });

    $('.poke-stop').mouseleave(function() {

        $(this).find('.poke-stop-color').removeClass('changeColorStop');

    });


    $('.poke-gym').mouseenter(function() {

        $(this).find('.poke-gym-color').addClass('changeColorGym');
        $(this).find('.poke-gym-color2').addClass('changeColorGym-2');

    });

    $('.poke-gym').mouseleave(function() {

        $(this).find('.poke-gym-color').removeClass('changeColorGym');
        $(this).find('.poke-gym-color2').removeClass('changeColorGym-2');

    });




    /**for svg pan zoom**/
    $(function() {

        panZoomInstance = svgPanZoom('.main-image', {
            zoomEnabled: true,
            controlIconsEnabled: true,
            fit: true,
            center: false,
            minZoom: 1,

        });

        // zoom out
        panZoomInstance.zoom(2);
        panZoomInstance.center();
    })

    /**svg related functions end**/

    /**for selecting pokemon**/

    var selection;
    $('.select-pokemon').click(function() {
        $('#lets-go').show();
        $('.select-pokemon').removeClass("active");
        $(this).addClass('active');
        selection = $(this).index();
    });




    /**for selecting user defined pokemon**/
    var i = 1;
    var xp = 23;

    if (i == 0) {
        if (xp < 10) {
            $(".user-pokemon").attr("src", "img/pokemon1.png");
            $(".user-pokemon-battle").attr("src", "img/pokemon-1-battle.png");
            $(".user-pokemon-battle").css({
                "height": "300px",
                "width": "300px"
            });
        } else if (xp >= 10 && xp < 20) {
            $(".user-pokemon").attr("src", "img/pokemon1-2.png");
            $(".user-pokemon-battle").attr("src", "img/pokemon-1-2-battle.png");
        } else {
            $(".user-pokemon").attr("src", "img/pokemon1-3.png");
            $(".user-pokemon-battle").attr("src", "img/pokemon-1-3-battle.png");
        }
    }
    if (i == 1) {
        if (xp < 10) {
            $(".user-pokemon").attr("src", "img/pokemon2.png");
            $(".user-pokemon-battle").attr("src", "img/pokemon-2-battle.png");
        } else if (xp >= 10 && xp < 20) {
            $(".user-pokemon").attr("src", "img/pokemon2-2.png");
            $(".user-pokemon-battle").attr("src", "img/pokemon-2-2-battle.png");
        } else {
            $(".user-pokemon").attr("src", "img/pokemon2-3.png");
            $(".user-pokemon-battle").attr("src", "img/pokemon-2-3-battle.png");
        }
    }
    if (i == 2) {
        if (xp < 10) {
            $(".user-pokemon").attr("src", "img/pokemon3.png");
            $(".user-pokemon-battle").attr("src", "img/pokemon-3-battle.png");
        } else if (xp >= 10 && xp < 20) {
            $(".user-pokemon").attr("src", "img/pokemon3-2.png");
            $(".user-pokemon-battle").attr("src", "img/pokemon-3-2-battle.png");
            $(".user-pokemon-battle").css({
                "height": "300px",
                "width": "300px"
            });
        } else {
            $(".user-pokemon").attr("src", "img/pokemon3-3.png");
            $(".user-pokemon-battle").attr("src", "img/pokemon-3-3-battle.png");
        }
    }
    if (i == 3) {
        if (xp < 10) {
            $(".user-pokemon").attr("src", "img/pokemon4.png");
            $(".user-pokemon-battle").attr("src", "img/pokemon-4-battle.png");
            $(".user-pokemon-battle").css({
                "height": "150px",
                "width": "150px"
            });
        } else if (xp >= 10 && xp < 20) {
            $(".user-pokemon").attr("src", "img/pokemon4-2.png");
            $(".user-pokemon-battle").attr("src", "img/pokemon-4-2-battle.png");
        } else {
            $(".user-pokemon").attr("src", "img/pokemon4-3.png");
            $(".user-pokemon-battle").attr("src", "img/pokemon-4-3-battle.png");
            $(".user-pokemon-battle").css({
                "height": "300px",
                "width": "300px"
            });
        }
    }
    /**function for user defined pokemon ends**/



    /***for every question appearance**/

    var question = "The quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questions.\nThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questions.";

    var x;
    var y = $(".question");
    var ans = 1;

    $(".poke-stop").click(function() {
        var visited = $(this).attr('visited');
        var question;
        var data = {
          'no': $(this).attr('quest')
        }
        $.ajax({
          type:'POST',21
          url:'./display_question/',
          data:data,
          success:function(response){
              visited=parseInt(response.visited);
              question=response.question;
          }
        });
        visited = parseInt(visited) + 1;
        //
        $(this).attr('visited', visited);
        switch ($(this).attr('visited')) {
            case '1':
                $(this).find('.poke-stop-color').addClass('changeColorStop1');
                break;

            case '2':
                $(this).find('.poke-stop-color').removeClass('changeColorStop1');
                $(this).find('.poke-stop-color').addClass('changeColorStop2');
                break;

            case '3':
                $(this).find('.poke-stop-color').removeClass('changeColorStop2');
                $(this).find('.poke-stop-color').addClass('changeColorStop3');
                $(this).addClass('disabled');
                break;
        }

        $("#entry-fee").show();
        x = $(this).index();
        $(".question-text").html(question);
        $("#battle-image-1").attr("src", "img/battle" + (x + 1) + ".png");
        $("#battle-image-2").attr("src", "img/battle" + (x + 1) + ".png");
        $("#battle-image-3").attr("src", "img/battle" + (x + 1) + "-" + (x + 1) + ".png");

        y.css({
            "border": "10px solid white",
            "border-radius": "100%",
            "background": "#111"
        });
        var visits = $(this).find('.poke-stop-color').attr("visited");
        $(this).find('.poke-stop-color').attr("visited", visits + 1);
        if ((visits + 1) > 3) {
            $(this).removeClass(".question-stop");
        }
    });

    $(".poke-gym").click(function() {
        $("#entry-fee").show();
        var visited = $(this).attr('visited');
        // call to update visited
        visited = parseInt(visited) + 1;
        //
        $(this).attr('visited', visited);
        switch ($(this).attr('visited')) {
            case '1':
                $(this).find('.poke-gym-color').addClass('changeColorGym1');
                $(this).find('.poke-gym-color2').addClass('changeColorGym1-2');
                break;

            case '2':
                $(this).find('.poke-gym-color').removeClass('changeColorGym1');
                $(this).find('.poke-gym-color2').removeClass('changeColorGym1-2');
                $(this).find('.poke-gym-color').addClass('changeColorGym2');
                $(this).find('.poke-gym-color2').addClass('changeColorGym2-2');
                break;

            case '3':
                $(this).find('.poke-gym-color').removeClass('changeColorGym2');
                $(this).find('.poke-gym-color2').removeClass('changeColorGym2-2');
                $(this).find('.poke-gym-color').addClass('changeColorGym3');
                $(this).find('.poke-gym-color2').addClass('changeColorGym3-2');
                $(this).addClass('disabled');
                break;
        }
        x = $(this).index();
        x = x + 15;
        $(".question-text").html(question);
        $("#battle-image-1").attr("src", "img/battle" + (x + 1) + ".png");
        $("#battle-image-2").attr("src", "img/battle" + (x + 1) + ".png");
        $("#battle-image-3").attr("src", "img/battle" + (x + 1) + "-" + (x + 1) + ".png");
        y.css({
            "border": "10px solid white",
            "border-radius": "100%",
            "background": "#111"
        });

    });

    $(".part1 button").click(function() {
        $(".part1").hide();
        $(".part2").fadeIn();
        y.css({
            "border": "none",
            "border-radius": "0%"
        });
    });

    $(".btn-submit-answer").click(function() {
        $(".part2").hide();
        $(".part3").fadeIn();
        $('.background').hide();
        $('.background2').show();
        $('.back').hide();
        y.css({
            "background": "transparent"
        });
        $(".poke1 img").css({
            '-webkit-filter': 'none',
            'filter': 'none'
        });
        $(".poke2 img").css({
            '-webkit-filter': 'none',
            'filter': 'none'
        });
    });

    $(".close-ques-box").click(function() {
        y.fadeOut();
        $(".part2").hide();
        $('.background').fadeOut();

    });

    $(".back").click(function() {
        y.fadeOut();
        $(".part3").hide();
        $('.background2').fadeOut();
        if (ans == 1) {
            $('.progress-bar').css('width', xp * 100 / 30 + '%');
            $('#congrats').fadeIn();
            $('.progress-bar').html("XP: " + xp);

        } else {
            $('#repair').fadeIn();
            $('.question-stop').addClass('disabled');
        }
    });


    /**function for every battle appearance ends**/




    /**Controls for icons**/

    $("#open-scoreboard").click(function() {
        $("#scoreboard").show();
    });
    $("#close-board").click(function() {
        $("#scoreboard").effect("fold", "slow");
    });
    $("#open-rulebook").click(function() {
        $("#rulebook").show();
    });
    $("#close-rulebook").click(function() {
        $("#rulebook").effect("fold", "slow");
    });
    $("#open-finish-modal").click(function() {
        $("#finish").show();
    });
    $("#dont-finish").click(function() {
        $("#finish").fadeOut();
    });
    $("#close-entry-fee-modal").click(function() {
        $("#entry-fee").effect("fold", "slow");;

        $('.background').show();
        y.show();
        $(".part1").show();

    });
    $("#close-congrats-modal").click(function() {
        $("#congrats").effect("fold", "slow");
    });
    $("#close-repair-modal").click(function() {
        $("#repair").effect("fold", "slow");

    });
    $("#close-evolve-modal").click(function() {
        $("#evolve").effect("fold", "slow");
    });
    $("#open-evolve-modal").click(function() {
        $("#evolve").show();
    });

    $('.poke-center').click(function() {
        $("#pokecenter").show();
    });
    $("#close-pokecenter-modal").click(function() {
        $("#pokecenter").effect("fold", "slow");
        $('.question-stop:not([visited="3"])').removeClass('disabled');
    });


    /***controls for icons ends**/




    /**for battle**/

    $('.bub').hide();
    $('.bub1').hide();
    $(".att").click(function() {
        $('.back').show();
        if (ans == 1) {
            $(".bub")
                .fadeIn()
                .animate({
                    left: '+=450px',
                    top: '-=200px'
                })
                .fadeOut()
                .animate({
                    left: '-=450px',
                    top: '+=200px'
                });
            $('.poke2 img')
                .delay(750)
                .effect("shake");
            setTimeout(function() {
                $(".poke2 img").css({
                    '-webkit-filter': 'grayscale(100%)',
                    'filter': ' grayscale(100%)'
                });
            }, 1300);

            $(".msg").empty();
            setTimeout(function() {
                $(".msg").css({
                    'background-color': 'transparent',
                    'border-width': '2px',
                    'border-color': 'white',
                    '-moz-border-radius': '4px',
                    '-webkit-border-radius': '4px',
                    'border-radius': '4px'
                });
            }, 2000);
            $(this).delay(2000).queue(function() {
                showText(".msg", "YOU LOSE!!", 0, 25);
                $(this).dequeue();
            });


        } else {
            $(".bub1")
                .fadeIn()
                .animate({
                    left: '-=450px',
                    top: '+=200px'
                })
                .fadeOut()
                .animate({
                    left: '+=450px',
                    top: '-=200px'
                });
            $('.poke1 img')
                .delay(750)
                .effect("shake");
            setTimeout(function() {
                $(".poke1 img").css({
                    '-webkit-filter': 'grayscale(100%)',
                    'filter': ' grayscale(100%)'
                });
            }, 1300);

            $(".msg").empty();
            setTimeout(function() {
                $(".msg").css({
                    'background-color': 'transparent',
                    'border-width': '2px',
                    'border-color': 'white',
                    '-moz-border-radius': '4px',
                    '-webkit-border-radius': '4px',
                    'border-radius': '4px'
                });
            }, 2000);
            $(this).delay(2000).queue(function() {
                showText(".msg", "YOU LOSE!!", 0, 25);
                $(this).dequeue();
            });

        }
    });


    $('.poke-stop').each(function(index,ele){
      ele.setAttribute('quest',index+1);
    });


    $('#register-submit')

    var phoVal = $('#phoneno').val();
     var phoReg = /^([0-9]{10})$/;

     var phoTest = phoReg.test(phoVal);
     var emaVal = $('#userEmail').val();
     var emaReg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
     var emaTest = emaReg.test(emaVal);

     var namVal = $("#userName").val();
     var genVal = $("#userGender:checked").val();
     var emaVal = $("#userEmail").val();


});
