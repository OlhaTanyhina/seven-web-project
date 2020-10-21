$(document).ready(function(){
    /* Fixed Header */
    let header = $("#header"),
        introH = $("#intro").innerHeight(),
        scrollOffset = $(window).scrollTop();

        checkScroll(scrollOffset);

    $(window).on("scroll", function() {

        scrollOffset = $(this).scrollTop();
        
        checkScroll(scrollOffset);
    });

    function checkScroll(scrollOffset) {
        
        if( scrollOffset >= introH ) {
            header.addClass("header--fixed");
        } else {
            header.removeClass("header--fixed");
        }
    }

    /* Smooth Scroll */
    $("[data-scroll]").on("click", function(event) {

        event.preventDefault();

        let blockId = $(this).data('scroll'),
            headerH = $("#header").innerHeight();
            blockOffset = $(blockId).offset().top - headerH;
            
        $("html, body").animate({
            scrollTop: blockOffset
        }, 500);
    });

    /* Nav-toggle */
    $('#nav-toggle').on("click", function(event) {

        event.preventDefault();
        $(this).toggleClass("active");
        $('#nav').toggleClass("active");

        $(".nav__item").click(function(){
            $('#nav').removeClass("active");
            $('#nav-toggle').removeClass("active");
        });
    });

    /* Slider */
    let position = 0;
    
    let slidesToShow = 4; //сколько елементов показываем
    let slidesToScroll = 2; //сколько проскроливаем
    
    if( window.innerWidth <= 1100 ) {
        slidesToShow = 3; //сколько елементов показываем
        slidesToScroll = 2; //сколько проскроливаем
    }

    if( window.innerWidth <= 770 ) {
        slidesToShow = 2; //сколько елементов показываем
        slidesToScroll = 2; //сколько проскроливаем
    }

    if( window.innerWidth <= 575 ) {
        slidesToShow = 1; //сколько елементов показываем
        slidesToScroll = 1; //сколько проскроливаем
    }

    const slider = $('.slider');
    const track = $('.slider__track');
    const item = $('.slider__item');
    const itemsCount = item.length;
    const btnPrev = $('.btn__prev');
    const btnNext = $('.btn__next');
    const itemWidth = slider.width() / slidesToShow;
    const movePosition = slidesToScroll * itemWidth;

    item.each(function(index, item) {
        $(item).css({
            minWidth: itemWidth,
        });
    });

    btnNext.click(function() {
        const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
        
        position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

        setPosition();
        checkBtns();
    });

    btnPrev.click(function() {
        const itemsLeft = Math.abs(position) / itemWidth;
        position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
        
        setPosition();
        checkBtns();
    });

    const setPosition = () => {
        track.css({
            transform: `translateX(${position}px)` //сдвигаем на значение movePosition
        });        
    };

    const checkBtns = () => {
        btnNext.prop('disabled', position <= -(itemsCount - slidesToShow) * itemWidth);
        btnPrev.prop('disabled', position === 0);

        if( btnNext.prop('disabled') ) {
            btnNext.addClass('btn__disabled');
        } else {
            btnNext.removeClass('btn__disabled');
        }

        if( btnPrev.prop('disabled') ) {
            btnPrev.addClass('btn__disabled');
        } else {
            btnPrev.removeClass('btn__disabled');
        }
    };

    checkBtns();

    /*Slider Clients*/
    let counter = 0;
    setInterval(function() {
        
        
        controls.get(counter).click();
        
        counter++;
        if( counter > 2 ) {
            counter = 0;
        }

    }, 3000);


    const slides = $('.slider__track--clients');

    let sectionIndex = 0;

    const controls = $('.manual-btn');

    activeButton = () => 
    {
        controls.each(function(ind){
            if( ind==sectionIndex ) {
                $(this).addClass('manual-btn--active');
            } else {
                $(this).removeClass('manual-btn--active');
            }
            
        }); 
    }

    activeButton();

    controls.each(function(index) {

        $(this).click(function(){
                    
            sectionIndex = index;
            slides.css({
                transform: `translate(` +  (-1* $('.slider__clients').width() * index)  + 'px)' //сдвигаем на значение movePosition
            });    
            
            activeButton();
        });
        
    });

    /*Filter*/
    $(function() {
        let filter = $("[data-filter]");
    
        filter.on("click", function(event) {
            event.preventDefault();
            
            let cat = $(this).data("filter");
    
            if( cat == 'all' ) {
                $("[data-cat]").removeClass("hide");
            } else {
                $("[data-cat]").each(function() {
                    let workCat = $(this).data('cat');
                    
                    if( workCat != cat ) {
                        $(this).addClass('hide');
                    } else {
                        $(this).removeClass('hide');
                    }
                });
            }
        });
    });

});

