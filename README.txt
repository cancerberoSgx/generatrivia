@author: sgurin

Generatrivia: define and publish your trivia game in the web.

Generatrivia is a html and javascript based application to define and generate trivia like games in web pages. The user must input the trivia board image, define trivia categories and trivia questions and answers, and generatrivia will execute the game in a web page.

So this sofware can be defined also as a trivia designer for the web.

The players are responsible for creating and moving their pieces, and controlling that others do not cheat while moving them!! This design has two main advantages:

    * the games are defined by board image and rules outside computing. This gives a lot of flexibility for game definition.
    * the computer ony replaces paper and dices, so the game experience is almost like the same as a paper made board.

Thanks to Natalia Varela and Esther Romero for their valuable ideas as high school teachers. BTW this software can be very useful for teaching purposes.

Note: Generatrivia is software, it is not an online trivia game.




How to generate your trivias:

step 0 ) copy and rename the src folder to somewhere. This place will be where your trivia game will be stored. All following steps will be working in this dir.

step 1) define your game board image. For this create or copy your image from internet. Put the image inside the trivia folder. Dimensions do not matter, the imag's aspect ratio sont chage. You can find some interesting trivia board images to use in example directory.

step 2) define your trivia data. Create a data.js file inside your trivia's dir, with your trivia's category names, questions and answers following the same format as the examples in exampls directory. The file contents must be a valid json object string. Example:
{
	"board": "board1.png",
	"categories": [
		{"name": "Science", color: "rgb(222,0,0)"}, 
		{"name": "Sports", color: "rgb(222,220,0)"},
		...
	], 
	"questions": [
		{"question": "lkasjdl kaljs dk?", "answer": "1234", categoryName: "Science"},
		{"question": "jdjuuut tu sdjjd?", "answer": "Laksjd gg", categoryName: "Science"}, 
		{"question": "la lskjdh  shhs dk?", "answer": "33", categoryName: "Sports"}, 
		{"question": "Llks j sldj jd?", "answer": "sdf tms.", categoryName: "Sports"},  
		.....
	] 
}

step 3) If the data is valid, your trivia is ready!! Simply open generatrivia.html in your browser for start playing.




How to play a trivia:

The only thing you must do before start playing the trivia is to create the pieces, one for each player. For creating a trivia piece, first
select the desired piece shape and color and then click on "Create piece". This will show a new piece in the board that user can drag and drop with the mouse for moving it.
When you are ready crating all the necessary pieces, click on "start playing". 

At this point, each player, will have to perform the following tasks in its turn:

1) click on the "roll the dice" button
2) move its piece accordingly the dice
3) questions for each category will be shown. 
4) the user must answer the category accordingly to its piece box current color.
5) for seeing the answer to that particularly color, click on the question, the answer will be shown.
6) if the answer was correct, the player can roll the dice again. If anser was incorrect, the next player turn begins.

Note: How/Where on the board begins and ends, it's up to the players and the given board. 
