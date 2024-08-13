let credits = 1000;
let autoSpinCount = 0;

document.getElementById('spin-button').addEventListener('click', spin);
document.getElementById('auto-spin-button').addEventListener('click', startAutoSpin);

function spin() {
    const spinButton = document.getElementById('spin-button');
    const autoSpinButton = document.getElementById('auto-spin-button');
    const slots = [];
    for (let i = 1; i <= 16; i++) {
        slots.push(document.getElementById(`slot${i}`));
    }
    const balanceDisplay = document.getElementById('balance');
    const betAmount = parseInt(document.getElementById('bet-amount').value, 10);

    const symbols = ['🍒', '🍋', '🍉', '🍇', '🍓', '🍊'];

    // Disable the spin buttons
    spinButton.disabled = true;
    autoSpinButton.disabled = true;

    // Add spinning animation
    slots.forEach(slot => {
        slot.classList.add('spin');
    });

    // Stop spinning after 1 second and set final positions
    setTimeout(() => {
        slots.forEach(slot => {
            slot.classList.remove('spin');
            slot.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        });

        credits -= betAmount;

        const symbolCounts = symbols.reduce((acc, symbol) => {
            acc[symbol] = 0;
            return acc;
        }, {});

        slots.forEach(slot => {
            symbolCounts[slot.textContent]++;
        });

        const isWinning = Object.values(symbolCounts).some(count => count >= 6);

        if (isWinning) {
            credits += betAmount * 10; // Increase the payout based on the bet amount
        }

        balanceDisplay.textContent = `Balance: ${credits}`;

        // Re-enable the spin buttons after 2 seconds
        setTimeout(() => {
            spinButton.disabled = false;
            autoSpinButton.disabled = false;
            if (autoSpinCount > 0) {
                autoSpinCount--;
                spin();
            }
        }, 2000);
    }, 1000);
}

function startAutoSpin() {
    autoSpinCount = parseInt(document.getElementById('auto-spin-count').value, 10);
    spin();
}