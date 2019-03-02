$(document).ready(function() {
  banner()
  ourConcept()
  move()
})
function banner() {
  // next
  $('.banner .controls .next').on('click',function() {
    var n 
    var bannerLength = $('.banner .bannerWrap').length - 1
    $('.banner .bannerWrap').each(function(index){
      var zIndex = $(this).css('z-index')
      if(zIndex==2){
        n = index
      }
    })
    switch(n)
      {
        case 0:
        bannerMove()
        break;
      case 1:
        bannerMove()
        break;
      case 2:
        bannerMove()
        break;
      default:
      }
      function bannerMove(){
        $('.banner .bannerWrap').css('z-index',0).removeClass('bannermove')
        $('.banner .bannerWrap:eq('+n+')').css('z-index',1)
        if(n >= bannerLength){
          $('.banner .bannerWrap:eq('+0+')').css('z-index',2).addClass('bannermove')
        }
        else {
          $('.banner .bannerWrap:eq('+n+')').next().css('z-index',2).addClass('bannermove')
        }
      }
  })

  //pre
  $('.banner .controls .prev').on('click',function() {
    var n 
    var bannerLength = $('.banner .bannerWrap').length - 1
    $('.banner .bannerWrap').each(function(index){
      var zIndex = $(this).css('z-index')
      if(zIndex==2){
        $(this).css('z-index',1)
        zIndex = 1
      }
      if(zIndex==1){
        n = index
      }
      var classs = $(this).attr('class')
      if(classs == 'bannerWrap bannermoves') {
        $('.banner .bannerWrap').css('z-index',0).removeClass('bannermoves')
        $(this).prev().css('z-index',2).addClass('bannermoves')
        $(this).prev().prev().css('z-index',1)
      }
      else{
        bannerMove()
      }
      
    })
    function bannerMove() {
      switch(n)
        {
          case 0:
          bannerMoves()
          break;
        case 1:
          bannerMoves()
          break;
        case 2:
          bannerMoves()
          break;
        default:
        }
        function bannerMoves(){
          $('.banner .bannerWrap').css('z-index',0).removeClass('bannermoves')
          $('.banner .bannerWrap:eq('+n+')').css('z-index',2).addClass('bannermoves')
          if(n <= 0){
            $('.banner .bannerWrap:eq('+bannerLength+')').css('z-index',1)
          }
          else {
            $('.banner .bannerWrap:eq('+n+')').prev().css('z-index',1)
          }
        }
    }
      
  })


}

//ourConcept
function ourConcept() {
  $('.ourConcept .pic .controls .next').on('click',function(){
    var left = $('.ourConcept .pic .list').css('left')
    $('.ourConcept .pic .list').each(function (index) {
      var left = $(this).css('left')
      var width = $(this).width()
      left = left.replace('px','')
      left = Math.round(left)
      left = left - width
      if(left < -width) {
        left = width
        $(this).css('left',left+'px').css('transition',' left 0s')
      }
      else{
        $(this).css('left',left+'px').css('transition',' left 0.5s')
      }
    })
  })
}


//全屏move
function move() {
  init()
  $('body').on('mousewheel', function(e) {
    if (e.deltaY < 0){
        init()
    }
     
  })

  //
  function init() {
    var height = $('.banner').css('height')
    height = height.replace('px','')
    var windowTop = $(window).scrollTop() + 100
    if(windowTop>=height/5) {
      $('.ourConcept .content .txtwrap span').css('margin-top','50px').css('opacity','1')
    }
    if(windowTop>=height/2) {
      $('.ourConcept .content .txtwrap p').css('margin-top','50px').css('opacity','1')
      $('.ourConcept .pic').css('bottom','0').css('opacity','1')
    }
    if(windowTop>=height) {
      $('.ourConcept .pic .controls').css('bottom','auto').css('top','50%').css('opacity','1')
    }
    //project
    projectHeight = $('.project').offset().top -height
    if(windowTop>= projectHeight + height/8) {
      $('.project .title').css('margin-top','100px').css('opacity','1')
    }
    if(windowTop>= projectHeight + height/2) {

      $('.project .pic').css('margin-top','100px').css('opacity','1')
    }
    //contact
     contactHeight = $('.contact').offset().top -height
     if(windowTop>= contactHeight + height/4) {
      $('.contact .bgcover .title').css('top','10vw').css('opacity','1')
    }
     if(windowTop>= contactHeight + height/2) {
      $('.contact .contactStyle').css('top','16vw').css('opacity','1')
    }

  }//end
    
}