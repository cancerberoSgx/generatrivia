triviadata={
    baseUrl: "./",
    gameName: "Trivia de filosofía, 5to A.",
	"gameName-es": "A general knowledge spanish trivia game",
	"gameName-en": "Un trivia de conocimiento general en español",
	
	boardImage: "../examples/boards/trivia.png",
	boardSize: "560,560",
	helpHtml: "help.html",
	dices: {amount: 1, range: [1, 6]},
	categories: [
		{name: "Teoría del Conocimiento", color: "#e1d018"}, 
		{name: "Epistemología", color: "#2f84d7"},
		{name: "Psicología", color: "#349244"},
		{name: "Lógica", color: "#d26362"}
	], 

	pieces: [
	    {name: "normal piece", code: "circle(10, 10, 10)"},
	    {name: "point piece", code: "rect(0,0,35,35)"},
	],
	
	questions: [
		{question: "¿Según Descartes, se puede conocer a través de los sentidos?", answer: "No, los sentidos nos engañan", categoryName: "Teoría del Conocimiento"},
		{question: "¿Qué es un paradigma para Kuhn?", answer: "un conjunto de prácticas que definen una disciplina científica durante un período específico de tiempo ", categoryName: "Epistemología"},
		{question: "¿Cómo se conforma la constitución del sujeto para Lacan?", answer: "Por lo real, lo imaginario y lo simbólico.", categoryName: "Psicología"},
		{question: "¿Qué es una falacia?", answer: "Un razonamiento incorrecto que aparenta ser correcto. ", categoryName: "Lógica"},
	]
}
