addWhiteChoiceFigure();

function addWhiteChoiceFigure() {
    const blackPawnsId = [9,10,11,12,13,14,15,16];
    for (let pawnId of blackPawnsId) {
        const pawn = figureForId(pawnId);
        if (!pawn) continue;
        if (pawn.type == 'pawn' && pawn.y == 1) {
            gameObj.createQueen(pawn.id);
        }
    }
    const whitePawnsId = [17,18,19,20,21,22,23,24];
    for (let pawnId of whitePawnsId) {
        const pawn = figureForId(pawnId);
        if (!pawn) continue;
        if (pawn.type == 'pawn' && pawn.y == 8) { 
            gameObj.createQueen(pawn.id);
        }
    }
    shahsObj.checkWhiteShah(true);
    domEngine.makeFirstRed();
    for (let cell of document.querySelectorAll(".figure")) {
        cell.removeEventListener('click', blackChoiceFigure);
        cell.removeEventListener('click', blackChoiceBattleCell);
        cell.addEventListener('click', whiteChoiceFigure);
    }
}

function addWhiteChoiceBattleCell() {
    for (let cell of document.querySelectorAll(".figure")) {
        cell.removeEventListener('click', whiteChoiceFigure);
        cell.removeEventListener('click', blackChoiceFigure);
        cell.removeEventListener('click', blackChoiceBattleCell);
        cell.addEventListener('click', whiteChoiceBattleCell);
    }
}

function addBlackChoiceFigure() {
    const whitePawnsId = [17,18,19,20,21,22,23,24];
    for (let pawnId of whitePawnsId) {
        const pawn = figureForId(pawnId);
        if (!pawn) continue;
        if (pawn.type == 'pawn' && pawn.y == 8) { 
            gameObj.createQueen(pawn.id);
        }
    }
    const blackPawnsId = [9,10,11,12,13,14,15,16];
    for (let pawnId of blackPawnsId) {
        const pawn = figureForId(pawnId);
        if (!pawn) continue;
        if (pawn.type == 'pawn' && pawn.y == 1) {
            gameObj.createQueen(pawn.id);
        }
    }
    shahsObj.checkBlackShah(true);
    domEngine.makeSecondRed();
    for (let cell of document.querySelectorAll(".figure")) {
        cell.removeEventListener('click', whiteChoiceFigure);
        cell.removeEventListener('click', whiteChoiceBattleCell);
        cell.addEventListener('click', blackChoiceFigure);
    }
}

function addBlackChoiceBattleCell() {
    for (let cell of document.querySelectorAll(".figure")) {
        cell.removeEventListener('click', blackChoiceFigure);
        cell.removeEventListener('click', whiteChoiceFigure);
        cell.removeEventListener('click', whiteChoiceBattleCell);
        cell.addEventListener('click', blackChoiceBattleCell);
    }
}

function removeAllEvents() {
    for (let cell of document.querySelectorAll(".figure")) {
        cell.removeEventListener('click', whiteChoiceFigure);
        cell.removeEventListener('click', whiteChoiceBattleCell);
        cell.removeEventListener('click', blackChoiceFigure);
        cell.removeEventListener('click', blackChoiceBattleCell);
    }
}

// ------------------------------------------------ Логика игры

function whiteChoiceFigure() {
    console.log('Работает1');
    const whitePawnsId = [17,18,19,20,21,22,23,24];
    if (!this.children[0]) return false;
    if (this.children[0].classList[0] != 'white-team') return false;
    gameState.currentFigure = figureForId(this.children[0].id.slice(1));
    gameState.oldCell = 'c' + String(gameState.currentFigure.x) + String(gameState.currentFigure.y);
    for (let pawnId of whitePawnsId) {
        const pawn = figureForId(pawnId);
        delete pawn?.canTaked;
    }
    console.log(gameState.currentFigure);

    addWhiteChoiceBattleCell();
}

function whiteChoiceBattleCell () {
    console.log('Работает2');
    gameState.targetCell = this.classList[1];
    let alienCheck = gameMap[gameState.targetCell[2] - 1][gameState.targetCell[1] - 1] != null ? true : false;
    if (alienCheck && gameMap[gameState.targetCell[2] - 1][gameState.targetCell[1] - 1].team == 'white') {
        removeAllEvents();
        return whiteChoiceFigure.call(this);
    }


    if (gameState.currentFigure.type == 'pawn') {
        if (gameState.currentFigure.walk(gameState.targetCell) || gameState.currentFigure.kill(gameState.targetCell) || gameState.currentFigure.taking(gameState.targetCell)) {
            if (shahsObj.checkWhiteShah()) {
                gameState.currentFigure.back(gameState.oldCell);
                if (alienCheck) {
                    killed[killed.length - 1].reborn();
                }
                addWhiteChoiceFigure();
                return;
            } else {
                addBlackChoiceFigure();
            }
        }
    } else if (gameState.currentFigure.walk(gameState.targetCell)) {
        if (shahsObj.checkWhiteShah()) {
            gameState.currentFigure.walk(gameState.oldCell);
            if (alienCheck) {
                killed[killed.length - 1].reborn();
            }
            addWhiteChoiceFigure();
            return;
        } else {
            addBlackChoiceFigure();
        }
    } 
}

function blackChoiceFigure() {
    console.log('Работает3');
    const blackPawnsId = [9,10,11,12,13,14,15,16];
    if (!this.children[0]) return false;
    if (this.children[0].classList[0] != 'black-team') return false;
    gameState.currentFigure = figureForId(this.children[0].id.slice(1));
    gameState.oldCell = 'c' + String(gameState.currentFigure.x) + String(gameState.currentFigure.y);
    for (let pawnId of blackPawnsId) {
        const pawn = figureForId(pawnId);
        delete pawn?.canTaked;
    }
    console.log(gameState.currentFigure);

    addBlackChoiceBattleCell();
}

function blackChoiceBattleCell () {
    console.log('Работает4');
    gameState.targetCell = this.classList[1];
    let alienCheck = gameMap[gameState.targetCell[2] - 1][gameState.targetCell[1] - 1] != null ? true : false;
    if (alienCheck && gameMap[gameState.targetCell[2] - 1][gameState.targetCell[1] - 1].team == 'black') {
        removeAllEvents();
        return blackChoiceFigure.call(this);
    }


    if (gameState.currentFigure.type == 'pawn') {
        if (gameState.currentFigure.walk(gameState.targetCell) || gameState.currentFigure.kill(gameState.targetCell) || gameState.currentFigure.taking(gameState.targetCell)) {
            if (shahsObj.checkBlackShah()) {
                gameState.currentFigure.back(gameState.oldCell);
                if (alienCheck) {
                    killed[killed.length - 1].reborn();
                }
                addBlackChoiceFigure();
                return;
            } else {
                addWhiteChoiceFigure();
            }
        }
    } else if (gameState.currentFigure.walk(gameState.targetCell)) {
        if (shahsObj.checkBlackShah()) {
            gameState.currentFigure.walk(gameState.oldCell);
            if (alienCheck) {
                killed[killed.length - 1].reborn();
            }
            addBlackChoiceFigure();
            return;
        } else {
            addWhiteChoiceFigure();
        }
    }    
}