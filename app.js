document.addEventListener("DOMContentLoaded",() => {
    const gridDisplay = document.querySelector(".game-grid");
    const scoreDisplay = document.getElementById("game-score");
    // const resultDisplay = document.getElementById("game-result");
    const size = 4;
    let squares = [];

    createBoard = () => {
        [...Array(size*size).keys()].forEach(x => {
            let square = document.createElement("div");            
            square.innerHTML = "0";
            gridDisplay.appendChild(square)
            squares.push(square)
        })
        getNextNumber();
        getNextNumber();
    }

    getNextNumber = () => {
        let position = Math.floor(Math.random() * squares.length)
        if (squares[position].innerHTML == "0"){
            squares[position].innerHTML = 2;
        }else
            getNextNumber();
    }    

    createBoard();    

    // Swipe right
    swipeHorizontal = (side) => {        
        for (let i = 0; i < squares.length; i+=size){                        
            let row = [parseInt(squares[i].innerHTML), parseInt(squares[i+1].innerHTML), parseInt(squares[i+2].innerHTML), parseInt(squares[i+3].innerHTML)]            
            let filled = row.filter(n => n)
            let swipedRow = side == "right" ? Array(size-filled.length).fill(0).concat(filled) : filled.concat(Array(size-filled.length).fill(0))            
            squares[i].innerHTML=swipedRow[0]
            squares[i+1].innerHTML=swipedRow[1]
            squares[i+2].innerHTML=swipedRow[2]
            squares[i+3].innerHTML=swipedRow[3]
        }
    }

    swipeVertical = (side) => {        
        for (let i = 0; i < size; i++){  
            let row = [parseInt(squares[i].innerHTML), parseInt(squares[i + size].innerHTML), parseInt(squares[i+(2*size)].innerHTML), parseInt(squares[i+(3*size)].innerHTML)]            
            let filled = row.filter(n => n)
            let swipedRow = side == "down" ? Array(size-filled.length).fill(0).concat(filled) : filled.concat(Array(size-filled.length).fill(0))            
            squares[i].innerHTML=swipedRow[0]
            squares[i+size].innerHTML=swipedRow[1]
            squares[i+(2*size)].innerHTML=swipedRow[2]
            squares[i+(3*size)].innerHTML=swipedRow[3]
        }
    }

    combineRows = (side) => {
        for (let i = 0; i < squares.length; i+=size){
            if (side === "right"){                      
                for (let j = size-1; j > 0; j--){                    
                    if (squares[i+j].innerHTML === squares[i+j-1].innerHTML && squares[i+j].innerHTML !== "0"){                        
                        let value = parseInt(squares[i+j].innerHTML)
                        squares[i+j].innerHTML = value * 2
                        squares[i+j-1].innerHTML = 0
                        updateScore(value*2)
                    }
                }                
            }else{
                for (let j = 0; j < size-1; j++){
                    if (squares[i+j].innerHTML === squares[i+j+1].innerHTML && squares[i+j].innerHTML !== "0"){
                        let value = parseInt(squares[i+j].innerHTML)
                        squares[i+j].innerHTML = value * 2
                        squares[i+j+1].innerHTML = 0
                        updateScore(value*2)
                    }
                }
            }
        }
    }
  
    combineColumns = (side) => {
        for (let i = 0; i < size; i++){
            if (side === "down"){                      
                for (let j = size-1; j > 0; j--){                    
                    if (squares[i+j*size].innerHTML === squares[i+(j-1)*size].innerHTML && squares[i+j*size].innerHTML !== "0"){                        
                        let value = parseInt(squares[i+j*size].innerHTML)
                        squares[i+j*size].innerHTML = value * 2
                        squares[i+(j-1)*size].innerHTML = 0
                        updateScore(value*2)
                    }
                }                
            }else{
                for (let j = 0; j < size-1; j++){
                    if (squares[i+j*size].innerHTML === squares[i+(j+1)*size].innerHTML && squares[i+j*size].innerHTML !== "0"){
                        let value = parseInt(squares[i+j*size].innerHTML)
                        squares[i+j*size].innerHTML = value * 2
                        squares[i+(j+1)*size].innerHTML = 0
                        updateScore(value*2)
                    }
                }
            }
        }
    }

    control = (e) => {        
        if (e.keyCode == 39)
            keyPressed("right")
        else if (e.keyCode == 37)
            keyPressed("left")
        else if (e.keyCode == 38)
            verticalKeyPressed("up")
        else if (e.keyCode == 40)
            verticalKeyPressed("down")
    }

    document.addEventListener('keyup', control)

    keyPressed = (side) =>{
        swipeHorizontal(side)
        combineRows(side)
        swipeHorizontal(side)
        getNextNumber()
    }

    verticalKeyPressed = (side) =>{
        swipeVertical(side)
        combineColumns(side)
        swipeVertical(side)
        getNextNumber()
    }
    updateScore = (points) => {
        let current = parseInt(scoreDisplay.innerHTML)
        scoreDisplay.innerHTML = current + points
    }
})