const domEngine = {
    _mustTransformToPawn: [],
    replaceFigure: function(id, cellNumber) {
        const figure = document.querySelector(`#f${id}`);
        const cell = document.querySelector(`.c${cellNumber}`);

        cell.append(figure);
    },
    killFigure: function(id, whoKilled) {
        const container = document.querySelector(`.killed-figures-player${whoKilled}`);
        const figure = document.querySelector(`#f${id}`);

        container.append(figure);
    },
    restartFigures: function() {
        const defaultPositions = [18, 28, 38, 48, 58, 68, 78, 88, 17, 27, 37, 47, 57, 67, 77, 87, 12, 22, 32, 42, 52, 62, 72, 82, 11, 21, 31, 41, 51, 61, 71, 81];

        for (let id = 1; id <= 32; id++) {
            this.replaceFigure(id, defaultPositions[id - 1]);
        }

        for (let id of this._mustTransformToPawn) {
            const queen = document.querySelector(`#f${id}`);
            const src = queen.src;
            const index = src.lastIndexOf('Q');

            queen.src = src.slice(0, index) + 'P' + src.slice(index + 1);
        }

        this._mustTransformToPawn.length = 0;
    },
    createQueen: function(id) {
        const pawn = document.querySelector(`#f${id}`);
        const src = pawn.src;
        const index = src.lastIndexOf('P');

        pawn.src = src.slice(0, index) + "Q" + src.slice(index + 1);
        this._mustTransformToPawn.push(id);
    },
};