var _pieceSize = "7%,7%";
triviadata={
    baseUrl: "../../src/",
    gameName: "a chess",
	
	boardImage: "board1.png",
	boardSize: "640,640",
	helpHtml: "help.html",
	
	categories: [], 

	pieces: [
         {name: "piece", code: "circle(10, 10, 10)"},
	],
	
	addPieces : [{name: "piece", position: "58%,19%", size: "3%,5%"},
		{name: "piece", position: "29%,30%", size: "3%,5%"},
		{name: "piece", position: "49%,48%", size: "5%,9%"}],

	questions: null, 
	
	mouseCoordsToolEnabled : true,
	piecePositionsToolEnabled: true
}
