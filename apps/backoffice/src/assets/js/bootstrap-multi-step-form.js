window.addEventListener("load", (event) => {
  var next_click=document.querySelectorAll(".next_button");
  var main_form=document.querySelectorAll(".mainn");
  var step_list = document.querySelectorAll(".progress-barr li");
  let formnumber=0;
  next_click.forEach(function(next_click_form){
      next_click_form.addEventListener('click',function(){
         formnumber++;
         updateform();
         progress_forward();
      });
  }); 
  
  var back_click=document.querySelectorAll(".back_button");
  back_click.forEach(function(back_click_form){
      back_click_form.addEventListener('click',function(){
         formnumber--;
         updateform();
         progress_backward();
      });
  });
  
  function updateform(){
      main_form.forEach(function(mainform_number){
          mainform_number.classList.remove('active');
      })
      main_form[formnumber].classList.add('active');
  } 
   
  function progress_forward(){     
      step_list[formnumber].classList.add('active');
  }  
  
  function progress_backward(){
      var form_num = formnumber+1;
      step_list[form_num].classList.remove('active');
    
  }
});


