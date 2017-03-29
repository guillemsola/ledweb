    var message = '';

    function sendMessage() {
        console.log(message);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                message = '';
                var nodes = document.getElementById("message");
                while (nodes.firstChild) {
                    nodes.removeChild(nodes.firstChild);
                }
                console.log("Message Sent!");
            }
        };
        xhttp.open("POST", "/message?m=" + message, true);
        xhttp.send();
    }

    function paintIconScreen(icon) {
        var canvas = paintIcon(icon);
        document.getElementById("message").appendChild(canvas);
    }

    function paintIconButton(icon, i) {
        var canvas = paintIcon(icon);
        canvas.onclick = buttonClick;
        canvas.id = i;
        document.getElementById("iconsList").appendChild(canvas);
    }

    function handleNewCharacter(code) {
        message += encodeURI(String.fromCharCode(code));
        paintIconScreen(icons[code]);
    }

    function myKeyPress(e) {
        var keynum;

        if (window.event) { // IE                    
            keynum = e.keyCode;
        } else if (e.which) { // Netscape/Firefox/Opera                   
            keynum = e.which;
        }

        handleNewCharacter(keynum);
    }

    function paintIcon(icon) {
        var tmpCanvas = drawTempIconHQ(icon);

        var canvas = document.createElement("canvas");
        canvas.height = tmpCanvas.height;
        canvas.width = tmpCanvas.width;
        var ctx = canvas.getContext("2d");
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-90 * Math.PI / 180);
        ctx.drawImage(tmpCanvas, -tmpCanvas.width / 2, -tmpCanvas.width / 2);
        
        return canvas;
    }

    function buttonClick(e) {
        handleNewCharacter(this.id);
    }

    function drawTempIconHQ(icon) {
        var cell = 8;
        var size = 6;
        var margin = 3;
        var canvas = document.createElement("canvas");
        canvas.height = 8*(cell);
        canvas.width = 8*(cell);
        var ctx = canvas.getContext("2d");
        
        var fullCircle = 2*Math.PI;
        var y = 0;
        icon.forEach(row => {
            var x = 0;
            var bits = String('0000000' + (row >>> 0).toString(2)).slice(-8).split('');
            bits.forEach(bit => {
                if (bit === '1') {
                    ctx.beginPath();
                    ctx.strokeStyle = "red";
                    //ctx.arc(x*cell+margin, y*cell+margin, size, 0, fullCircle);
                    ctx.rect(x*cell+margin, y*cell+margin, size, size);
                    ctx.fillStyle="red";
                    ctx.fill();
                    ctx.stroke();
                }
                x++;
            });
            y++;
        });

        return canvas;
    }