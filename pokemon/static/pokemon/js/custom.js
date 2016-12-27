    $(document).ready(function() {
  var poke_type_call;


  var user = {}
  var i = 1;
  var xp = 23;
  var evolution_state = 1;
  var correct_ans;

  function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = jQuery.trim(cookies[i]);
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) == (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }
  var csrftoken = getCookie('csrftoken');

    // initial page data
    function initialData(){
      $.ajax({
          type:'GET',
          url: './get_details',
          success:function(response){
            if(response.status==2){
              $('.fa-sign-out').click();
            }
            $('.question-stop').addClass('disabled');
            user = response;
            for(var index=0;index<response.correct_questions.length;index+=2){
              // console.log(((index/2)+1));
              var $ele=$('.question-stop[quest='+((index/2)+1)+']');
              $ele.attr('visited',response.attempted_questions.charAt(index));
              $ele.attr('correct',response.correct_questions.charAt(index));
              updateColors($ele,(index<30)?'stop':'gym');
            }
            if(response.fainted==0)
              $('.question-stop:not([visited="3"]):not([correct="1"])').removeClass('disabled');
            user.attempted_questions.split(' ').map(function(visited,index){
            });
            xp=parseInt(response.xp);
            evolution_state = response.evolution_state;
            i=parseInt(response.pokemon)-1;
            $(".pokemoney").text(response.pokemoney);
            $(".xp").text(response.xp);
            $(".teamname").text(response.teamname);
            selectPokemon();
            $('#scoreboard-2').delay(100).show();
            if(response.fainted=='0'){
              $('.poke-center').addClass('disabled');
            }
            else{
              $('.poke-center').removeClass('disabled');

            }
          }
      });

    }



    initialData();

    /**svg related functions**/
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $('*[correct="0"]').tooltip({
        title: 'A battle awaits you here!',
        container: 'body'
    });
    $('*[correct="0"]').tooltip({
        title: 'Ready for even tougher battle?',
        container: 'body'
    });
    $('*[correct="1"]').tooltip({
        title: 'Already won this battle',
        container: 'body'
    });
    $('*[correct="1"]').tooltip({
        title: 'Already won this battle',
        container: 'body'
    });
    $('*[visited="3"]').tooltip({
        title: 'No more attempts left',
        container: 'body'
    });
    $('*[visited="3"]').tooltip({
        title: 'No more attempts left',
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

var win_h = $('body').height();
var win_w = $('body').width();

	var beforePan,svg_w=16;svg_h=9,initzoom=1.5;

	beforePan = function(oldPan, newPan){
    console.log(oldPan,newPan);
		var stopHorizontal = false
		, stopVertical = false
		, gutterWidth = 100
		, gutterHeight = 100
		  // Computed variables
		  , sizes = this.getSizes()
		  , leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth
		  , rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom)
		  , topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight
		  , bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom)

		  customPan = {}
		  customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
		  customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))
      console.log(customPan);
		  return customPan
		}

        panZoomInstance = svgPanZoom('.main-image', {
            panEnabled: true,
            zoomEnabled: true,
            controlIconsEnabled: true,
            fit: false,
            center: false,
            minZoom: 1,
      			maxZoom: 5,
            beforePan: beforePan
        });

        // zoom out
        panZoomInstance.zoom(2);
        panZoomInstance.center();
    })


    /**textillate based functions**/
      $(function() {
      $('.effective-text').lettering();
    $('.effective-text').textillate({
      in: {
    // set the effect name
    effect: 'fadeInLeftBig',
    delay: 200,
    loop:true
  }

    });
    $('.text-animate').textillate({
      in: {
    // set the effect name
    effect: 'rollIn',
    delay: 200,
    loop:true
  }
});

});


    /**svg related functions end**/

    /**for selecting pokemon**/

    var selection;
    $('.select-pokemon').click(function() {
        var $this=$(this);
        pokemon=$this.find('h1').text();
        var data={
          'pokemon':pokemon,
          'csrfmiddlewaretoken': csrftoken
        }
        $.ajax({
          type:'POST',
          url:'./choose',
          data:data,
          success:function(response){
            if(response.status==2){
              $('.fa-sign-out').click();
            }
            if(response.status==1){
              $('#lets-go').show();
              $('.select-pokemon').removeClass("active");
              $this.addClass('active');
            }
            else {
              alert('Try Again' + response.status+ " !!");
            }
          }
        })
        // selection = $(this).index();
    });




    /**for selecting user defined pokemon**/

    function selectPokemon(){

    if (i == 0) {
        if (xp < 4000) {
            $(".user-pokemon").attr("src", "/static/pokemon/img/pokemon1.png");
            $(".user-pokemon-battle").attr("src", "/static/pokemon/img/pokemon-1-battle.png");
            $(".user-pokemon-battle").css({
                "height": "300px",
                "width": "300px"
            });
        } else if (xp >= 4000 && xp < 8000) {
            $(".user-pokemon").attr("src", "/static/pokemon/img/pokemon1-2.png");
            $(".user-pokemon-battle").attr("src", "/static/pokemon/img/pokemon-1-2-battle.png");
        } else {
            $(".user-pokemon").attr("src", "/static/pokemon/img/pokemon1-3.png");
            $(".user-pokemon-battle").attr("src", "/static/pokemon/img/pokemon-1-3-battle.png");
        }
    }
    if (i == 1) {
        if (xp < 4000) {
            $(".user-pokemon").attr("src", "/static/pokemon/img/pokemon2.png");
            $(".user-pokemon-battle").attr("src", "/static/pokemon/img/pokemon-2-battle.png");
        } else if (xp >= 4000 && xp < 8000) {
            $(".user-pokemon").attr("src", "/static/pokemon/img/pokemon2-2.png");
            $(".user-pokemon-battle").attr("src", "/static/pokemon/img/pokemon-2-2-battle.png");
        } else {
            $(".user-pokemon").attr("src", "/static/pokemon/img/pokemon2-3.png");
            $(".user-pokemon-battle").attr("src", "/static/pokemon/img/pokemon-2-3-battle.png");
        }
    }
    if (i == 2) {
        if (xp < 4000) {
            $(".user-pokemon").attr("src", "/static/pokemon/img/pokemon3.png");
            $(".user-pokemon-battle").attr("src", "/static/pokemon/img/pokemon-3-battle.png");
        } else if (xp >= 4000 && xp < 8000) {
            $(".user-pokemon").attr("src", "/static/pokemon/img/pokemon3-2.png");
            $(".user-pokemon-battle").attr("src", "/static/pokemon/img/pokemon-3-2-battle.png");
            $(".user-pokemon-battle").css({
                "height": "300px",
                "width": "300px"
            });
        } else {
            $(".user-pokemon").attr("src", "/static/pokemon/img/pokemon3-3.png");
            $(".user-pokemon-battle").attr("src", "/static/pokemon/img/pokemon-3-3-battle.png");
        }
    }
    if (i == 3) {
        if (xp < 4000) {
            $(".user-pokemon").attr("src", "/static/pokemon/img/pokemon4.png");
            $(".user-pokemon-battle").attr("src", "/static/pokemon/img/pokemon-4-battle.png");
            $(".user-pokemon-battle").css({
                "height": "150px",
                "width": "150px"
            });
        } else if (xp >= 4000 && xp < 8000) {
            $(".user-pokemon").attr("src", "/static/pokemon/img/pokemon4-2.png");
            $(".user-pokemon-battle").attr("src", "/static/pokemon/img/pokemon-4-2-battle.png");
        } else {
            $(".user-pokemon").attr("src", "/static/pokemon/img/pokemon4-3.png");
            $(".user-pokemon-battle").attr("src", "/static/pokemon/img/pokemon-4-3-battle.png");
            $(".user-pokemon-battle").css({
                "height": "300px",
                "width": "300px"
            });
        }
    }
  }


    /**function for user defined pokemon ends**/



    // console.log(csrftoken);


    /***for every question appearance**/

    var question = "The quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questions.\nThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questionsThe quiz consists of 20 multiple choice questions.";
    var pokemoney;
    var x;
    var y = $(".question");
    var ans = 1;
    var $ele;

    $(".poke-stop,.poke-gym").click(function() {
      $ele= $(this);
      if($ele.attr('quest')<=15)
        $('#questionCost').html(100);
      else {
        $('#questionCost').html(200);
      }
      $("#entry-fee").show();
    });

    $("#spend-entry-fee-modal").click(function() {
        var data = {
          'no': $ele.attr('quest'),
          'csrfmiddlewaretoken': csrftoken
        }
        console.log(data);
        $.ajax({
          type:'POST',
          url:'./display_question/',
          data:data,
          success:questionCallback
        });

    });

    function questionCallback(response){
      if(response.status==2){
        $('.fa-sign-out').click();
      }
      poke_type_call_1=response.poke_type_1;
      poke_type_call_2=response.poke_type_2;
      // $('#questionCost').html(response.amount_deducted);
      // check if status = 0 -> pokemoney over
      var type=$ele.attr('class').split(' ').pop().substring(5);
      var visited = $ele.attr('visited');
      x = $ele.attr('quest');
      question=response.question;
      pokemoney=response.pokemoney;
      visited=parseInt(response.visited);
      // visited = parseInt(response.attempted_questions.charAt(parseInt(x))) + 1;
      //

      $ele.attr('visited', visited);

      updateColors($ele,type);

      // $("#entry-fee").show();
      $(".question-text").html(question);
      $(".question-text").attr('quest',x);
      $("#battle-image-1").attr("src", "/static/pokemon/img/battle" + (x) + ".png");
      $("#battle-image-2").attr("src", "/static/pokemon/img/battle" + (x) + ".png");
      $("#battle-image-3").attr("src", "/static/pokemon/img/battle" + (x) + "-" + (x) + ".png");

      y.css({
          "border": "10px solid white",
          "border-radius": "100%",
          "background": "#111"
      });

      // var visits = $ele.find('.poke-'+type+'-color').attr("visited");
      // $ele.find('.poke-'+type+'-color').attr("visited", visits + 1);
      // if ((visits + 1) > 3) {
      //     $ele.removeClass(".question-"+type);
      // }
    }



    $(".part1 button").click(function() {
        $(".part1").hide();
        $(".part2").fadeIn();
        y.css({
            "border": "none",
            "border-radius": "0%"
        });
    });

    var no;
    $(".btn-submit-answer").click(function(ev) {
        ev.preventDefault();
        no = $(".question-text").attr('quest');
        ans = $("#answer").val();
        data = {
          'no':no,
          'answer':ans,
          'csrfmiddlewaretoken': csrftoken
        }

        $.ajax({
          type:'POST',
          url: './answer/',
          data:data,
          success : answerCallBack
        });
    });

    var evolved_flag;
    function answerCallBack(response){
      if(response.status==2){
        $('.fa-sign-out').click();
      }
      if(response.fainted=='0'){
        $('.poke-center').addClass('disabled');
      }
      else{
        $('.poke-center').removeClass('disabled');

      }
      pokemoney=response.pokemoney;
      correct_ans=false;
      evolved_flag=false;
      if(response.correct=='1'){
        correct_ans=true;
        $('.question-stop[quest='+parseInt(no)+']').attr('correct',1);
        updateColors($ele,(parseInt(no)<=15)?'stop':'gym');

      }

      xp=parseInt(response.xp);
      $(".pokemoney").text(pokemoney);
      $(".xp").text(xp);
      if(evolution_state != response.evolution_state){
        evolution_state = response.evolution_state;
        evolved_flag=true;
      }

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
    }

    $(".close-ques-box").click(function() {
        y.fadeOut();
        $.ajax({
          type:'GET',
          url:'./get_details',
          success: function(response){
            if(response.status==2){
              $('.fa-sign-out').click();
            }
            xp=parseInt(response.xp);
            $(".pokemoney").text(response.pokemoney);
          }
        });
        $(".part2").hide();
        $('.background').fadeOut();

    });

    $(".back").click(function() {
        y.fadeOut();
        $(".part3").hide();
        selectPokemon();
        $('.background2').fadeOut();

        if (correct_ans == true) {

            var width;
            switch (evolution_state) {
              case 1:
                width=xp*100/4000;
                $('.xp-update').html(4000);
                break;
              case 2:
                width=xp*100/8000;
                $('.xp-update').html(8000);
                break;
              case 3:
                width=100;
                $('.xp-update').html(xp);
              default:

            }
            $('.progress-bar').css('width',0);
            $('.progress-bar').animate({
              'width': width + '%'
            },1500);
            $('#congrats').fadeIn();
            $('.progress-bar').html("XP: " + xp);
            if(evolved_flag==true){
              $("#evolve").show();
            }
        } else {
            $('#repair').fadeIn();
            $('.question-stop').addClass('disabled');
        }
    });


    /**function for every battle appearance ends**/




    /**Controls for icons**/

    $("#open-scoreboard").click(function() {
        $.ajax({
          type:'GET',
          url:'./get_details',
          success: function(response){
            if(response.status==2){
              $('.fa-sign-out').click();
            }
            xp=parseInt(response.xp);
            i=parseInt(response.pokemon)-1;
            $(".pokemoney").text(response.pokemoney);
            $(".xp").text(response.xp);
            $(".teamname").text(response.teamname);
            selectPokemon();
            $("#scoreboard").show();
          }
        });
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
        $("#finish").effect("fold", "slow");
    });
    $("#spend-entry-fee-modal").click(function() {
        $("#entry-fee").effect("fold", "slow");

        $('.background').show();
        y.show();
        $(".part1").show();

    });
    $("#cancel-entry-fee-modal").click(function() {
      $("#entry-fee").effect("fold", "slow");

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
      $.ajax({
        type:'GET',
        url: './pokecenter/',
        data:{
          'csrfmiddlewaretoken': csrftoken
        },
        success:function(response){
          if(response.status==2){
            $('.fa-sign-out').click();
          }
          $("#pokecenter-text").html(response.amount_deducted);
          $("#pokecenter").show();
        },
        error:function(response){
          $("#pokecenter-text").html('TRY AGAIN');
          $("#pokecenter").show();
        }
      });
    });
    $("#close-pokecenter-modal").click(function() {
        $("#pokecenter").effect("fold", "slow");
        $.ajax({
          type:'POST',
          url: './pokecenter/',
          data:{
            'csrfmiddlewaretoken': csrftoken
          },
          success:function(response){
            if(response.status==2){
              $('.fa-sign-out').click();
            }
            if(response.status==1){

              $('.question-stop:not([visited="3"]):not([correct="1"])').removeClass('disabled');
              $(".pokemoney").text(response.pokemoney);
              $(".xp").text(response.xp);
              $('.poke-center').addClass('disabled');

            }
            else {
              alert('Try Again');
            }
          }
        });
    });

    $("#close-pokecenter-modal-no-money").click(function() {
        $("#pokecenter").effect("fold", "slow");
    });


    /***controls for icons ends**/




    /**for battle**/

    var attack=[
      'fire',
    	 'water',
    	 'grass',
    	'electric'
    ];

    $('.bub').hide();
    $('.bub1').hide();
    $(".att").click(function() {

      // selectPokemon();

        $('.back').show();
        if (correct_ans==true) {
          $(".bub").css('background-image',"url('/static/pokemon/img/"+attack[poke_type_call_1-1]+".png')");
            $(".bub")
                .fadeIn()
                .animate({
                  left: '520px',
                bottom: '250px'
                })
                .fadeOut()
                .animate({
                    left: '180px',
                    bottom: '120px'

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
          $(".bub1").css('background-image',"url('/static/pokemon/img/"+attack[poke_type_call_2-1]+".png')");
            $(".bub1")
                .fadeIn()
                .animate({
                  right: '530px',
                  top: '300px'
                })
                .fadeOut()
                .animate({
                  right: '200px',
                  top: '170px'
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

    $('.poke-gym').each(function(index,ele){
      ele.setAttribute('quest',index+16);
    });


    function updateColors($ele,type){
      capsType=type.charAt(0).toUpperCase()+type.slice(1);
      switch($ele.attr('visited')){
        case '0':
            break;
        case '1':
            $ele.find('.poke-'+type+'-color').addClass('changeColor'+capsType+'1');
            break;

        case '2':
            $ele.find('.poke-'+type+'-color').removeClass('changeColor'+capsType+'1');
            $ele.find('.poke-'+type+'-color').addClass('changeColor'+capsType+'2');
            break;

        default:
            $ele.find('.poke-'+type+'-color').removeClass('changeColor'+capsType+'2');
            $ele.find('.poke-'+type+'-color').addClass('changeColor'+capsType+'3');
            $ele.addClass('disabled');
            break;

      }
      if($ele.attr('correct')=='1'){
        $ele.addClass('disabled');
      }
    }

});
