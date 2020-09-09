let data = [
  [0,1,0,0,0,1,0,0],   
  [0,0,0,0,0,0,0,0],   
  [0,0,0,0,1,0,1,0],   
  [0,1,1,0,0,0,0,0],   
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0],
  [0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1]
];


let newData = function(a){
  let rand = []
  for (let i = 0; i < a.length; i++) {
    // rand = a[i]
    // console.log(a[i])
    rand[i] = a[i].map((item)=>{
    return item = +Math.random().toFixed();
  })
  }
  return rand;
};

data = newData(data);






let main = document.querySelector('.main');
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[0].length; j++) {
    let node = document.createElement('div')
    node.className = 'node';
    node.setAttribute('data-id', ''+i+j);
    if (data[i][j] > 0) {
      node.setAttribute('data-mine', data[i][j]);
    }
    main.appendChild(node);
  }
};
//  ADDING EVENT LISTENER TO MAIN BOX

main.addEventListener('click', clicked);
function clicked(e){
  // debugger
  let row = Number(e.target.getAttribute('data-id')[0]);
  let col = Number(e.target.getAttribute('data-id')[1]);
  // e.target.classList.add('opened') 
  if (main.childNodes[row*8+col].getAttribute('data-mine') == 1) {
    ifMine(e);
    return;
  }

  let counter = checkSurrounding(row, col);
};

// CHECK FOR SURROUNDINGS OF CURRENT NODE
//SETTIMEOUT IS TO VISUALIZE WHAT IT IS CHECKING
function checkSurrounding(row, col){
  // debugger
  let numberOfMines = 0;
  setTimeout(()=>{show(row,col-1)}, 200);
  if(data[row][col-1] &&  data[row][col-1] !== undefined){
    numberOfMines++;
  }
  setTimeout(()=>{show(row,col+1)}, 400);
  if(data[row][col+1] && data[row][col+1] !== undefined){ 
    numberOfMines++;
  }
  if (data[row-1] !== undefined){
    setTimeout(()=>{show(row-1,col)}, 600);
    if(data[row-1][col] && data[row-1][col] !== undefined){ 
      numberOfMines++;
    }
    setTimeout(()=>{show(row-1,col+1)}, 900)
    if(data[row-1][col+1] && data[row-1][col+1] !== undefined){   
      numberOfMines++;
    }
    setTimeout(()=>{show(row-1,col-1)}, 1200);
    if(data[row-1][col-1] && data[row-1][col-1] !== undefined){ 
      numberOfMines++;
    }
  }
  if (data[row+1] !== undefined) {
    setTimeout(()=>{show(row+1,col+1)}, 1500);
    if( data[row+1][col+1] && data[row+1][col+1] !== undefined){ 
      numberOfMines++;
    }
    setTimeout(()=>{show(row+1,col)}, 1900);
    if( data[row+1][col] && data[row+1][col] !== undefined){ 
      numberOfMines++;
    }
    setTimeout(()=>{show(row+1,col-1)}, 2000);
    if(data[row+1][col-1] && data[row+1][col-1] !== undefined){ 
      numberOfMines++;
    }
  }
  //in case node is zero
  if (numberOfMines == 0) {
    goFurther(row,col, numberOfMines);
  }
  if(numberOfMines) {
    goFurther(row,col, numberOfMines);
    // numberOfMines;

  }
};
function show(row,col){
  if (col >= 0 && col < data[0].length) {
    main.childNodes[(row*8)+col].style.border = '1.5px solid red';
    setTimeout(()=>{main.childNodes[(row*8)+col].style.border = 'none'}, 1000);
  }

};

function goFurther(row,col, returned){
  if (returned > 0) {
    main.childNodes[(row*8)+col].classList.add('opened');
    setTimeout(()=>{main.childNodes[(row*8)+col].innerText = returned}, 1600);
  }
  else {
    main.childNodes[(row*8)+col].innerText = '';
    main.childNodes[(row*8)+col].classList.add('opened');
    isItZero(row,col);
  }
};

function opened (row,col){
  main.childNodes[(row*8)+col].classList.add('opened');
};

function isItZero(row,col) {
  // debugger
  if (data[row][col-1] !== undefined && !main.childNodes[(row*8)+col-1].classList.contains('opened')){
    opened(row,col-1);
    checkSurrounding(row,col-1);
  }
  if (data[row][col+1] !== undefined && !main.childNodes[(row*8)+col+1].classList.contains('opened')){
    opened(row,col+1);
    checkSurrounding(row,col+1);
  }
  
  if (data[row-1] !== undefined) {
    if (data[row-1][col] !== undefined && !main.childNodes[((row-1)*8)+col].classList.contains('opened')){
      opened(row-1,col);
      checkSurrounding(row-1,col);
    }

    if (data[row-1][col+1] !==undefined && main.childNodes[((row-1)*8)+col+1].classList.contains('opened')) {
      opened(row-1,col+1);
      checkSurrounding(row-1,col+1);
    }
    if (data[row-1][col-1] !==undefined && !main.childNodes[((row-1)*8)+col-1].classList.contains('opened')){
      opened(row-1,col-1);
      checkSurrounding(row-1,col-1);
    }
  }

  if (data[row+1] !== undefined) {

    if (data[row+1][col+1] !==undefined && !main.childNodes[((row+1)*8)+col+1].classList.contains('opened')){
      opened(row+1,col+1);
      checkSurrounding(row+1,col+1);
    }
    if (data[row+1][col] !==undefined && !main.childNodes[((row+1)*8)+col].classList.contains('opened')){
      opened(row+1,col);
      checkSurrounding(row+1,col);
    }
    if (data[row+1][col-1] !==undefined && !main.childNodes[((row+1)*8)+col-1].classList.contains('opened')){
      opened(row+1,col-1);
      checkSurrounding(row+1,col-1);
    }
  }
};


document.body.appendChild(document.createElement('div')).className = 'refresh';
let refresh = document.querySelector('.refresh');
let btn = document.createElement('button');
btn.className = 'btn';
btn.textContent = 'restart';
refresh.style.display = 'none';
refresh.appendChild(btn);

btn.addEventListener('click', (e)=>{
  for (let i = 0; i < data.length; i++) {
    console.log('asd')
    for (let j = 0; j < data[i].length; j++) {
      
      let current = main.childNodes[(i*8)+j];
      current.classList.remove('opened');
      current.classList.remove('bomb');
      current.classList.remove('picked');
      current.innerText = '';
      
      if (data[i][j] > 0) {
        data = newData(data);
        current.setAttribute('data-mine', data[i][j]);
      }
    }
  }
  refresh.style.display = 'none';  
});



function ifMine(e){
  e.target.classList.add('picked')
  for (let i = 0; i < main.childNodes.length; i++) {
    if (main.childNodes[i].getAttribute('data-mine') == 1) {
      main.childNodes[i].classList.add('bomb');
    }
    
  }
  refresh.style.display = 'block'  
  // setTimeout(()=>{alert('GAME OVER')}, 800)  
};
