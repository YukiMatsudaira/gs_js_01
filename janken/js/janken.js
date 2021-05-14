// 音を聞くボタン押したら。。。
$(function(){
  $('.btn-start').on('click',function() {
    $("#audio").get(0).play();
  })
})

// 扉を閉めたら。。。
$(function(){
  $('.door').on('click',function(){
    $('#result').html('');
    $('.monster').attr('src','');
    let door = $('.door'); 
    door.css('transform', 'translate(-50%, -50%) rotateY(0deg) skewY(0deg)');
  })
});

// クイズ開始ボタンを押したら。。。
$(function(){
  $('.btn-shuffle').on('click',function() {
    let mosstr = $('.monster').attr('src');
    
    // if ( mosstr == '' ){
      let door = $('.door'); 
      door.css('transform', 'translate(-50%, -50%) rotateY(0deg) skewY(0deg)');
  
      var ransuu = Math.floor( Math.random() *3);
      var ransuu = Math.random()*3;
      ransuu = Math.floor(ransuu);
  
      let aanswer = document.querySelector(".answer-a");
      let banswer = document.querySelector(".answer-b");
      let canswer = document.querySelector(".answer-c");
      
      if (ransuu===0) {
        aanswer.innerHTML='Alien';
        banswer.innerHTML='Robot';
        canswer.innerHTML='Monster';
        $('.monster').attr('src','img/alien.png');
        $('audio').attr('src','bgm/bgm1.mp3');
  
      } else if (ransuu===1) {
        aanswer.innerHTML='Dog';
        banswer.innerHTML='Mr.Matsu';
        canswer.innerHTML='Wolf';
        $('.monster').attr('src','img/matsu.png');
        $('audio').attr('src','bgm/bgm2.mp3');
  
      } else if (ransuu===2) {
        aanswer.innerHTML='Mozu';
        banswer.innerHTML='Snake';
        canswer.innerHTML='Frog';
        $('.monster').attr('src','img/kaeru.png');
        $('audio').attr('src','bgm/bgm3.mp3');
  
      }
    
      const audio = $('audio').attr('src');
      $("#audio").get(0).play();
    // };
  })
})

// answer-textをクリックしたら。。。
$(function(){
  
  $('.answer-text').on('click',function(e) {
    let id = $(this).attr('id');
    let str = ($('.answer-a').html());
    
    if ( str != 'QUESTION' ){

      $('#questioner').attr('src','bgm/voice2.wav');
      $("#questioner").get(0).play();
  
      let speech = new webkitSpeechRecognition();
      let result = document.getElementById('result');
      speech.start();
      result.innerHTML = 'Please Voice' 
      speech.onresult = function (e) {
        speech.stop();      
        if (e.results[0].isFinal) {
          if ( e.results[0][0].transcript == 'ファイナルアンサー'){
            let audiostr = $('audio').attr('src');
            if(id==='answer1'){
              if (audiostr === 'bgm/bgm1.mp3'){
                console.log('voice1');
                audiostr = 'ok';
              }else if (audiostr === 'bgm/bgm2.mp3'){
                console.log('voice2');
              }else if (audiostr === 'bgm/bgm3.mp3'){
                console.log('voice3');
              }
            }else if(id==='answer2'){
              if (audiostr === 'bgm/bgm1.mp3'){
                console.log('voice1');
              }else if (audiostr === 'bgm/bgm2.mp3'){
                console.log('voice2');
                audiostr = 'ok';
              }else if (audiostr === 'bgm/bgm3.mp3'){
                console.log('voice3');
              }
            }else if(id==='answer3'){
              if (audiostr === 'bgm/bgm1.mp3'){
                console.log('voice1');
              }else if (audiostr === 'bgm/bgm2.mp3'){
                console.log('voice2');
              }else if (audiostr === 'bgm/bgm3.mp3'){
                console.log('voice3');
                audiostr = 'ok';
              }
            }

            if ( audiostr === 'ok' ){
              let door = $('.door'); 
 
              door.toggleClass('open');
      
              if(door.hasClass('open')) {
                door.css('transform', 'translate(-56.5%, -50%) rotateY(85deg) skewY(-10deg)'); 
                result.innerHTML = 'Great!!';
                $('.answer-a').html('QUESTION');
                $('.answer-b').html('QUESTION');
                $('.answer-c').html('QUESTION');
                $('audio').attr('src','');
                $('#okng').attr('src','bgm/ok.mp3');
              }

            }else{
              result.innerHTML = 'Sorry...' 
              $('#okng').attr('src','bgm/ng.mp3');
            }
            $("#okng").get(0).play();
          }
        }
      }
    }
  });
})