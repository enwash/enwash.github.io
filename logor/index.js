let canvas = document.getElementById("logo");
    var ctx = canvas.getContext("2d");
    let lw;
    let lh;
    let fh;
    let font = "Major Mono Display";
    let bold = true;
    let text = "TEXT";
    let bg;
    let fg;

    let redraw = function(lw, lh, fh, font, bold, text, bg, fg) {
        // width, height, font height, etc
        canvas.width = lw;
        canvas.height = lh;
        ctx.textAlign = 'center';
        if (text.length == 1) {
            fh *= .5;
        }
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, lw, lh);
        ctx.fillStyle = fg;
        ctx.font = "normal " + (bold ? "bold " : "") + (fh / text.length).toString() + "px " + font;
        ctx.fillText(text, lw / 2, lh / 2 + (fh / (text.length * 2.8)));
    }

    let redrawAll = function() {
        lw = 500; // placeholder
        lh = 500; // placeholder
        fh = 600; // placeholder
        bg = document.querySelector('#bgcolor').value;
        fg = document.querySelector('#fgcolor').value;
        font = document.querySelector('#fontselect').value;
        bold = document.querySelector('#boldselect').value == "true";
        text = document.querySelector('#textinput').value;
        redraw(lw, lh, fh, font, bold, text, bg, fg);
    }

    let downloadImage = function() {
        var link = document.createElement('a');
        link.download = text + ".png";
        link.href = canvas.toDataURL()
        link.click();
    }

    redrawAll();