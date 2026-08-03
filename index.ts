interface FlashCard {
    questionText: string;
    questionAnswer: string;
}

class InvalidUserInputError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidUserInputError';
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

const flashcard = document.getElementById('flashcard') as HTMLDivElement;
const question = document.getElementById('question') as HTMLDivElement;
const answer = document.getElementById('answer') as HTMLDivElement;
const deleteBtn = document.getElementById('delete-btn') as HTMLButtonElement;
const entryForm = document.getElementById('entry-form') as HTMLFormElement;
const frontText = document.getElementById('front-text') as HTMLTextAreaElement;
const backText = document.getElementById('back-text') as HTMLTextAreaElement;

let currentIndex = currentCards.length - 1;

// Display FlashCard
const displayCard = () => {
    const card = currentCards[currentIndex];

    if (!card) {
        question.textContent = 'No cards';
        answer.textContent = '';
        return;
    }

    question.textContent = card.questionText;
    answer.textContent = card.questionAnswer;
    flashcard.classList.remove('flipped');
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

    currentCards.splice(currentIndex, 1);

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = currentCards.length - 1;
    }

    displayCard();
});

// Add new FlashCard
entryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const questionText = frontText.value.trim();
    const questionAnswer = backText.value.trim();

    if (questionText === '' || questionAnswer === '') {
        throw new InvalidUserInputError('Question and answer cannot be empty');
    }

    currentCards.push({ questionText, questionAnswer });

    currentIndex = currentCards.length - 1;

    displayCard();

    frontText.value = '';
    backText.value = '';
});
