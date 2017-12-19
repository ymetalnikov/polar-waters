
import { Dispatcher } from '../dispatcher';

export default function gameProgress() {

    let rivalsMask = '';

    function getLengthPosition(position) {
        const length = position.length;
        return length < 5 ? '5' : length.toString();
    }

    function rivalEqual(rivalList) {
        let mask = '';

        rivalList.forEach((item) => {
            mask += getLengthPosition(item.position);
        });

        return mask;
    }

    Dispatcher.on('SET_FOOD_EATEN', function (payload) {
        const statCurrentSnake = (document.getElementsByClassName('gameStatCurrentSnake__length'))[0];

        statCurrentSnake.innerHTML = ':&nbsp;' + (payload.length + 1);
    });

    Dispatcher.on('SET_SNAKE', function (payload) {
        const divName = document.createElement('div');
        const spanLength = document.createElement('span');
        const divColor = document.createElement('div');

        divName.innerHTML = '&nbsp' + payload.name;
        divName.className = 'gameStatCurrentSnake';
        spanLength.className = 'gameStatCurrentSnake__length';
        spanLength.innerHTML = ':&nbsp;5';
        divColor.style.height = '10px';
        divColor.style.width = '10px';
        divColor.style.backgroundColor = payload.color;
        divColor.className = 'gameStatCurrentSnake__color';
        divName.appendChild(spanLength);

        const content = document.getElementById('stat-current-snake');

        content.appendChild(divColor);
        content.appendChild(divName);
    });

    Dispatcher.on('GET_RIVAL_SNAKES', function (payload) {
        const newRivalsMask = rivalEqual(payload);

        if (rivalsMask !== newRivalsMask) {
            rivalsMask = newRivalsMask;

            const content = document.getElementById('stat-rival-snakes');

            content.innerHTML = '';

            payload.forEach(function (item) {
                const wrapper = document.createElement('div');
                const divName = document.createElement('div');
                const divColor = document.createElement('div');

                divName.innerHTML = '&nbsp' + item.name + ':&nbsp;' + getLengthPosition(item.position);
                divColor.style.height = '10px';
                divColor.style.width = '10px';
                divColor.style.backgroundColor = item.color;
                divColor.className = 'gameStatRivalSnake__color';

                wrapper.className = 'gameStatRivalSnake';
                wrapper.appendChild(divColor);
                wrapper.appendChild(divName);
                content.appendChild(wrapper);
            });
        }
    });
}