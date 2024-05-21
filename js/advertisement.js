document.addEventListener("DOMContentLoaded", function () {
    let modal = document.getElementById("modal");
    let closeAdvBtn = document.getElementById("closeAdv");
    let advertismentTimer = document.getElementById("advTimer");
  
    setTimeout(function() {
        modal.style.display = "block";
        startTimer();
    }, 10000);

    closeAdv.onclick = function() {
      modal.style.display = "none";
    }
  
    function startTimer() {
        let remainTime = 3; 
    
        let intervalId = setInterval(function() {
            advertismentTimer.innerHTML = "Advertisement closes in " + remainTime + " seconds.";
    
            if (remainTime <= 0) {
                clearInterval(intervalId); 
                advertismentTimer.innerHTML = "Advertisement closed.";
                closeAdvBtn.style.display = "block";
            }
    
            remainTime--;
        }, 1000); 
    } 
  });
  
  
  
