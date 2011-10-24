var _pieceSize = "10%,10%";
triviadata={
    baseUrl: "../../src/",
    gameName: "a chess",
	
	boardImage: "imgs/board1.gif",
	boardSize: "640,640",
	helpHtml: "help.html",
	
	categories: [], 

	pieces: [
         {name: "black-tower", code: "image('imgs/black-tower.png', 10, 10, 74, 74)"},
         {name: "black-knight", code: "image('imgs/black-knight.png', 10, 10, 74, 74)"},
         {name: "black-bishop", code: "image('imgs/black-bishop.png', 10, 10, 74, 74)"},
         {name: "black-queen", code: "image('imgs/black-queen.png', 10, 10, 74, 74)"},
         {name: "black-king", code: "image('imgs/black-king.png', 10, 10, 74, 74)"},
         {name: "black-pawn", code: "image('imgs/black-pawn.png', 10, 10, 74, 74)"},
         
         {name: "white-tower", code: "image('imgs/white-tower.png', 10, 10, 74, 74)"},
         {name: "white-knight", code: "image('imgs/white-knight.png', 10, 10, 74, 74)"},
         {name: "white-bishop", code: "image('imgs/white-bishop.png', 10, 10, 74, 74)"},
         {name: "white-queen", code: "image('imgs/white-queen.png', 10, 10, 74, 74)"},
         {name: "white-king", code: "image('imgs/white-king.png', 10, 10, 74, 74)"},
         {name: "white-pawn", code: "image('imgs/white-pawn.png', 10, 10, 74, 74)"},
	],
	
	
	addPieces: [
        {name: "black-tower", position: "1%,1%", size: _pieceSize},
        {name: "black-knight", position: "12%,1%", size: _pieceSize},
	    {name: "black-bishop", position: "25%,1%", size: _pieceSize},
	    {name: "black-queen", position: "37%,1%", size: _pieceSize}, 	
	    {name: "black-king", position: "50%,1%", size: _pieceSize},
	    {name: "black-bishop", position: "62%,1%", size: _pieceSize},
	    {name: "black-knight", position: "75%,1%", size: _pieceSize},
	    {name: "black-tower", position: "87%,1%", size: _pieceSize},
	    
	    {name: "black-pawn", position: "1%,12%", size: _pieceSize},
	    {name: "black-pawn", position: "12%,12%", size: _pieceSize},
	    {name: "black-pawn", position: "25%,12%", size: _pieceSize},
	    {name: "black-pawn", position: "37%,12%", size: _pieceSize},
	    {name: "black-pawn", position: "50%,12%", size: _pieceSize},
	    {name: "black-pawn", position: "62%,12%", size: _pieceSize},
	    {name: "black-pawn", position: "75%,12%", size: _pieceSize},
	    {name: "black-pawn", position: "87%,12%", size: _pieceSize},
	    
	    {name: "white-tower", position: "2%,87%", size: _pieceSize},
        {name: "white-knight", position: "12%,87%", size: _pieceSize},
	    {name: "white-bishop", position: "25%,87%", size: _pieceSize},
	    {name: "white-queen", position: "37%,87%", size: _pieceSize}, 	
	    {name: "white-king", position: "50%,87%", size: _pieceSize},
	    {name: "white-bishop", position: "62%,87%", size: _pieceSize},
	    {name: "white-knight", position: "75%,87%", size: _pieceSize},
	    {name: "white-tower", position: "87%,87%", size: _pieceSize},
	    
		{name: "white-pawn", position: "1%,75%", size: _pieceSize},
	    {name: "white-pawn", position: "12%,75%", size: _pieceSize},
	    {name: "white-pawn", position: "25%,75%", size: _pieceSize},
	    {name: "white-pawn", position: "37%,75%", size: _pieceSize},
	    {name: "white-pawn", position: "50%,75%", size: _pieceSize},
	    {name: "white-pawn", position: "62%,75%", size: _pieceSize},
	    {name: "white-pawn", position: "75%,75%", size: _pieceSize},
	    {name: "white-pawn", position: "87%,75%", size: _pieceSize},
	    
	],
	
	questions: null,
	
	mouseCoordsToolEnabled : true
}
