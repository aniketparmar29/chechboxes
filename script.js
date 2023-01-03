(() => {
    const badhabox = document.querySelectorAll("input");
    const wrapcheck = document.querySelector(".checkboxes");
    const scorecard = document.querySelector(".score");
    const chaluscore = document.querySelector(".current");
    const tips = document.querySelector(".tips");
    const timer = document.querySelector(".timer");
    const flagPiece = document.querySelector(".flagPiece");
    const finalTime = document.querySelector(".finalTime");
    const resetButton = document.querySelector(".resetButton");
    const opend = document.querySelector(".end");
    const boostWords = [
      "હા મોજ હા!",
      "જલસો બકા!",
      "હા સવાજ!",
      "મોજે દરિયા!",
      "હાકલા!",
      "બવ સારૂ!",
      "ખમાં!",
      "હા ભાઈ હા!",
    ];
  
    resetButton.addEventListener("click", reset);
  
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  
    let animationFrame;
    let startTime;
  
    let myindex = 0;
  
    function startTimer() {
      startTime = Date.now();
      animationFrame = window.requestAnimationFrame(tick);
    }
  
    function msToTime(duration) {
      var ms = parseInt((duration % 1000) / 10)
          .toString()
          .padStart(2, "0"),
        sec = Math.floor((duration / 1000) % 60),
        min = Math.floor((duration / (1000 * 60)) % 60),
        min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
  
      return min + ":" + sec + ":" + ms;
    }
  
    function tick() {
      var delta = Date.now() - startTime;
      timer.innerHTML = msToTime(delta);
  
      animationFrame = window.requestAnimationFrame(tick);
    }
  
    function randomPosOrNeg(number) {
      const posOrNeg = Math.random() < 0.5 ? -1 : 1;
      return Math.min(Math.random() * number, window.innerHeight - 10) * posOrNeg;
    }
  
    function reset() {
      badhabox.forEach((checkbox, index) => {
        checkbox.style.transform = "none";
        if (index !== 0) {
          checkbox.disabled = true;
        }
        checkbox.checked = false;
      });
  
      myindex = 0;
      wrapcheck.style.transform = `translateX(${-20 * myindex}px)`;
      chaluscore.innerHTML = 0;
      tips.classList.remove("hide");
      startTime = null;
      scorecard.classList.remove("show");
      timer.innerHTML = "00:00:00";
      flagPiece.style.fill = "red";
      opend.classList.remove("show");
    }
  
    function addBoost(element) {
      let verticalMovement = new DOMMatrixReadOnly(
        window.getComputedStyle(element).transform
      ).f;
  
      const opel = document.createElement("div");
      opel.classList.add("boost");
      opel.style.top = `${
        wrapcheck.clientHeight / 2 + verticalMovement - 60
      }px`;
      opel.style.left = `${element.offsetLeft}px`;
      opel.innerHTML =
        boostWords[Math.floor(Math.random() * boostWords.length)];
      wrapcheck.appendChild(opel);
    }
  
    document.body.addEventListener("click", () => {
      if (myindex === 0 || myindex === badhabox.length) return;
  
      badhabox[myindex].disabled = true;
      badhabox[myindex - 1].checked = false;
      badhabox[myindex - 1].disabled = false;
      myindex--;
      chaluscore.innerText = myindex.toString().padStart(3, "0");
      wrapcheck.style.transform = `translateX(${-20 * myindex}px)`;
    });
  
    badhabox.forEach((checkbox, index) => {
      checkbox.addEventListener("click", (event) => {
        if (!startTime) {
          startTimer();
        }
  
        if (index === myindex) {
          if (myindex === 0) {
            tips.classList.add("hide");
            scorecard.classList.add("show");
          }
  
          event.stopPropagation();
  
          if (Math.random() > 0.6) addBoost(checkbox);
  
          myindex++;
          chaluscore.innerText = myindex.toString().padStart(3, "0");
  
          if (myindex === badhabox.length) {
            flagPiece.style.fill = "#00c800";
            cancelAnimationFrame(animationFrame);
            scorecard.classList.remove("show");
  
            var delta = Date.now() - startTime;
            finalTime.innerHTML = msToTime(delta);
            opend.classList.add("show");
            return;
          }
  
          badhabox[myindex].disabled = false;
          wrapcheck.style.transform = `translateX(${-20 * myindex}px)`;
  
          badhabox[
            myindex
          ].style.transform = `translateY(${randomPosOrNeg(5 + myindex)}px)`;
        } else if (myindex === badhabox.length) {
          if (myindex === badhabox.length) {
            event.stopPropagation();
            event.preventDefault();
          }
        }
      });
    });
  })();