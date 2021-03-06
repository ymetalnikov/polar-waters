import { Dispatcher } from '../dispatcher';

export default function gameOver() {
    Dispatcher.on('END_THE_GAME', (payload) => {
        const statistic = payload.statistic;
        const isGameOver = payload.isGameOver;
        const gameOver = document.getElementById('snake-game-over');
        // Если GameOver выбрасываем на /select иначе подключаем к игре
        const gameOverLinkHref = isGameOver ? '/select' : '/game';
        const gameOverLinkText = isGameOver ? 'start new game' : 'try again';

        gameOver.innerHTML = '';
        gameOver.className = gameOver.className + ' gameOver_show';
        gameOver.innerHTML = `
            <div>Game over</div>
            <a href="${gameOverLinkHref}">Click to ${gameOverLinkText}</a>`;

        if (isGameOver) {
            const table = document.createElement('table');

            table.className = 'gameOverTable';

            const row = document.createElement('tr');

            row.innerHTML = `
                <th>#</th>
                <th>name</th>
                <th>score</th>
            `;

            table.appendChild(row);

            statistic.forEach((snakeItem) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th>
                        <div
                            class="gameOverTableCell__color"
                            style="background-color: ${snakeItem.color}"
                        >
                        </div>
                    </th>
                    <td>${snakeItem.name}</td>
                    <td>${snakeItem.position.length}</td>`;

                table.appendChild(row);
            });

            gameOver.appendChild(table);
        }
    });
}