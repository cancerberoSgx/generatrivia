
triviadata={
    baseUrl: "../../src/",
    gameName: "the Ludo game",
	
	boardImage: "ludoboard1.png",
	boardSize: "440,440",
	
	dices: {amount: 1, range: [1, 6]},
	
	pieces: [
         {name: "red piece", code: "circle(10, 10, 10, 10)", 
        	 size: "25,25", color: "#ff0000"},
        	 
         {name: "blue piece", code: "circle(10, 10, 10, 10)", 
        	 size: "25,25", color: "#0000ff"},
        	 
         {name: "green piece", code: "circle(10, 20, 10, 10)", 
        	 size: "25,25", color: "#00ff00"},
        	 
         {name: "yellow piece", code: "circle(10, 20, 10, 10)", 
        	 size: "25,25", color: "#fffc00"}  
    ]
}
