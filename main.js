(() => {
    let width = screen.width;
    let height = width / (4 / 3);

    let streaming = false;
  
    let video = null;
    let canvas = null;
    let photo = null;
    let startbutton = null;
  
    function startup() {
     
      video = document.getElementById("video");
      canvas = document.getElementById("canvas");
      photo = document.getElementById("photo");
      startbutton = document.getElementById("startbutton");
      
      
      //video.setAttribute("height", height);
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error(`An error occurred: ${err}`);
        });
  
      video.addEventListener(
        "canplay",
        (ev) => {
          if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);
  
            if (isNaN(height)) {
              height = width / (4 / 3);
            }
  
            video.setAttribute("width", width);
            video.setAttribute("height", height);
            canvas.setAttribute("width", width);
            canvas.setAttribute("height", height);
            
            streaming = true;
          }
        },
        false,
      );
  
      startbutton.addEventListener(
        "click",
        (ev) => {
          takepicture();
          ev.preventDefault();
        },
        false,
      );
    }
  
    // Fill the photo with an indication that none has been
    // captured.

    function takepicture() {
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, width, height);
      const data = canvas.toDataURL("image/png");
        const a = document.createElement('a');
        blob = dataURLtoBlob(data);
        a.href = URL.createObjectURL(blob);
        a.download = 'canvas_image.png';
        a.click();
      video.remove()
      canvas.remove()

        
    }
    function dataURLtoBlob(dataURL) {
      const parts = dataURL.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], { type: contentType });
  }
    window.addEventListener("load", startup, false);
  })();
  
