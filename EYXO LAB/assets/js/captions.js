function animateWords(element) {

    const body = document.querySelector("body");

    if(!body.classList.contains("acessibilidade")){
            

        const baseTempo = 70;  // Base time
        const proportionalFactor = 20;  // Fine-tuning factor for proportional timing
        const extraPausePeriod = 500;  // Extra pause time for words ending with a period
        const extraPauseComma = 300;  // Extra pause time for words ending with a comma
        const extraPauseQuestionMark = 500;  // Extra pause time for words ending with a question mark

        const originalHTML = element.innerHTML;
        const spans = [];

        element.innerHTML = '';  // Clear the element content temporarily

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalHTML;

        Array.from(tempDiv.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const words = node.textContent.split(' ');
                words.forEach((word, index) => {
                    if (word.trim()) {
                        const span = document.createElement('span');
                        span.innerText = word;
                        spans.push(span);
                        element.appendChild(span);
                        // Append a space after each word, except the last one
                        if (index < words.length - 1) {
                            element.appendChild(document.createTextNode(' '));
                        }
                    }
                });
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN') {
                spans.push(node);
                element.appendChild(node);
            }
        });

        let currentIndex = 0;
        let timeoutId;

        function highlightNextWord() {
            if (currentIndex > 0) {
                spans[currentIndex - 1].classList.remove('caption');
            }
            if (currentIndex < spans.length) {
                spans[currentIndex].classList.add('caption');
                const wordLength = spans[currentIndex].innerText.length;
                let additionalTime = 0;

                if (spans[currentIndex].innerText.endsWith('.')) {
                    additionalTime = extraPausePeriod;
                } else if (spans[currentIndex].innerText.endsWith(',')) {
                    additionalTime = extraPauseComma;
                } else if (spans[currentIndex].innerText.endsWith('?')) {
                    additionalTime = extraPauseQuestionMark;
                }

                currentIndex++;
                timeoutId = setTimeout(highlightNextWord, baseTempo + proportionalFactor * wordLength + additionalTime);
            }
        }

        highlightNextWord();

        element.addEventListener('mouseleave', () => {
            clearTimeout(timeoutId);
            spans.forEach(span => span.classList.remove('caption'));
            element.innerHTML = originalHTML;  // Restore original content structure
        });

    }

}

document.querySelectorAll('p.captions').forEach(p => {
    p.addEventListener('mouseenter', () => animateWords(p));
});


