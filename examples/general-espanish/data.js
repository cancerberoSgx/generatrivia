triviadata={
    baseUrl: "../../src/",
    gameName: "A general spanish trivia game",
	"gameName-es": "A general knowledge spanish trivia game",
	"gameName-en": "Un trivia de conocimiento general en español",
	
	boardImage: "../boards/board2.png",
	boardSize: "640,630",
	helpHtml: "help.html",
	dices: {amount: 1, range: [1, 6]},
	categories: [
		{name: "Ciencia", color: "#328f49"}, 
		{name: "Deportes y tiempo libre", color: "#2983db"},
		{name: "Arte", color: "#df6b16"},
		{name: "Geografía", color: "#73361a"},
		{name: "Historia", color: "#efdf06"},
		{name: "Espectáculos", color: "#cf317b"}
	], 

	pieces: [
	    {name: "pieza normal", code: "circle(10, 10, 10)"},
	    {name: "quesito", code: "rect(0,0,35,35)"},
	],
	
	/*addPieces: [
	    {name: "quesito", amount: "1", color: "#328f49", position: "50,100"},
	    {name: "quesito", amount: "1", color: "#2983db", position: "50,100"}, 
	    {name: "quesito", amount: "1", color: "#df6b16", position: "50,100"}, 
	    {name: "quesito", amount: "1", color: "#73361a", position: "50,100"}, 
	    {name: "quesito", amount: "1", color: "#efdf06", position: "50,100"}, 
	    {name: "quesito", amount: "1", color: "#cf317b", position: "50,100"}
	],*/	
	
	questions: [
		{question: "¿Cuál es la fórmula más famosa de la teoría general de la relatividad de Eistein?", answer: "E=MC^2", categoryName: "Ciencia"},
		{question: "¿Cómo se llama la sustancia causante de que los vegetales sean verdes?", answer: "Clorofila", categoryName: "Ciencia"},
		{question: "¿Cómo se llaman las crías de la mula?", answer: "La mula no tiene crías, es estéril.", categoryName: "Ciencia"},
		{question: "¿Qué órgano segrega la hormona insulina?", answer: "El páncreas. ", categoryName: "Ciencia"},
		{question: "¿Qué es el membrillero, un árbol o un arbusto?", answer: "Un arbusto", categoryName: "Ciencia"},
		{question: "¿Que palabra designa la oposicion a una corriente electrica en un conductor?", answer: "Resistencia", categoryName: "Ciencia"},
		{question: "¿Como se denomina al toro completamente negro?", answer: "Zaino", categoryName: "Ciencia"},
		{question: "¿A qué tipo de animal pertenece el mamífero mas pequeño?", answer: "Murciélago", categoryName: "Ciencia"},
		
				
		{question: "¿Qué instrumento musical tiene nombre y forma geométricos?", answer: "El triángulo", categoryName: "Arte"},
		{question: "¿Quién escribió \"El Diario de Ana Frank\"?", answer: "Ana Frank", categoryName: "Arte"},
		{question: "¿Con qué nombre firmaba Pablo Picasso sus pinturas?", answer: "Con Picasso", categoryName: "Arte"},
		{question: "¿Qué rasgo facial no tiene la Mona Lisa?", answer: "Las cejas", categoryName: "Arte"},
		{question: "Música proviene del griego, ¿que significa?", answer: "El arte de las musas", categoryName: "Arte"},
		
		
		{question: "¿Cuál es la moneda de Suiza?", answer: "El franco suizo.", categoryName: "Geografía"},
		{question: "¿Cuál es, en extensión, el quinto país más grande del mundo?", answer: "Brasil", categoryName: "Geografía"},
		{question: "¿Cuál es el segundo idioma más hablado del mundo?", answer: "El inglés", categoryName: "Geografía"},
		{question: "¿Qué isla del Caribe tiene nombre de flor? ", answer: "Isla Margarita", categoryName: "Geografía"},
		{question: "¿Cuál es el lago más grande del mundo? ", answer: "El mar caspio", categoryName: "Geografía"},
		{question: "¿Cuál es la cascada más alta del Mundo?", answer: "El Salto del Ángel en Venezuela", categoryName: "Geografía"},
		{question: "¿Cuál es el Lago más profundo del Mundo? ", answer: "El lago baikal 1.680 metros de profundidad en Siberia, Rusia.", categoryName: "Geografía"},
		{question: "¿Cuáles países separa el Canal de San Jorge?", answer: "Gales e Irlanda", categoryName: "Geografía"},
		{question: "¿Como se llamaba anteriormente Iran?", answer: "Persia", categoryName: "Geografía"},
		
		
		{question: "¿Cuántas pirámides hay en Egipto: 10, 1.000, o 10.000?", answer: "Hay 10.000.", categoryName: "Historia"},
		{question: "¿Cuántas personas se refugiaron en el Arca de Noé?", answer: "Ocho", categoryName: "Historia"},
		{question: "¿Cuántas pirámides hay en Egipto: 10, 1.000, o 10.000?", answer: "Hay 10.000.", categoryName: "Historia"},
		{question: "¿En qué siglo nació Martín Lutero?", answer: "Siglo 15", categoryName: "Historia"},
		{question: "¿Cual era el nombre del proyecto que desemboco en el desarrollo de la bomba atomica?", answer: "Proyecto Manhattan", categoryName: "Historia"},
		{question: "¿Por quién fue fundado en 1498 la ciudad Santo Domingo, el más antiguo asentamiento europeo no habitado en el Nuevo Mundo?", answer: "Bartolomé Colón, hermano menor del almirante", categoryName: "Historia"},
		{question: "¿Que resina amarilla y fosilizada utilizaban los griegos y los romanos en joyeria??", answer: "Ambar", categoryName: "Historia"},
		
		
		{question: "¿De qué color es la pelota de hockey sobre césped?", answer: "Blanca", categoryName: "Deportes y tiempo libre"},
		{question: "¿Qué lado de los libros suele tener los números pares?", answer: "La izquierda", categoryName: "Deportes y tiempo libre"},
		{question: "¿Que grupo heroico estaba encabezado por DArtagnan?", answer: "Los Tres Mosqueteros", categoryName: "Deportes y tiempo libre"},
		{question: "¿Qué pieza representa actualmente, el “elefante” de la antigüedad?", answer: "El alfil", categoryName: "Deportes y tiempo libre"},
		{question: "¿De qué juego proviene el ajedrez, del janggi, el shōgi, el makruk o el chaturanga.?", answer: "El chaturanga", categoryName: "Deportes y tiempo libre"},
		
				
		{question: "En 2003 Arnold Schwarzenegger se transformó en gobernador, ¿de qué Estado?", answer: "California", categoryName: "Espectáculos"},
		{question: "¿Cuál es la causa y solución de todos los males de Homero Simpson?", answer: "la cerveza", categoryName: "Espectáculos"},	
		{question: "¿Cuál es el ojo defectuoso de Popeye?", answer: "El derecho.", categoryName: "Espectáculos"},
		{question: "¿Cuál es el nombre completo de Johnny Depp? ", answer: "John Christopher Depp.", categoryName: "Espectáculos"},
		{question: "¿Qué película elevó a Brad Pitt a la categoría de sex symbol?", answer: "Thelma & Louise", categoryName: "Espectáculos"},
		{question: "¿En cuál de las películas de Alfred Hitchcock un hombre cae de la Estatua de la Libertad?", answer: "Saboteadores (Saboteur) ", categoryName: "Espectáculos"},
		 
		
	]
}
