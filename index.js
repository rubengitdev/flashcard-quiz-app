var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var InvalidUserInputError = /** @class */ (function (_super) {
    __extends(InvalidUserInputError, _super);
    function InvalidUserInputError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'InvalidUserInputError';
        Object.setPrototypeOf(_this, InvalidUserInputError.prototype);
        return _this;
    }
    return InvalidUserInputError;
}(Error));
var currentCards = [
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
var flashcard = document.getElementById('flashcard');
var question = document.getElementById('question');
var answer = document.getElementById('answer');
var deleteBtn = document.getElementById('delete-btn');
var entryForm = document.getElementById('entry-form');
var frontText = document.getElementById('front-text');
var backText = document.getElementById('back-text');
// Display FlashCard
var displayCard = function () {
    flashcard.classList.remove('flipped');
    if (currentCards.length === 0) {
        question.textContent = '';
        answer.textContent = '';
        return;
    }
    var card = currentCards[currentCards.length - 1];
    question.textContent = card.questionText;
    answer.textContent = card.questionAnswer;
};
displayCard();
// Flip FlashCard
flashcard.addEventListener('click', function () {
    flashcard.classList.add('flipped');
});
// Delete Current FlashCard
deleteBtn.addEventListener('click', function () {
    if (currentCards.length === 0) {
        return;
    }
    currentCards.pop();
    flashcard.classList.remove('flipped');
    displayCard();
});
// Add new FlashCard
entryForm.addEventListener('submit', function (event) {
    var questionText = frontText.value.trim();
    var questionAnswer = backText.value.trim();
    if (questionText === '' || questionAnswer === '') {
        throw new InvalidUserInputError('Question and answer cannot be empty');
    }
    event.preventDefault();
    currentCards.push({ questionText: questionText, questionAnswer: questionAnswer });
    flashcard.classList.remove('flipped');
    displayCard();
    frontText.value = '';
    backText.value = '';
});
