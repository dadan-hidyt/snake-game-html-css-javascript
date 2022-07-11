const ukuran_block = 20;
const x = 48;
const y = 30;

let lebar_canvas = {
    w: (x * ukuran_block),
    h: (y * ukuran_block)
}

/**
 * ular
 * posisi pertama ular berada di tengah 
 * yaitu dengan membagi ukuran width dari ukuran canvas di bagi dua
 * dan ukuran height canvas d bagi dua
 */
let ular = {
    x: lebar_canvas.w / 2,
    y: lebar_canvas.h / 2
}
const background = {
    ular: 'lime',
    canvas: 'white',
    pelet: 'maroon'
}

const apel = new Image();
apel.src = 'apel.png';
const uler = new Image();
uler.src = 'ular.png';
const ekors = new Image();
ekors.src = 'ekor.png';

/**
 * posisi pelet atau makanan
 */

let pelet = [];

let canvas = _ifsu("#canvas")._elemen;
let ctx = canvas.getContext("2d");
/**
 * diraction kontrol
 */
let direction = {
    x : -1,
    y : 0, 
}
let gameOver = false;
let stop = false;
let score = 0;
let time = 0;

let keys = {
    up : "KeyW",
    down : "KeyS",
    left : "KeyA",
    right : "KeyD",
}


let nama_pemain = null;

let ekor = [];
for (let i = 0; i < 3; i++) {
    ekor.push([-100,-1000]);
    
}
function acak_pelet(pelet_key = false, banyakNyaPelet = 3) {
    if (pelet_key === false) {
        for (let i = 0; i < banyakNyaPelet; i++) {
            /**
             * posisi acak dari pelet
             */
            pelet.push([
                Math.floor(Math.random() * x) * ukuran_block,
                Math.floor(Math.random() * y) * ukuran_block,
            ]);
        }
    } else {
        pelet[pelet_key] = [
            Math.floor(Math.random() * x) * ukuran_block,
            Math.floor(Math.random() * y) * ukuran_block,
        ];
    }
}

function drawFill(background, x, y, width, height) {
    ctx.fillStyle = background;
    ctx.fillRect(x, y, width, height);
}
function drawImage(image, x, y, width,height) {
    ctx.drawImage(image,x,y);
}
function GameLoop() {
    time++;
    if(nama_pemain == null || nama_pemain == '') {
        nama_pemain = prompt("Masukan Nama Kamu: ");
        if(!nama_pemain) {
            alert("Masukan Nama dulu");
        } else {
            const game_screen = _ifsu(".game-screen")._elemen;
            game_screen.style.display = 'none';
            const game = _ifsu(".game")._elemen;
            game.style.display = 'block';
        }
    }
    if(gameOver || stop) {
        return;
    }
    pelet.forEach(function(val, k){
        if (val[0] === ular.x && val[1] === ular.y) {
            score++;
            acak_pelet(k);
            ekor.push([val[0],val[1]]);
        }
    });
    for(let i = ekor.length-1; i > 0;i--) {
        ekor[i] = ekor[i-1];
    }
    if(ekor.length) {
        ekor[0] = [ular.x, ular.y];
    }
    /**
     * draw background
     * Membuat background dari canvas
     */
    drawFill(background.canvas, 0, 0, lebar_canvas.w, lebar_canvas.h);

    /**
     * draw ular
     */
    ular.x += direction.x * ukuran_block;
    ular.y += direction.y * ukuran_block;
    drawFill(background.ular, ular.x, ular.y, 18, 18);
    /**
     * draw makanan
     */
    pelet.forEach((val) => {
        // drawFill(background.pelet, val[0], val[1], ukuran_block, ukuran_block);
        drawImage(apel,val[0], val[1],ukuran_block,ukuran_block);
    });
    ekor.forEach(function(val){
        drawFill('#e84539', val[0], val[1], 18, 18);
      //  drawImage(ekors,val[0], val[1],ukuran_block,ukuran_block);

    });
    updateScoreTerbesar(score, nama_pemain);
    if (ular.x < 0 || ular.x > lebar_canvas.w-10 || ular.y < 0 || ular.y > lebar_canvas.h-10) {
        showGameOver()
        gameOver = true;
    }
    ekor.forEach(function(e){
        if(ular.x === e[0] && ular.y === e[1]){
            showGameOver();
            gameOver = true;
        }
    })
    _ifsu('#countScore')._elemen.innerText = score;
    _ifsu('#countTime')._elemen.innerText = time;
    _ifsu('#hight')._elemen.innerText = dataptkanScoreTerbesar().skore;
    _ifsu('#nama')._elemen.innerText = dataptkanScoreTerbesar().nama;

}
function updateScoreTerbesar(score, nama) {
    scoreTerbesar = window.localStorage.getItem("high");
    let skore = {
        nama : nama,
        skore : score,
    };
    if(scoreTerbesar == null) {
        window.localStorage.setItem('high', JSON.stringify(skore));
    }
    if (score > JSON.parse(scoreTerbesar).skore) {
        window.localStorage.setItem('high', JSON.stringify(skore));
    }
}

function showGameOver() 
{
    $skor = dataptkanScoreTerbesar();
    
    Swal.fire({
        icon: 'error',
        title: 'Game Over',
        html: `<p style='text-align:left'>
            Nama: ${nama_pemain}
            <br>
            Skor : ${score}
            <br>
            Time: ${time}
            <br>
            <br>
            Skor Tertinggi: ${$skor.skore} - Oleh: ${$skor.nama}
        </p>`,
        confirmButtonText: 'Restart Game',
    }).then(result=>{
          if(result.isConfirmed) {
            window.location.reload();
          }
      }); 
      
     
}

function dataptkanScoreTerbesar() {
    return JSON.parse(window.localStorage.getItem("high"));
}

function kontrol(key) {
    const code = key.code;
    if(code === keys.up && direction.y != 1) {
        direction.y = -1;
        direction.x = 0;
    } else if(code === keys.down && direction.y != -1) {
        direction.y = 1;
        direction.x = 0;
    } else if(code === keys.left && direction.x != 1) {
        direction.y = 0;
        direction.x = -1;
    }  else if(code === keys.right && direction.x != -1) {
        direction.y = 0;
        direction.x = 1;
    } 
} 
_ifsu("#StopButton").hilangkan();
_ifsu("#ResumeButton").hilangkan();
window.onload = function () {
    canvas.width = lebar_canvas.w;
    canvas.height = lebar_canvas.h;
    acak_pelet();
    document.onkeydown = kontrol;
    _ifsu("#StartButton").di('click', function(){
        _ifsu('#StartButton').hilangkan();
        _ifsu("#StopButton").tampilkan();
        setInterval(GameLoop, 1000 / 10);
    });
    _ifsu("#StopButton").di('click', function(){
        _ifsu("#StopButton").hilangkan();
        _ifsu("#ResumeButton").tampilkan();
        stop = true;
    });
    _ifsu("#ResumeButton").di('click', function(){
        _ifsu("#StopButton").tampilkan();
        _ifsu("#ResumeButton").hilangkan();
        stop = false;
    });

}
