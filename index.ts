interface FlashCard {
    questionText: string;
    questionAnswer: string;
}

class InvalidUserInputError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidUserInputError';
        Object.setPrototypeOf(this, InvalidUserInputError.prototype);
    }
}

let currentCards: FlashCard[] = [
    {
        questionText: 'What is HTML?',
        questionAnswer: 'HTML creates webpage structure.',
    },
    {
        questionText: 'What is CSS?',
        questionAnswer: 'CSS add styling to your HTML',
    },
];

// Initialize DOM element from HTML
const flashcard = document.getElementById('flashcard') as HTMLDivElement;
const question = document.getElementById('question') as HTMLDivElement;
const answer = document.getElementById('answer') as HTMLDivElement;
const deleteBtn = document.getElementById('delete-btn') as HTMLButtonElement;
const entryForm = document.getElementById('entry-form') as HTMLFormElement;
const frontText = document.getElementById('front-text') as HTMLTextAreaElement;
const backText = document.getElementById('back-text') as HTMLTextAreaElement;

// Display FlashCard
const displayCard = () => {
    flashcard.classList.remove('flipped');

    if (currentCards.length === 0) {
        question.textContent = '';
        answer.textContent = '';
        return;
    }

    const card = currentCards[currentCards.length - 1];
    question.textContent = card.questionText;
    answer.textContent = card.questionAnswer;
};

displayCard();

// Flip FlashCard
flashcard.addEventListener('click', () => {
    flashcard.classList.add('flipped');
});

// Delete Current FlashCard
deleteBtn.addEventListener('click', () => {
    if (currentCards.length === 0) {
        return;
    }

    currentCards.pop();

    flashcard.classList.remove('flipped');

    displayCard();
});

// Add new FlashCard
entryForm.addEventListener('submit', (event) => {
    const questionText = frontText.value.trim();
    const questionAnswer = backText.value.trim();

    if (questionText === '' || questionAnswer === '') {
        throw new InvalidUserInputError('Question and answer cannot be empty');
    }
    event.preventDefault();

    currentCards.push({ questionText, questionAnswer });

    flashcard.classList.remove('flipped');
    displayCard();

    frontText.value = '';
    backText.value = '';
});
