triviadata={
    baseUrl: "../../src/",
    gameName: "a chess",
	
	boardImage: "cardstable1.jpg",
	boardSize: "640,640",
	helpHtml: "help.html",	
	
//	dices: {amount: 1, range: [1, 6]},
//	pieces: [],
	
//	categories: [
//		{name: "ART AND LITERATURE", color: "#328f49"}, 
//		{name: "ENTERTAINMENT", color: "#2983db"},
//		{name: "GEOGRAPHY", color: "#df6b16"},
//		{name: "HISTORY", color: "#73361a"},
//		{name: "SPORT AND LEISURE", color: "#efdf06"},
//		{name: "SCIENCE AND NATURE", color: "#cf317b"}
//	], 
	
	
	mouseCoordsToolEnabled : true,
	piecePositionsToolEnabled: true,
	
	/** a deck is a list of cards that when clicked performs an action. 
	 * actions can be: 
	 * 
	 * shuffle (barajar)
	 * reset()
	 * deal (repartir)
	 * getFirstCards(n)
	 * getLastCards(n)
	 * etc
	 * 
	 * some of this methods get cards oput the deck, so the deck 
	 * need to kinow the position
	 * of out cards. This position, if needed, must be provided in 
	 * cardOutPosition (an array of positions)
	 * 
	 * decks is the main entry point for manipulating cards in a game. 
	 * although some cards may be outside of the deck, it contains all 
	 * game cards definition.
	 * It represents the set of cards of the game. A game contains a 
	 * list of decks, normally only one.
	 */			
	cards : {
			
//		deck : {
	
	/** cards definition must be identical to piece definition. */
		 allCards: [
		            
		     {name: "as trebol", code: "image('pokercards1/c1.png', 10, 10, 100,100)", size: "50,65", turned: true },
//{name: "as trebol", code: "image('imgs/black-tower.png', 10, 10, 74, 74)", size: "50,65", turned: true },

		     {name: "2 trebol", code: "image('pokercards1/c2.png', 10, 10, 100,100)", size: "50,65", turned: true },
		     {name: "3 trebol", code: "image('pokercards1/c3.png', 10, 10, 100,100)", size: "50,65", turned: true },
		     {name: "4 trebol", code: "image('pokercards1/c4.png', 10, 10, 100,100)", size: "50,65", turned: true },
		     {name: "5 trebol", code: "image('pokercards1/c5.png', 10, 10, 100,100)", size: "50,65", turned: true },
		     {name: "6 trebol", code: "image('pokercards1/c6.png', 10, 10, 100,100)", size: "50,65", turned: true },
		     {name: "7 trebol", code: "image('pokercards1/c7.png', 10, 10, 100,100)", size: "50,65", turned: true },
		     {name: "8 trebol", code: "image('pokercards1/c8.png', 10, 10, 100,100)", size: "50,65", turned: true },
		     {name: "9 trebol", code: "image('pokercards1/c9.png', 10, 10, 100,100)", size: "50,65", turned: true },
		     {name: "10 trebol", code: "image('pokercards1/c10.png', 10, 10, 100,100)", size: "50,65", turned: true },
		     {name: "j trebol", code: "image('pokercards1/cj.png', 10, 10, 100,100)", size: "50,65", turned: true },
		     {name: "q trebol", code: "image('pokercards1/cq.png', 10, 10, 100,100)", size: "50,65", turned: true },
		     {name: "k trebol", code: "image('pokercards1/ck.png', 10, 10, 100,100)", size: "50,65", turned: true },		     
		    
		 ],
		 /** also it has to be the identical to piece definition */
		 turnedCard: {name: "turned card", code: "image('pockercards1/turned.png', 10, 10, 100,100)", size: "50,65", turned: true },//"pockercards1/turned.png", 
		 
		 /** deck position */
		 deckPosition: "400,20", 
		 deckSize: "20,20", 
		 
//		 /** list of cards references by name currently inside this deck */
//		 currentCards: ["","",""], 
		 
		 /** deal 4 cards */
		 deal : [
		    {amount: 1, position: "20,20", turned: false, horizontal: true}, 
		  	{amount: 1, position: "20,20", turned: false},
		  	{amount: 1, position: "20,100", turned: false},
		  	{amount: 1, position: "20,200", turned: false},
		    {amount: 1, position: "20,300", turned: false}
		 ],

		 /** this array size define how many cards are getted out the deck 
		  * on the getNext(n) action. latter cards in the arrayt will be on 
		  * top of first added so you ca "pile" them. */
		 getNext : [{position: "200,20"}, {position: "210,40"}, 
		            {position: "220,60"}]
		
	}
	
//	pieces: [
//	     {name: "red piece", code: "circle(10, 10, 10, 10)", 
//        	 size: "35,35", color: "#ff0000"},
//        	 
//         {name: "blue piece", code: "circle(10, 10, 10, 10)", 
//        	 size: "35,35", color: "#0000ff"},
//        	 
//         {name: "black-tower", code: "image('../chess/imgs/black-tower.png', 10, 10, 74, 74)"},
//         {name: "black-knight", code: "image('../chess/imgs/black-knight.png', 10, 10, 74, 74)"},
//         {name: "black-bishop", code: "image('../chess/imgs/black-bishop.png', 10, 10, 74, 74)"},
//         {name: "black-queen", code: "image('../chess/imgs/black-queen.png', 10, 10, 74, 74)"},
//         {name: "black-king", code: "image('../chess/imgs/black-king.png', 10, 10, 74, 74)"},
//         {name: "black-pawn", code: "image('../chess/imgs/black-pawn.png', 10, 10, 74, 74)"},
//         
//         {name: "white-tower", code: "image('../chess/imgs/white-tower.png', 10, 10, 74, 74)"},
//         {name: "white-knight", code: "image('../chess/imgs/white-knight.png', 10, 10, 74, 74)"},
//         {name: "white-bishop", code: "image('../chess/imgs/white-bishop.png', 10, 10, 74, 74)"},
//         {name: "white-queen", code: "image('../chess/imgs/white-queen.png', 10, 10, 74, 74)"},
//         {name: "white-king", code: "image('../chess/imgs/white-king.png', 10, 10, 74, 74)"},
//         {name: "white-pawn", code: "image('../chess/imgs/white-pawn.png', 10, 10, 74, 74)"},
//      ],
//	
//addPieces : [{name: "black-tower", position: "67%,11%", size: "8%,8%", color: "black-tower"},
//{name: "black-tower", position: "17%,11%", size: "8%,8%", color: "black-tower"},
//{name: "black-bishop", position: "42%,15%", size: "8%,8%", color: "black-bishop"},
//{name: "black-bishop", position: "42%,7%", size: "8%,8%", color: "black-bishop"},
//{name: "black-bishop", position: "43%,-2%", size: "8%,8%", color: "black-bishop"},
//{name: "black-pawn", position: "18%,20%", size: "8%,8%", color: "black-pawn"},
//{name: "black-pawn", position: "9%,15%", size: "8%,8%", color: "black-pawn"},
//{name: "black-pawn", position: "58%,23%", size: "8%,8%", color: "black-pawn"},
//{name: "black-pawn", position: "50%,28%", size: "8%,8%", color: "black-pawn"},
//{name: "black-pawn", position: "25%,23%", size: "8%,8%", color: "black-pawn"},
//{name: "black-pawn", position: "35%,28%", size: "8%,8%", color: "black-pawn"},
//{name: "black-pawn", position: "42%,32%", size: "8%,8%", color: "black-pawn"},
//{name: "black-pawn", position: "66%,19%", size: "8%,8%", color: "black-pawn"},
//{name: "black-pawn", position: "75%,15%", size: "8%,8%", color: "black-pawn"},
//{name: "black-knight", position: "59%,7%", size: "8%,8%", color: "black-knight"},
//{name: "black-knight", position: "25%,7%", size: "8%,8%", color: "black-knight"},
//{name: "black-queen", position: "34%,2%", size: "8%,8%", color: "black-queen"},
//{name: "black-king", position: "50%,3%", size: "8%,8%", color: "black-king"},
//{name: "white-tower", position: "18%,69%", size: "8%,8%", color: "white-tower"},
//{name: "white-tower", position: "67%,70%", size: "8%,8%", color: "white-tower"},
//{name: "white-knight", position: "26%,74%", size: "8%,8%", color: "white-knight"},
//{name: "white-knight", position: "59%,74%", size: "8%,8%", color: "white-knight"},
//{name: "white-bishop", position: "42%,82%", size: "8%,8%", color: "white-bishop"},
//{name: "white-bishop", position: "43%,74%", size: "8%,8%", color: "white-bishop"},
//{name: "white-bishop", position: "42%,65%", size: "8%,8%", color: "white-bishop"},
//{name: "white-queen", position: "34%,78%", size: "8%,8%", color: "white-queen"},
//{name: "white-king", position: "51%,78%", size: "8%,8%", color: "white-king"},
//{name: "white-pawn", position: "75%,65%", size: "8%,8%", color: "white-pawn"},
//{name: "white-pawn", position: "67%,61%", size: "8%,8%", color: "white-pawn"},
//{name: "white-pawn", position: "59%,57%", size: "8%,8%", color: "white-pawn"},
//{name: "white-pawn", position: "51%,53%", size: "8%,8%", color: "white-pawn"},
//{name: "white-pawn", position: "42%,48%", size: "8%,8%", color: "white-pawn"},
//{name: "white-pawn", position: "34%,52%", size: "8%,8%", color: "white-pawn"},
//{name: "white-pawn", position: "26%,57%", size: "8%,8%", color: "white-pawn"},
//{name: "white-pawn", position: "17%,61%", size: "8%,8%", color: "white-pawn"},
//{name: "white-pawn", position: "9%,65%", size: "8%,8%", color: "white-pawn"}],
//
//
//	
//	
//	
//	
//	questions: [
//		{question: "What nationality was Chopin? ", answer: "(Polish)", categoryName: "ART AND LITERATURE"},
//		{question: "What's the best known artificial international language?", answer: "Esperanto", categoryName: "ART AND LITERATURE"},
//		{question: "Who lived at 221B, Baker Street, London?", answer: "Sherlock Holmes", categoryName: "ART AND LITERATURE"},
//		{question: "Who cut Van Gogh's ear?", answer: "he did", categoryName: "ART AND LITERATURE"},
//		{question: "Where did Salvador Dali live?", answer: "Figueras", categoryName: "ART AND LITERATURE"},
//		{question: "Who painted the Mona Lisa?", answer: "Da Vinci", categoryName: "ART AND LITERATURE"},
//		{question: "What Spanish artist said he would eat his wife when she died?", answer: "Dali", categoryName: "ART AND LITERATURE"},
//		{question: "Who wrote Julius Caesar, Macbeth and Hamlet?", answer: "Shakespeare", categoryName: "ART AND LITERATURE"},
//		{question: "Who wrote Lazarillo de Tormes?", answer: "anonimous", categoryName: "ART AND LITERATURE"},
//		{question: "What did the crocodile swallow in Peter Pan?", answer: "alarm clock", categoryName: "ART AND LITERATURE"},
//		{question: "Where was Lope de Vega born?", answer: "Madrid", categoryName: "ART AND LITERATURE"},
//		{question: "What are the first three words of the bible?", answer: "In the beginning", categoryName: "ART AND LITERATURE"},
//		{question: "What did the 7 dwarves do for a job?", answer: "miners", categoryName: "ART AND LITERATURE"},
//		{question: "Who painted the Sistine Chapel?", answer: "Michelangelo", categoryName: "ART AND LITERATURE"},
//		{question: "Who wrote La Colmena?", answer: "Cela", categoryName: "ART AND LITERATURE"},
//		{question: "Name a famous detective who smoked a pipe and played the violin.", answer: "Sherlock Holmes", categoryName: "ART AND LITERATURE"},
//		{question: "How many people went onto Noah's Ark?", answer: "8", categoryName: "ART AND LITERATURE"},
//		{question: "What was the name of Don Quijote's horse?", answer: "Rocinante", categoryName: "ART AND LITERATURE"},
//		{question: "Who was Robin Hood's girlfriend?", answer: "Maid Marian", categoryName: "ART AND LITERATURE"},
//		{question: "Who wrote the James Bond books?", answer: "Ian Fleming", categoryName: "ART AND LITERATURE"},
//		{question: "Who wrote Dr. Jekyll and Mr. Hyde? ", answer: "Robert Louis Stevenson", categoryName: "ART AND LITERATURE"},
//		{question: "Who said, \"I think, therefore I am\"?", answer: "Descartes", categoryName: "ART AND LITERATURE"},
//		{question: "Who wrote the Ugly Duckling?", answer: "Christian Andersen", categoryName: "ART AND LITERATURE"},
//		{question: "Where was El Greco born?", answer: "Greece", categoryName: "ART AND LITERATURE"},
//		{question: "What's the Hungarian word for pepper?", answer: "Paprika", categoryName: "ART AND LITERATURE"},
//		{question: "Which painter did the group Mecano write a song about?", answer: "Dali", categoryName: "ART AND LITERATURE"},
//		{question: "Who wrote the Satanic Verses? ", answer: "Salman Rushdie", categoryName: "ART AND LITERATURE"},
//		{question: "What was the first theatre play in Spain?", answer: "La Celestina", categoryName: "ART AND LITERATURE"},
//		{question: "What's the most important book in the Moslem religion?", answer: "Koran", categoryName: "ART AND LITERATURE"},
//		
//		
//		{question: "When was Elvis' first ever concert? ", answer: "1954", categoryName: "ENTERTAINMENT"},
//		{question: "Who sang \"My Way\"?", answer: "Frank Sinatra", categoryName: "ENTERTAINMENT"},
//		{question: "Who as the main actor in \"Cocktail\"?", answer: "Tom Cruise", categoryName: "ENTERTAINMENT"},
//		{question: "Who was the main actor in Superman 2?", answer: "Christopher Reeve", categoryName: "ENTERTAINMENT"},
//		{question: "Who did Madonna marry?", answer: "Sean Penn", categoryName: "ENTERTAINMENT"},
//		{question: "Who sang, \"I'm dreaming of a white Christmas\"?", answer: "Bing Crosby", categoryName: "ENTERTAINMENT"},
//		{question: "Name the two main actors in \"The Sting\".", answer: "Paul Newman and Robert Redford", categoryName: "ENTERTAINMENT"},
//		{question: "What year did Elvis Presley die?", answer: "1977", categoryName: "ENTERTAINMENT"},
//		{question: "What film star who was in 9 weeks is now a boxer? ", answer: "Mickey Rourke", categoryName: "ENTERTAINMENT"},
//		{question: "Who were the two main actors in \"Pretty Woman\"?", answer: "Julia Roberts and Richard Gere", categoryName: "ENTERTAINMENT"},
//		{question: "Name two actors who played James Bond", answer: "Sean Connery, George Lazenby, Timothy Dalton, Pierce Brosnan", categoryName: "ENTERTAINMENT"},
//		{question: "Who was the director of the film \"Psycho\"?", answer: "Alfred Hitchcock", categoryName: "ENTERTAINMENT"},
//		{question: "In which city is Hollywood?", answer: "Los Angeles", categoryName: "ENTERTAINMENT"},
//		{question: "Who did John Lennon marry?", answer: "Yoko Ono", categoryName: "ENTERTAINMENT"},
//		{question: "Name three of the beatles", answer: "Ringo Starr, John Lennon, Paul McCartney, George Harrison", categoryName: "ENTERTAINMENT"},
//		{question: "Which 2 actors were in \"Gone with the wind\"?", answer: "Clark Gable and Vivien Leigh", categoryName: "ENTERTAINMENT"},
//		{question: "Who wrote the song \"Johnny be good\"?", answer: "Chuck Berry", categoryName: "ENTERTAINMENT"},
//		{question: "What was the first film with sound?", answer: "the Jazz Singer", categoryName: "ENTERTAINMENT"},
//		{question: "How many oscars did Alfred Hitchcock win?", answer: "none", categoryName: "ENTERTAINMENT"},
//		{question: "Which film about Germany won most prizes in 1976?", answer: "Cabaret", categoryName: "ENTERTAINMENT"},
//		{question: "What year did the drummer of Def Lepperd loose his arm?", answer: "1984", categoryName: "ENTERTAINMENT"},
//		
//		
//		{question: "Where are the Dolomites?", answer: "Italy", categoryName: "GEOGRAPHY"},
//		{question: "What's the capital of Kenya?", answer: "Nairobi", categoryName: "GEOGRAPHY"},
//		{question: "Which is the largest ocean?", answer: "Pacific", categoryName: "GEOGRAPHY"},
//		{question: "What's the capital of Honduras?", answer: "Tegucigarpa", categoryName: "GEOGRAPHY"},
//		{question: "What's the capital of Ethiopia?", answer: "Addis Ababa", categoryName: "GEOGRAPHY"},
//		{question: "What's the capital of Ecuador?", answer: "Quito", categoryName: "GEOGRAPHY"},
//		{question: "What's the smallest country in the world?", answer: "Vatican City", categoryName: "GEOGRAPHY"},
//		{question: "What is the capital of Australia? ", answer: "Camberra", categoryName: "GEOGRAPHY"},
//		{question: "What's the largest city in India?", answer: "Bombay", categoryName: "GEOGRAPHY"},
//		{question: "How many avenues radiate from the Arc de Triomphe in Paris?", answer: "12", categoryName: "GEOGRAPHY"},
//		{question: "What's the capital of Denmark?", answer: "Copenhagen", categoryName: "GEOGRAPHY"},
//		{question: "What's the capital of Brazil?", answer: "Brasilia", categoryName: "GEOGRAPHY"},
//		{question: "Which river goes through London?", answer: "Thames", categoryName: "GEOGRAPHY"},
//		{question: "What's the highest mountain in Africa?", answer: "Kilimanjaro", categoryName: "GEOGRAPHY"},
//		{question: "What's the capital of Finland?", answer: "Helsinki", categoryName: "GEOGRAPHY"},
//		{question: "Where is Mulhacen?", answer: "Granada Spain", categoryName: "GEOGRAPHY"},
//		{question: "How many states are there in the United States of America? ", answer: "50", categoryName: "GEOGRAPHY"},
//		{question: "Which river passes through Madrid?", answer: "Manzanares", categoryName: "GEOGRAPHY"},
//		{question: "Which German city is famous for the perfume it produces?", answer: "Cologne", categoryName: "GEOGRAPHY"},
//		{question: "What's the capital of Monaco?", answer: "Monaco", categoryName: "GEOGRAPHY"},
//		{question: "Which is Britain's second largest city?", answer: "Birmingham", categoryName: "GEOGRAPHY"},
//		{question: "What is 15 metres high, 8 metres wide and 240 kilometers long?", answer: "Great Wall", categoryName: "GEOGRAPHY"},
//		{question: "What's the highest mountain in the world?", answer: "Everest", categoryName: "GEOGRAPHY"},
//		{question: "What's the capital of Scotland?", answer: "Edinburgh", categoryName: "GEOGRAPHY"},
//		{question: "Which country has the largest area: Australia, Brazil or India?", answer: "Brazil", categoryName: "GEOGRAPHY"},
//		{question: "Where are the Luxembourg Gardens?", answer: "Paris", categoryName: "GEOGRAPHY"},
//		{question: "Which mountains are between Spain and France?", answer: "Pyrenees", categoryName: "GEOGRAPHY"},
//		{question: "Which is the smallest ocean?", answer: "Artic", categoryName: "GEOGRAPHY"},
//		
//		
//		
//		{question: "How many wives did Henry the Eighth have?", answer: "6", categoryName: "HISTORY"},
//		{question: "Where was Franco born?", answer: "Teruel", categoryName: "HISTORY"},
//		{question: "When did the first man go into space?", answer: "1961", categoryName: "HISTORY"},
//		{question: "Who was the first man in space?", answer: "Gagarin", categoryName: "HISTORY"},
//		{question: "Where did the first atomic bomb explode for the first time in Japan? ", answer: "Hiroshima", categoryName: "HISTORY"},
//		{question: "Who said, \"Vini, vidi, vici\"?", answer: "Caesar", categoryName: "HISTORY"},
//		{question: "What year did Christopher Columbus go to America?", answer: "1492", categoryName: "HISTORY"},
//		{question: "Who did Lady Diana Spencer marry?", answer: "Prince Charles", categoryName: "HISTORY"},
//		{question: "Who did Prince Rainier of Monaco marry?", answer: "Grace Kelly", categoryName: "HISTORY"},
//		{question: "What year did the Spanish Civil War end?", answer: "1939", categoryName: "HISTORY"},
//		{question: "When did the First World War start?", answer: "1914", categoryName: "HISTORY"},
//		{question: "When did the Second World War end?", answer: "1945", categoryName: "HISTORY"},
//		{question: "Can Queen Elizabeth the Second vote? ", answer: "no", categoryName: "HISTORY"},
//		{question: "Who was the first president of America?", answer: "Washinton", categoryName: "HISTORY"},
//		{question: "Who did Franco designate as his successor in 1969?", answer: "Juan Carlos", categoryName: "HISTORY"},
//		{question: "How many fingers did Ann Boleyn have?", answer: "11", categoryName: "HISTORY"},
//		{question: "Who was Felipe el Hermoso's wife?", answer: "Juana la Loca", categoryName: "HISTORY"},
//		{question: "Did Neil Armstrong put his l. or his r. foot on the moon first?", answer: "Left", categoryName: "HISTORY"},
//		{question: "What year did King Juan Carlos get married?", answer: "1962", categoryName: "HISTORY"},
//		{question: "In what decade was the last execution at the Tower of London?", answer: "1940's'", categoryName: "HISTORY"},
//		{question: "When did the Americans leave Vietnam?", answer: "1973", categoryName: "HISTORY"},
//		{question: "Who was the first man on the moon?", answer: "Armstrong", categoryName: "HISTORY"},
//		{question: "What religion was Adolf Hitler?", answer: "Catholic", categoryName: "HISTORY"},
//		{question: "Where was Marco Polo's home town?", answer: "Venice", categoryName: "HISTORY"},
//		{question: "Which Italian leader was terribly afraid of the evil eye?", answer: "Mussolini", categoryName: "HISTORY"},
//		{question: "How many children has Queen Elizabeth the Second got?", answer: "4", categoryName: "HISTORY"},
//		{question: "What's the real name of Siddartha Gautama?", answer: "Buddha", categoryName: "HISTORY"},
//		{question: "What's the name of the famous big clock in London?", answer: "Big Ben", categoryName: "HISTORY"},
//		{question: "Where was Christopher Columbus born?", answer: "Genoa", categoryName: "HISTORY"},
//		{question: "When did the American Civil War end?", answer: "1865", categoryName: "HISTORY"},
//		{question: "What country gave Florida to the USA in 1891?", answer: "Spain", categoryName: "HISTORY"},
//		{question: "Who gave his name to the month of July?", answer: "Julius Caesar", categoryName: "HISTORY"},
//		{question: "What did the Montgolfier brothers invent?", answer: "the balloon", categoryName: "HISTORY"},
//		{question: "When was President Kennedy killed?", answer: "1963", categoryName: "HISTORY"},
//		{question: "What stopped in London at 3.45 on August 5th, 1975?", answer: "Big Ben", categoryName: "HISTORY"},
//		{question: "What nationality was Marco Polo?", answer: "Italian", categoryName: "HISTORY"},
//		
//		
//		{question: "Who won a gold medal for Spain in cycling in the 1992 Olympics?", answer: "Jose Manuel Moreno", categoryName: "SPORT AND LEISURE"},
//		{question: "Who is the tallest basketball player in the world?", answer: "Manute Boll - 2.31m", categoryName: "SPORT AND LEISURE"},
//		{question: "What do you use to take a cork out of a bottle? ", answer: "a corkscrew", categoryName: "SPORT AND LEISURE"},
//		{question: "What language has the most words?", answer: "English", categoryName: "SPORT AND LEISURE"},
//		{question: "What's the name of the main airport in Madrid?", answer: "Barajas", categoryName: "SPORT AND LEISURE"},
//		{question: "What money do they use in Japan?", answer: "yen", categoryName: "SPORT AND LEISURE"},
//		{question: "What year did Paquirri die?", answer: "1984 or 1985", categoryName: "SPORT AND LEISURE"},
//		{question: "Where does the American president live? ", answer: "The White House", categoryName: "SPORT AND LEISURE"},
//		{question: "What is the first letter on a typewriter?", answer: "q", categoryName: "SPORT AND LEISURE"},
//		{question: "What do the opposite sides of a dice add up to?", answer: "7", categoryName: "SPORT AND LEISURE"},
//		{question: "Which fast food restaurants were established by Ray Kroc?", answer: "mcDonalds", categoryName: "SPORT AND LEISURE"},
//		{question: "How long is a round in boxing?", answer: "3 min", categoryName: "SPORT AND LEISURE"},
//		{question: "What's the highest score in a gymnastics exercise?", answer: "10", categoryName: "SPORT AND LEISURE"},
//		{question: "What time do the pubs normally close in England?", answer: "11 oclock", categoryName: "SPORT AND LEISURE"},
//		{question: "How many months have 31 days?", answer: "7", categoryName: "SPORT AND LEISURE"},
//		{question: "How many eyes are there on a pack of 52 cards?", answer: "42", categoryName: "SPORT AND LEISURE"},
//		{question: "What is the main language in Albania?", answer: "Tosco", categoryName: "SPORT AND LEISURE"},
//		{question: "What's the fastest passenger plane in the world?", answer: "Concorde", categoryName: "SPORT AND LEISURE"},
//		{question: "What are the Sun, the Independent and the Guardian?", answer: "newspapers", categoryName: "SPORT AND LEISURE"},
//		{question: "How many coloured balls are there in billiards?", answer: "15", categoryName: "SPORT AND LEISURE"},
//		{question: "What's the longest word in Spanish?", answer: "superextraordinarissimo", categoryName: "SPORT AND LEISURE"},
//		{question: "How many players are there in a basketball team? ", answer: "5", categoryName: "SPORT AND LEISURE"},
//		{question: "Which is the most spoken language?", answer: "Chinese", categoryName: "SPORT AND LEISURE"},
//		{question: "How many lanes does an olympic swimming pool have? ", answer: "8", categoryName: "SPORT AND LEISURE"},
//		{question: "In what language does \"obrigado\" mean \"thank you\"?", answer: "Portuguese", categoryName: "SPORT AND LEISURE"},
//		{question: "How many squares are there on a chess board?", answer: "64", categoryName: "SPORT AND LEISURE"},
//		{question: "How many prongs are there on a fork?", answer: "4", categoryName: "SPORT AND LEISURE"},
//		{question: "Who starts first in chess?", answer: "white", categoryName: "SPORT AND LEISURE"},
//		{question: "How many events are there in the decathlon?", answer: "10", categoryName: "SPORT AND LEISURE"},
//		{question: "What activity other than jumping are kangaroos good at?", answer: "boxing", categoryName: "SPORT AND LEISURE"},
//		{question: "How many players are there in a volleyball team?", answer: "6", categoryName: "SPORT AND LEISURE"},
//		{question: "What are the five colours of the Olympic rings?", answer: "(r,y,g,blue black)", categoryName: "SPORT AND LEISURE"},
//		{question: "Where are the most expensive seats at a bullfight?", answer: "in the shade", categoryName: "SPORT AND LEISURE"},
//		{question: "Who named a perfume for her fashion shows on the 5th day of the month?", answer: "Chanel", categoryName: "SPORT AND LEISURE"},
//		{question: "How many dots are there on two dice?", answer: "42", categoryName: "SPORT AND LEISURE"},
//		{question: "What horoscope sign has a crab?", answer: "cancer", categoryName: "SPORT AND LEISURE"},
//		{question: "In which shop can you buy books in England?", answer: "bookshops", categoryName: "SPORT AND LEISURE"},
//		{question: "How long is the compulsory military service in England?", answer: "it doesn't exist", categoryName: "SPORT AND LEISURE"},
//		
//		
//		{question: "What does the female praying mantis do after she's made love? ", answer: "eats the male", categoryName: "SCIENCE AND NATURE"},
//		{question: "How many colours are there in a rainbow?", answer: "7", categoryName: "SCIENCE AND NATURE"},
//		{question: "How many legs has a spider got?", answer: "8", categoryName: "SCIENCE AND NATURE"},
//		{question: "What are the three primary colours?", answer: "red, blue and yellow", categoryName: "SCIENCE AND NATURE"},
//		{question: "What type of elephant has got the biggest ears?", answer: "African", categoryName: "SCIENCE AND NATURE"},
//		{question: "Who invented the electric light bulb?", answer: "Thomas Edison", categoryName: "SCIENCE AND NATURE"},
//		{question: "Who invented the telephone?", answer: "Bell", categoryName: "SCIENCE AND NATURE"},
//		{question: "Which nail grows fastest?", answer: "middle", categoryName: "SCIENCE AND NATURE"},
//		{question: "What temperature does water boil at?", answer: "100c", categoryName: "SCIENCE AND NATURE"},
//		{question: "Who discovered penicillin?", answer: "Fleming", categoryName: "SCIENCE AND NATURE"},
//		{question: "What did Joseph Priesley discover in 1774?", answer: "Oxygen", categoryName: "SCIENCE AND NATURE"},
//		{question: "Where is the smallest bone in the body?", answer: "ear", categoryName: "SCIENCE AND NATURE"},
//		{question: "Which is the only mammal that can't jump?", answer: "Elephant", categoryName: "SCIENCE AND NATURE"},
//		{question: "What does the roman numeral C represent? ", answer: "100", categoryName: "SCIENCE AND NATURE"},
//		{question: "What colour is a panda?", answer: "black and white", categoryName: "SCIENCE AND NATURE"},
//		{question: "What's the smallest type of tree in the world?", answer: "Bonsai", categoryName: "SCIENCE AND NATURE"},
//		{question: "Who invented television?", answer: "John Logie Baird", categoryName: "SCIENCE AND NATURE"},
//		{question: "Who said E=mc2", answer: "Einstein", categoryName: "SCIENCE AND NATURE"},
//		{question: "Which planet is nearest the sun?", answer: "Mercury", categoryName: "SCIENCE AND NATURE"},
//		{question: "What colours make purple?", answer: "red and blue", categoryName: "SCIENCE AND NATURE"},
//		{question: "What's the hardest rock? ", answer: "diamong", categoryName: "SCIENCE AND NATURE"},
//		{question: "How much does a litre of water weigh?", answer: "1k", categoryName: "SCIENCE AND NATURE"}
//	]
}
