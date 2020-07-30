const DEATH_CELL = `<div style="width: 10px ; height: 10px ; background: white; border: 1px solid gray; float: left" ></div>`;
const LIVE_CELL = `<div style="width: 10px ; height: 10px ; background: black; border: 1px solid gray; float: left" ></div>`;
const D = 0;
const L = 1;
const SIZE = 20;
const LIVE_RATE = 3;
const OK_RATE = 2;

$(document).ready(function () {
    let lifeData = setupLifeData();
    drawMap(lifeData);

    setInterval(function () {
        lifeData = liveNext(lifeData);
        drawMap(lifeData);
    }, 500)
});

function setupLifeData() {
    let life = [];
    life.push([D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D]);
    life.push([D, D, D, D, D, L, D, D, D, D, D, L, D, D, D, D, D, D, D, D]);
    life.push([D, D, D, D, D, L, D, D, D, D, D, L, D, D, D, D, D, D, D, D]);
    life.push([D, D, D, D, D, L, L, D, D, D, L, L, D, D, D, D, D, D, D, D]);
    life.push([D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D]);
    life.push([D, L, L, L, D, D, L, L, D, L, L, D, D, L, L, L, D, D, D, D]);
    life.push([D, D, D, L, D, L, D, L, D, L, D, L, D, L, D, D, D, D, D, D]);
    life.push([D, D, D, D, D, L, L, D, D, D, L, L, D, D, D, D, D, D, D, D]);
    life.push([D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D]);
    life.push([D, D, D, D, D, L, L, D, D, D, L, L, D, D, D, D, D, D, D, D]);
    life.push([D, D, D, L, D, L, D, L, D, L, D, L, D, L, D, D, D, D, D, D]);
    life.push([D, L, L, L, D, D, L, L, D, L, L, D, D, L, L, L, D, D, D, D]);
    life.push([D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D]);
    life.push([D, D, D, D, D, L, L, D, D, D, L, L, D, D, D, D, D, D, D, D]);
    life.push([D, D, D, D, D, L, D, D, D, D, D, L, D, D, D, D, D, D, D, D]);
    life.push([D, D, D, D, D, L, D, D, D, D, D, L, D, D, D, D, D, D, D, D]);
    life.push([D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D]);
    life.push([D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D]);
    life.push([D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D]);
    life.push([D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D]);

    return life;
}

function drawMap(lifeData) {
    document.getElementById("demo").innerHTML = setupLife(lifeData);
}

function liveNext(oldLive) {
    let nextLive = setupLifeData();

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            let me = oldLive[i][j];
            let numberOfNeighbor = countLiveNeighbors(oldLive, i, j);
            nextLive[i][j] = isLiveCondition(me, numberOfNeighbor) ? L : D;
        }
    }
    return nextLive;
}

function setupLife(life) {
    let html = '';

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (life[i][j] === 0) {
                html += DEATH_CELL;
            } else {
                html += LIVE_CELL;
            }
        }
    }
    return html;
}

function countLiveNeighbors(oldLive, i, j) {
    let numberOfNeighbor = 0;
    let topAxis = i === 0 ? SIZE - 1 : i - 1;
    let botAxis = i === SIZE - 1 ? 0 : i + 1;
    let leftAxis = j === 0 ? SIZE - 1 : j - 1;
    let rightAxis = j === SIZE - 1 ? 0 : j + 1;

    numberOfNeighbor
        = oldLive[topAxis][leftAxis] + oldLive[topAxis][j] + oldLive[topAxis][rightAxis]
        + oldLive[i][leftAxis] + oldLive[i][rightAxis]
        + oldLive[botAxis][leftAxis] + oldLive[botAxis][j] + oldLive[botAxis][rightAxis];

    return numberOfNeighbor;
}

function isLive(me) {
    return me === L;
}

function isDeath(me) {
    return me === D;
}

function isLiveCondition(oldCell, numberOfNeighbor) {
    if (isLive(oldCell) && (numberOfNeighbor === LIVE_RATE || numberOfNeighbor === OK_RATE)) {
        return true;
    } else if (isDeath(oldCell) && numberOfNeighbor === LIVE_RATE) {
        return true;
    }
    return false;
}
