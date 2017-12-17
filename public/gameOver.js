;(function () {

    document.addEventListener('END_THE_GAME', handleGameOver);

    function handleGameOver(e) {
        const statistic = e.detail.payload.statistic;
        const isGameOver = e.detail.payload.isGameOver;
        const gameOver = document.getElementById('snake-game-over');
        // todo ${snakeName}
        const gameOverLinkHref = isGameOver ? `/select?name=` : `/game`;
        const gameOverLinkText = isGameOver ? "start new game" : "try again";

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
    }
})();