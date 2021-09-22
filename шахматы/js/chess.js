const f1  = new CreateFigure(1),
      f2  = new CreateFigure(2), 
      f3  = new CreateFigure(3), 
      f4  = new CreateFigure(4), 
      f5  = new CreateFigure(5), 
      f6  = new CreateFigure(6), 
      f7  = new CreateFigure(7), 
      f8  = new CreateFigure(8), 
      f9  = new CreateFigure(9), 
      f10 = new CreateFigure(10), 
      f11 = new CreateFigure(11), 
      f12 = new CreateFigure(12), 
      f13 = new CreateFigure(13), 
      f14 = new CreateFigure(14), 
      f15 = new CreateFigure(15), 
      f16 = new CreateFigure(16),
      f17 = new CreateFigure(17), 
      f18 = new CreateFigure(18), 
      f19 = new CreateFigure(19), 
      f20 = new CreateFigure(20), 
      f21 = new CreateFigure(21), 
      f22 = new CreateFigure(22), 
      f23 = new CreateFigure(23), 
      f24 = new CreateFigure(24), 
      f25 = new CreateFigure(25), 
      f26 = new CreateFigure(26), 
      f27 = new CreateFigure(27), 
      f28 = new CreateFigure(28), 
      f29 = new CreateFigure(29), 
      f30 = new CreateFigure(30), 
      f31 = new CreateFigure(31), 
      f32 = new CreateFigure(32);
let f33, f34;

const gameMap = [[f1,f2,f3,f4,f5,f6,f7,f8],
                 [f9,f10,f11,f12,f13,f14,f15,f16],
                 [null,null,null,null,null,null,null,null],
                 [null,null,null,null,null,null,null,null],
                 [null,null,null,null,null,null,null,null],
                 [null,null,null,null,null,null,null,null],
                 [f17,f18,f19,f20,f21,f22,f23,f24],
                 [f25,f26,f27,f28,f29,f30,f31,f32]].reverse();

const gameState = {
    map: gameMap,
    step: 1,
    whoWalk: 'white',
    whiteShah: false,
    blackShah: false,
    currentFigure: null,
    targetCell: null,
}; 

let shahsMap = [['1','2','3','4','5','6','7','8'],
                  ['9','10','11','12','13','14','15','16'],
                  ['','','','','','','',''],
                  ['','','','','','','',''],
                  ['','','','','','','',''],
                  ['','','','','','','',''],
                  ['17','18','19','20','21','22','23','24'],
                  ['25','26','27','28','29','30','31','32']].reverse();


function figureForId(id) {
    for (let i of gameMap) {
        for (let j of i) {
            if (j != null && String(j.id) == id) {
                return j;
            }
        }
    }
}                  

const shahsObj = {
    refreshShahsMap: function() {
        shahsMap = [];
        for (let i of gameMap) {
            const tempArr = [];

            for (let j of i) {
                let id;

                if (j != null) {
                    id = String(j.id)
                } else {
                    id = '';
                }

                tempArr.push(id);
            }

            shahsMap.push(tempArr);
        }
    },
    _refreshWhiteShahs: function() {
        const whiteFigures = ['17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32'];
        const blackFigures = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];
        const figuresElements = document.body.querySelector('.board').querySelectorAll('.white-team');

        const figures = [];

        for (let figureElement of figuresElements) {
            const id = figureElement.id.slice(1);
            if (whiteFigures.includes(id)) {
                figures.push(id);
            }
        }

        for (let figureId of figures) {
            switch (figureForId(figureId).type) {
                case 'pawn':
                    const figure = figureForId(figureId);

                    if (shahsMap[figure.y - 1 + 1]?.[figure.x - 1 - 1] != undefined) {
                        shahsMap[figure.y - 1 + 1][figure.x - 1 - 1] = shahsMap[figure.y - 1 + 1][figure.x - 1 - 1] + 'w';
                    }

                    if (shahsMap[figure.y - 1 + 1]?.[figure.x - 1 + 1] != undefined) {
                        shahsMap[figure.y - 1 + 1][figure.x - 1 + 1] = shahsMap[figure.y - 1 + 1][figure.x - 1 + 1] + 'w';
                    }
                break;
                case 'rook':
                    const figure1 = figureForId(figureId);

                    metka: for (let i = figure1.y + 1, j = figure1.x; i <= 8 && i >= 1; i++) {
                        const cell = shahsMap[i - 1][j - 1];

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka;
                        }

                        shahsMap[i - 1][j - 1] = shahsMap[i - 1][j - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka;
                        }
                    }

                    metka1: for (let i = figure1.y - 1, j = figure1.x; i <= 8 && i >= 1; i--) {
                        const cell = shahsMap[i - 1][j - 1];

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka1;
                        }

                        shahsMap[i - 1][j - 1] = shahsMap[i - 1][j - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka1;
                        }
                    }

                    metka2: for (let i = figure1.x + 1, j = figure1.y; i <= 8 && i >= 1; i++) {
                        const cell = shahsMap[j - 1][i - 1];

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka2;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka2;
                        }
                    }

                    metka3: for (let i = figure1.x - 1, j = figure1.y; i <= 8 && i >= 1; i--) {
                        const cell = shahsMap[j - 1][i - 1];

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka3;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka3;
                        }
                    }
                break;
                case 'horse':
                    const figure2 = figureForId(figureId);

                    
                    if (shahsMap[figure2.y - 1 + 2]?.[figure2.x - 1 - 1] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 + 2][figure2.x - 1 - 1].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 + 2][figure2.x - 1 - 1] = shahsMap[figure2.y - 1 + 2][figure2.x - 1 - 1] + 'w';
                        }
                    }
                    if (shahsMap[figure2.y - 1 + 2]?.[figure2.x - 1 + 1] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 + 2][figure2.x - 1 + 1].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 + 2][figure2.x - 1 + 1] = shahsMap[figure2.y - 1 + 2][figure2.x - 1 + 1] + 'w';
                        }
                    }
                    if (shahsMap[figure2.y - 1 - 2]?.[figure2.x - 1 - 1] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 - 2][figure2.x - 1 - 1].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 - 2][figure2.x - 1 - 1] = shahsMap[figure2.y - 1 - 2][figure2.x - 1 - 1] + 'w';
                        }
                    }
                    if (shahsMap[figure2.y - 1 - 2]?.[figure2.x - 1 + 1] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 - 2][figure2.x - 1 + 1].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 - 2][figure2.x - 1 + 1] = shahsMap[figure2.y - 1 - 2][figure2.x - 1 + 1] + 'w';
                        }
                    }
                    if (shahsMap[figure2.y - 1 + 1]?.[figure2.x - 1 - 2] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 + 1][figure2.x - 1 - 2].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 + 1][figure2.x - 1 - 2] = shahsMap[figure2.y - 1 + 1][figure2.x - 1 - 2] + 'w';
                        }
                    }
                    if (shahsMap[figure2.y - 1 + 1]?.[figure2.x - 1 + 2] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 + 1][figure2.x - 1 + 2].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 + 1][figure2.x - 1 + 2] = shahsMap[figure2.y - 1 + 1][figure2.x - 1 + 2] + 'w';
                        }
                    }
                    if (shahsMap[figure2.y - 1 - 1]?.[figure2.x - 1 - 2] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 - 1][figure2.x - 1 - 2].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 - 1][figure2.x - 1 - 2] = shahsMap[figure2.y - 1 - 1][figure2.x - 1 - 2] + 'w';
                        }
                    }
                    if (shahsMap[figure2.y - 1 - 1]?.[figure2.x - 1 + 2] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 - 1][figure2.x - 1 + 2].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 - 1][figure2.x - 1 + 2] = shahsMap[figure2.y - 1 - 1][figure2.x - 1 + 2] + 'w';
                        }
                    }
                    
                break;
                case 'elephant':
                    const figure3 = figureForId(figureId);

                    metka4: for (let i = figure3.x + 1, j = figure3.y + 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i++, j++) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka4;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka4;
                        }
                    }

                    metka5: for (let i = figure3.x - 1, j = figure3.y + 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i--, j++) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka5;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka5;
                        }
                    }

                    metka6: for (let i = figure3.x + 1, j = figure3.y - 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i++, j--) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka6;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka6;
                        }
                    }

                    metka7: for (let i = figure3.x - 1, j = figure3.y - 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i--, j--) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka7;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka7;
                        }
                    }
                break;
                case 'queen':
                    const figure4 = figureForId(figureId);

                    metka8: for (let i = figure4.y + 1, j = figure4.x; i <= 8 && i >= 1; i++) {
                        const cell = shahsMap[i - 1][j - 1];

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka8;
                        }

                        shahsMap[i - 1][j - 1] = shahsMap[i - 1][j - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka8;
                        }
                    }

                    metka9: for (let i = figure4.y - 1, j = figure4.x; i <= 8 && i >= 1; i--) {
                        const cell = shahsMap[i - 1][j - 1];

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka9;
                        }

                        shahsMap[i - 1][j - 1] = shahsMap[i - 1][j - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka9;
                        }
                    }

                    metka10: for (let i = figure4.x + 1, j = figure4.y; i <= 8 && i >= 1; i++) {
                        const cell = shahsMap[j - 1][i - 1];

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka10;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka10;
                        }
                    }

                    metka11: for (let i = figure4.x - 1, j = figure4.y; i <= 8 && i >= 1; i--) {
                        const cell = shahsMap[j - 1][i - 1];

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka11;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka11;
                        }
                    }


                    metk: for (let i = figure4.x + 1, j = figure4.y + 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i++, j++) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metk;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metk;
                        }
                    }

                    metk1: for (let i = figure4.x - 1, j = figure4.y + 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i--, j++) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metk1;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metk1;
                        }
                    }

                    metk2: for (let i = figure4.x + 1, j = figure4.y - 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i++, j--) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metk2;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metk2;
                        }
                    }

                    metk3: for (let i = figure4.x - 1, j = figure4.y - 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i--, j--) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metk3;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'w';
                        
                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metk3;
                        }
                    }
                break;
                case 'king':
                    const figure5 = figureForId(figureId);

                    if (shahsMap[figure5.y - 1 + 1]?.[figure5.x - 1 - 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1 + 1][figure5.x - 1 - 1];
                        let ysl = false;
                        for (let k of whiteFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1 + 1][figure5.x - 1 - 1] = shahsMap[figure5.y - 1 + 1][figure5.x - 1 - 1] + "w";
                        }
                    }
                    if (shahsMap[figure5.y - 1 + 1]?.[figure5.x - 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1 + 1][figure5.x - 1];
                        let ysl = false;
                        for (let k of whiteFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1 + 1][figure5.x - 1] = shahsMap[figure5.y - 1 + 1][figure5.x - 1] + "w";
                        }
                    }
                    if (shahsMap[figure5.y - 1 + 1]?.[figure5.x - 1 + 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1 + 1][figure5.x - 1 + 1];
                        let ysl = false;
                        for (let k of whiteFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1 + 1][figure5.x - 1 + 1] = shahsMap[figure5.y - 1 + 1][figure5.x - 1 + 1] + "w";
                        }
                    }

                    if (shahsMap[figure5.y - 1]?.[figure5.x - 1 + 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1][figure5.x - 1 + 1];
                        let ysl = false;
                        for (let k of whiteFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1][figure5.x - 1 + 1] = shahsMap[figure5.y - 1][figure5.x - 1 + 1] + "w";
                        }
                    }
                    if (shahsMap[figure5.y - 1]?.[figure5.x - 1 - 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1][figure5.x - 1 - 1];
                        let ysl = false;
                        for (let k of whiteFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1][figure5.x - 1 - 1] = shahsMap[figure5.y - 1][figure5.x - 1 - 1] + "w";
                        }
                    }

                    if (shahsMap[figure5.y - 1 - 1]?.[figure5.x - 1 - 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1 - 1][figure5.x - 1 - 1];
                        let ysl = false;
                        for (let k of whiteFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1 - 1][figure5.x - 1 - 1] = shahsMap[figure5.y - 1 - 1][figure5.x - 1 - 1] + "w";
                        }
                    }
                    if (shahsMap[figure5.y - 1 - 1]?.[figure5.x - 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1 - 1][figure5.x - 1];
                        let ysl = false;
                        for (let k of whiteFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1 - 1][figure5.x - 1] = shahsMap[figure5.y - 1 - 1][figure5.x - 1] + "w";
                        }
                    }
                    if (shahsMap[figure5.y - 1 - 1]?.[figure5.x - 1 + 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1 - 1][figure5.x - 1 + 1];
                        let ysl = false;
                        for (let k of whiteFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1 - 1][figure5.x - 1 + 1] = shahsMap[figure5.y - 1 - 1][figure5.x - 1 + 1] + "w";
                        }
                    }
                break;
            }
        }
    },
    _refreshBlackShahs: function() {
        const whiteFigures = ['17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32'];
        const blackFigures = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];
        const figuresElements = document.body.querySelector('.board').querySelectorAll('.black-team');

        const figures = [];

        for (let figureElement of figuresElements) {
            const id = figureElement.id.slice(1);
            if (blackFigures.includes(id)) {
                figures.push(id);
            }
        }

        for (let figureId of figures) {
            switch (figureForId(figureId).type) {
                case 'pawn':
                    const figure = figureForId(figureId);

                    if (shahsMap[figure.y - 1 - 1]?.[figure.x - 1 - 1] != undefined) {
                        shahsMap[figure.y - 1 - 1][figure.x - 1 - 1] = shahsMap[figure.y - 1 - 1][figure.x - 1 - 1] + 'b';
                    }

                    if (shahsMap[figure.y - 1 - 1]?.[figure.x - 1 + 1] != undefined) {
                        shahsMap[figure.y - 1 - 1][figure.x - 1 + 1] = shahsMap[figure.y - 1 - 1][figure.x - 1 + 1] + 'b';
                    }
                break;
                case 'rook':
                    const figure1 = figureForId(figureId);

                    metka: for (let i = figure1.y + 1, j = figure1.x; i <= 8 && i >= 1; i++) {
                        const cell = shahsMap[i - 1][j - 1];

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka;
                        }

                        shahsMap[i - 1][j - 1] = shahsMap[i - 1][j - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka;
                        }
                    }

                    metka1: for (let i = figure1.y - 1, j = figure1.x; i <= 8 && i >= 1; i--) {
                        const cell = shahsMap[i - 1][j - 1];

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka1;
                        }

                        shahsMap[i - 1][j - 1] = shahsMap[i - 1][j - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka1;
                        }
                    }

                    metka2: for (let i = figure1.x + 1, j = figure1.y; i <= 8 && i >= 1; i++) {
                        const cell = shahsMap[j - 1][i - 1];

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka2;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka2;
                        }
                    }

                    metka3: for (let i = figure1.x - 1, j = figure1.y; i <= 8 && i >= 1; i--) {
                        const cell = shahsMap[j - 1][i - 1];

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka3;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka3;
                        }
                    }
                break;
                case 'horse':
                    const figure2 = figureForId(figureId);

                    
                    if (shahsMap[figure2.y - 1 + 2]?.[figure2.x - 1 - 1] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 + 2][figure2.x - 1 - 1].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 + 2][figure2.x - 1 - 1] = shahsMap[figure2.y - 1 + 2][figure2.x - 1 - 1] + 'b';
                        }
                    }
                    if (shahsMap[figure2.y - 1 + 2]?.[figure2.x - 1 + 1] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 + 2][figure2.x - 1 + 1].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 + 2][figure2.x - 1 + 1] = shahsMap[figure2.y - 1 + 2][figure2.x - 1 + 1] + 'b';
                        }
                    }
                    if (shahsMap[figure2.y - 1 - 2]?.[figure2.x - 1 - 1] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 - 2][figure2.x - 1 - 1].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 - 2][figure2.x - 1 - 1] = shahsMap[figure2.y - 1 - 2][figure2.x - 1 - 1] + 'b';
                        }
                    }
                    if (shahsMap[figure2.y - 1 - 2]?.[figure2.x - 1 + 1] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 - 2][figure2.x - 1 + 1].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 - 2][figure2.x - 1 + 1] = shahsMap[figure2.y - 1 - 2][figure2.x - 1 + 1] + 'b';
                        }
                    }
                    if (shahsMap[figure2.y - 1 + 1]?.[figure2.x - 1 - 2] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 + 1][figure2.x - 1 - 2].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 + 1][figure2.x - 1 - 2] = shahsMap[figure2.y - 1 + 1][figure2.x - 1 - 2] + 'b';
                        }
                    }
                    if (shahsMap[figure2.y - 1 + 1]?.[figure2.x - 1 + 2] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 + 1][figure2.x - 1 + 2].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 + 1][figure2.x - 1 + 2] = shahsMap[figure2.y - 1 + 1][figure2.x - 1 + 2] + 'b';
                        }
                    }
                    if (shahsMap[figure2.y - 1 - 1]?.[figure2.x - 1 - 2] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 - 1][figure2.x - 1 - 2].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 - 1][figure2.x - 1 - 2] = shahsMap[figure2.y - 1 - 1][figure2.x - 1 - 2] + 'b';
                        }
                    }
                    if (shahsMap[figure2.y - 1 - 1]?.[figure2.x - 1 + 2] != undefined) {
                        let yslovie = false;
                        for (let k of figures) {
                            if (!shahsMap[figure2.y - 1 - 1][figure2.x - 1 + 2].includes(k)) {
                                yslovie = true;
                            } else {
                                yslovie = false;
                                break;
                            }
                        }
                        
                        if (yslovie) {
                            shahsMap[figure2.y - 1 - 1][figure2.x - 1 + 2] = shahsMap[figure2.y - 1 - 1][figure2.x - 1 + 2] + 'b';
                        }
                    }
                    
                break;
                case 'elephant':
                    const figure3 = figureForId(figureId);

                    metka4: for (let i = figure3.x + 1, j = figure3.y + 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i++, j++) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka4;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka4;
                        }
                    }

                    metka5: for (let i = figure3.x - 1, j = figure3.y + 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i--, j++) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka5;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka5;
                        }
                    }

                    metka6: for (let i = figure3.x + 1, j = figure3.y - 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i++, j--) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka6;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka6;
                        }
                    }

                    metka7: for (let i = figure3.x - 1, j = figure3.y - 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i--, j--) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka7;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka7;
                        }
                    }
                break;
                case 'queen':
                    const figure4 = figureForId(figureId);

                    metka8: for (let i = figure4.y + 1, j = figure4.x; i <= 8 && i >= 1; i++) {
                        const cell = shahsMap[i - 1][j - 1];

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka8;
                        }

                        shahsMap[i - 1][j - 1] = shahsMap[i - 1][j - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka8;
                        }
                    }

                    metka9: for (let i = figure4.y - 1, j = figure4.x; i <= 8 && i >= 1; i--) {
                        const cell = shahsMap[i - 1][j - 1];

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka9;
                        }

                        shahsMap[i - 1][j - 1] = shahsMap[i - 1][j - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka9;
                        }
                    }

                    metka10: for (let i = figure4.x + 1, j = figure4.y; i <= 8 && i >= 1; i++) {
                        const cell = shahsMap[j - 1][i - 1];

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka10;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka10;
                        }
                    }

                    metka11: for (let i = figure4.x - 1, j = figure4.y; i <= 8 && i >= 1; i--) {
                        const cell = shahsMap[j - 1][i - 1];

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metka11;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metka11;
                        }
                    }


                    metk: for (let i = figure4.x + 1, j = figure4.y + 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i++, j++) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metk;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metk;
                        }
                    }

                    metk1: for (let i = figure4.x - 1, j = figure4.y + 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i--, j++) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metk1;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metk1;
                        }
                    }

                    metk2: for (let i = figure4.x + 1, j = figure4.y - 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i++, j--) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metk2;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metk2;
                        }
                    }

                    metk3: for (let i = figure4.x - 1, j = figure4.y - 1; i <= 8 && i >= 1 && j <=8 && j >= 1; i--, j--) {
                        const cell = shahsMap[j - 1][i - 1]; 

                        for (let k of blackFigures) {
                            if (cell.includes(k)) break metk3;
                        }

                        shahsMap[j - 1][i - 1] = shahsMap[j - 1][i - 1] + 'b';
                        
                        for (let k of whiteFigures) {
                            if (cell.includes(k)) break metk3;
                        }
                    }
                break;
                case 'king':
                    const figure5 = figureForId(figureId);

                    if (shahsMap[figure5.y - 1 + 1]?.[figure5.x - 1 - 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1 + 1][figure5.x - 1 - 1];
                        let ysl = false;
                        for (let k of blackFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1 + 1][figure5.x - 1 - 1] = shahsMap[figure5.y - 1 + 1][figure5.x - 1 - 1] + "b";
                        }
                    }
                    if (shahsMap[figure5.y - 1 + 1]?.[figure5.x - 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1 + 1][figure5.x - 1];
                        let ysl = false;
                        for (let k of blackFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1 + 1][figure5.x - 1] = shahsMap[figure5.y - 1 + 1][figure5.x - 1] + "b";
                        }
                    }
                    if (shahsMap[figure5.y - 1 + 1]?.[figure5.x - 1 + 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1 + 1][figure5.x - 1 + 1];
                        let ysl = false;
                        for (let k of blackFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1 + 1][figure5.x - 1 + 1] = shahsMap[figure5.y - 1 + 1][figure5.x - 1 + 1] + "b";
                        }
                    }

                    if (shahsMap[figure5.y - 1]?.[figure5.x - 1 + 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1][figure5.x - 1 + 1];
                        let ysl = false;
                        for (let k of blackFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1][figure5.x - 1 + 1] = shahsMap[figure5.y - 1][figure5.x - 1 + 1] + "b";
                        }
                    }
                    if (shahsMap[figure5.y - 1]?.[figure5.x - 1 - 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1][figure5.x - 1 - 1];
                        let ysl = false;
                        for (let k of blackFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1][figure5.x - 1 - 1] = shahsMap[figure5.y - 1][figure5.x - 1 - 1] + "b";
                        }
                    }

                    if (shahsMap[figure5.y - 1 - 1]?.[figure5.x - 1 - 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1 - 1][figure5.x - 1 - 1];
                        let ysl = false;
                        for (let k of blackFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1 - 1][figure5.x - 1 - 1] = shahsMap[figure5.y - 1 - 1][figure5.x - 1 - 1] + "b";
                        }
                    }
                    if (shahsMap[figure5.y - 1 - 1]?.[figure5.x - 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1 - 1][figure5.x - 1];
                        let ysl = false;
                        for (let k of blackFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1 - 1][figure5.x - 1] = shahsMap[figure5.y - 1 - 1][figure5.x - 1] + "b";
                        }
                    }
                    if (shahsMap[figure5.y - 1 - 1]?.[figure5.x - 1 + 1] != undefined) {
                        const cell = shahsMap[figure5.y - 1 - 1][figure5.x - 1 + 1];
                        let ysl = false;
                        for (let k of blackFigures) {
                            if (!cell.includes(k)) {
                                ysl = true;
                            } else {
                                ysl = false;
                                break;
                            }
                        }

                        if (ysl) {
                            shahsMap[figure5.y - 1 - 1][figure5.x - 1 + 1] = shahsMap[figure5.y - 1 - 1][figure5.x - 1 + 1] + "b";
                        }
                    }
                break;
            }
        }
    },
    refreshWhiteShahs: function() {
        this.refreshShahsMap();
        this._refreshWhiteShahs();
    },
    refreshBlackShahs: function() {
        this.refreshShahsMap();
        this._refreshBlackShahs();
    },
    refreshAllShahs: function() {
        this.refreshShahsMap();
        this._refreshBlackShahs();
        this._refreshWhiteShahs();
    }
};

function CreateFigure(id) {
    let figureElement = document.getElementById(`f${id}`);
    let type = figureElement.classList[1];

    this.type = type;
    this.id = id;
    this.team = figureElement.classList[0].slice(0,5);
    this.x = Number(figureElement.parentElement.classList[1][1]);
    this.y = Number(figureElement.parentElement.classList[1][2]);
    this.moveCount = 0;
    this.returnCurrentCell = function() {
        return Number(String(this.x) + String(this.y));
    }
    this.death = function() {
        gameMap[this.y - 1][this.x - 1] = null;
        domEngine.killFigure(this.id, this.team == 'white' ? 2 : 1);
    }
    switch (type) {
        case 'pawn':
            this.walk = function(cellNumber) {
                const cellX = Number(cellNumber[1]);
                const cellY = Number(cellNumber[2]);

                if (this.team == 'black' && this.y - 1 == cellY && cellX == this.x && gameMap[cellY - 1][cellX - 1] == null) {
                    gameMap[this.y - 1][this.x - 1] = null;
                    this.y--;
                    gameMap[this.y - 1][this.x - 1] = this;
                    domEngine.replaceFigure(this.id, Number(String(cellX) + String(cellY)));
                    return true;
                }

                if (this.team == 'white' && this.y + 1 == cellY && cellX == this.x && gameMap[cellY - 1][cellX - 1] == null) {
                    gameMap[this.y - 1][this.x - 1] = null;
                    this.y++;
                    gameMap[this.y - 1][this.x - 1] = this;
                    domEngine.replaceFigure(this.id, Number(String(cellX) + String(cellY)));
                    return true;
                }

                return false;
            };
            this.kill = function(cellNumber) {
                const cellX = Number(cellNumber[1]);
                const cellY = Number(cellNumber[2]);

                if (this.team == 'black' && (gameMap[cellY - 1][cellX - 1] != null && gameMap[cellY - 1][cellX - 1].team == 'white') && (this.x - 1 == cellX || this.x + 1 == cellX) && (this.y - 1 == cellY) && gameMap[cellY - 1][cellX - 1].type != 'king') {
                    gameMap[cellY - 1][cellX - 1].death();
                    gameMap[this.y - 1][this.x - 1] = null;
                    this.y--;
                    this.x = cellX;
                    gameMap[this.y - 1][this.x - 1] = this;
                    domEngine.replaceFigure(this.id, Number(String(cellX) + String(cellY)));
                    return true;
                }

                if (this.team == 'white' && (gameMap[cellY - 1][cellX - 1] != null && gameMap[cellY - 1][cellX - 1].team == 'black') && (this.x - 1 == cellX || this.x + 1 == cellX) && (this.y + 1 == cellY) && gameMap[cellY - 1][cellX - 1].type != 'king') {
                    gameMap[cellY - 1][cellX - 1].death();
                    gameMap[this.y - 1][this.x - 1] = null;
                    this.y++;
                    this.x = cellX;
                    gameMap[this.y - 1][this.x - 1] = this;
                    domEngine.replaceFigure(this.id, Number(String(cellX) + String(cellY)));
                    return true;
                }

                return false;
            }
            break;
        case 'rook': 
            this.walk = function(cellNumber) {
                const cellX = Number(cellNumber[1]);
                const cellY = Number(cellNumber[2]);

                if ( (this.x == cellX || this.y == cellY) && (gameMap[cellY - 1][cellX - 1] == null || (gameMap[cellY - 1][cellX - 1].team != this.team && gameMap[cellY - 1][cellX - 1].type != 'king'))) {
                    const target = gameMap[cellY - 1][cellX - 1];

                    if (this.x == cellX) {
                        if (this.y > cellY) {
                            for (let i = this.y - 1; i > cellY; i--) {
                                if (gameMap[i - 1][this.x - 1] != null) return false;
                            }
                        } else {
                            for (let i = this.y + 1; i < cellY; i++) {
                                if (gameMap[i - 1][this.x - 1] != null) return false;
                            }
                        }
                    } else {
                        if (this.x > cellX) {
                            for (let i = this.x - 1; i > cellX; i--) {
                                if (gameMap[this.y - 1][i - 1] != null) return false;
                            }
                        } else {
                            for (let i = this.x + 1; i < cellX; i++) {
                                if (gameMap[this.y - 1][i - 1] != null) return false;
                            }
                        }
                    }

                    if (target != null) {
                        target.death();
                    }

                    gameMap[this.y - 1][this.x - 1] = null;
                    this.x = cellX;
                    this.y = cellY;
                    gameMap[this.y - 1][this.x - 1] = this;
                    domEngine.replaceFigure(this.id, Number(String(cellX) + String(cellY)));

                    return true;
                }

                return false;
            }
        break;
        case 'horse':
            this.walk = function(cellNumber) {
                const cellX = Number(cellNumber[1]);
                const cellY = Number(cellNumber[2]);

                if (((Math.abs(cellX - this.x) == 1 && Math.abs(cellY - this.y) == 2 ) || (Math.abs(cellX - this.x) == 2 && Math.abs(cellY - this.y) == 1 )) && 
                    (gameMap[cellY - 1][cellY - 1] == null || ((gameMap[cellY - 1][cellX - 1].team != this.team) && gameMap[cellY - 1][cellX - 1].type != 'king'))) {

                    if (gameMap[cellY - 1][cellX - 1] != null) {
                        gameMap[cellY - 1][cellX - 1].death();
                    }

                    gameMap[this.y - 1][this.x - 1] = null;
                    this.x = cellX;
                    this.y = cellY;
                    gameMap[this.y - 1][this.x - 1] = this;
                    domEngine.replaceFigure(this.id, Number(String(cellX) + String(cellY)));

                    return true;
                }

                return false;
            }
        break;
        case 'elephant':
            this.walk = function(cellNumber) {
                const cellX = Number(cellNumber[1]);
                const cellY = Number(cellNumber[2]);

                if ( (Math.abs(this.x - cellX) == Math.abs(this.y - cellY)) &&
                     ((gameMap[cellY - 1][cellX - 1] == null) || (gameMap[cellY - 1][cellX - 1].team != this.team && gameMap[cellY - 1][cellX - 1].type != 'king') )) {

                        if (this.y > cellY) {
                            if (this.x > cellX) {
                                for (let i = this.x - 1, j = this.y - 1; i > cellX && j > cellY; i--, j--) {
                                    if (gameMap[j - 1][i - 1] != null) return false;
                                }
                            } else if (this.x < cellX){
                                for (let i = this.x + 1, j = this.y - 1; i < cellX && j > cellY; i++, j--) {
                                    if (gameMap[j - 1][i - 1] != null) return false;
                                }
                            }
                        } else {
                            if (this.x > cellX) {
                                for (let i = this.x - 1, j = this.y + 1; i > cellX && j < cellY; i--, j++) {
                                    if (gameMap[j - 1][i - 1] != null) return false;
                                }
                            } else {
                                for (let i = this.x + 1, j = this.y + 1; i < cellX && j < cellY; i++, j++ ) {
                                    if (gameMap[j - 1][i - 1] != null) return false;
                                }
                            }
                        }

                        if (gameMap[cellY - 1][cellX - 1] != null) {
                            gameMap[cellY - 1][cellX - 1].death();
                        }
    
                        gameMap[this.y - 1][this.x - 1] = null;
                        this.x = cellX;
                        this.y = cellY;
                        gameMap[this.y - 1][this.x - 1] = this;
                        domEngine.replaceFigure(this.id, Number(String(cellX) + String(cellY)));

                        return true;
                    }
                
                return false;
            }
        break;
        case 'queen': 
            this.walk = function(cellNumber) {
                const cellX = Number(cellNumber[1]);
                const cellY = Number(cellNumber[2]);

                if ( ((Math.abs(this.x - cellX) == Math.abs(this.y - cellY)) || (this.x == cellX || this.y == cellY)) && ((gameMap[cellY - 1][cellX - 1] == null) || (gameMap[cellY - 1][cellX - 1].team != this.team && gameMap[cellY - 1][cellX - 1].type != 'king'))) {

                    if (this.x == cellX) {
                        if (this.y > cellY) {
                            for (let i = this.y - 1; i > cellY; i--) {
                                if (gameMap[i - 1][this.x - 1] != null) return false;
                            }
                        } else if (this.y < cellY) {
                            for (let i = this.y + 1; i < cellY; i++) {
                                if (gameMap[i - 1][this.x - 1] != null) return false;
                            }
                        }
                    } else if (this.y == cellY) {
                        if (this.x > cellX) {
                            for (let i = this.x - 1; i > cellX; i--) {
                                if (gameMap[this.y - 1][i - 1] != null) return false;
                            }
                        } else if (this.x < cellX) {
                            for (let i = this.x + 1; i < cellX; i++) {
                                if (gameMap[this.y - 1][i - 1] != null) return false;
                            }
                        }
                    }

                    if (this.y > cellY) {
                        if (this.x > cellX) {
                            for (let i = this.x - 1, j = this.y - 1; i > cellX && j > cellY; i--, j--) {
                                if (gameMap[j - 1][i - 1] != null) return false;
                            }
                        } else if (this.x < cellX){
                            for (let i = this.x + 1, j = this.y - 1; i < cellX && j > cellY; i++, j--) {
                                if (gameMap[j - 1][i - 1] != null) return false;
                                const cellX = Number(cellNumber[1]);
                                const cellY = Number(cellNumber[2]);         if (gameMap[j - 1][i - 1] != null) return false;
                            }
                        } else if (this.x < cellX) {
                            for (let i = this.x + 1, j = this.y + 1; i < cellX && j < cellY; i++, j++ ) {
                                if (gameMap[j - 1][i - 1] != null) return false;
                            }
                        }
                    }

                    if (gameMap[cellY - 1][cellX - 1] != null) {
                        gameMap[cellY - 1][cellX - 1].death();
                    }

                    gameMap[this.y - 1][this.x - 1] = null;
                    this.x = cellX;
                    this.y = cellY;
                    gameMap[this.y - 1][this.x - 1] = this;
                    domEngine.replaceFigure(this.id, Number(String(cellX) + String(cellY)));

                    return true;
                }

                return false;
            }
        break;
        case 'king':
            delete this.death;
            this.walk = function(cellNumber) {
                const cellX = Number(cellNumber[1]);
                const cellY = Number(cellNumber[2]);
                const enemyKing = this.team == 'white' ? document.querySelector('.black-team.king') : document.querySelector('.white-team.king');

                if ( ((this.x == cellX && this.y - 1 == cellY) ||
                     (this.x == cellX && this.y + 1 == cellY) ||
                     (this.y == cellY && this.x - 1 == cellX) ||
                     (this.y == cellY && this.x + 1 == cellX) ||
                     (this.x + 1 == cellX && this.y + 1 == cellY) ||
                     (this.x - 1 == cellX && this.y + 1 == cellY) ||
                     (this.x + 1 == cellX && this.y - 1 == cellY) ||
                     (this.x - 1 == cellX && this.y - 1 == cellY)) && 
                     ((gameMap[cellY - 1][cellX - 1] == null) || (gameMap[cellY - 1][cellX - 1].team != this.team && gameMap[cellY - 1][cellX - 1].type != 'king')) ) {

                        // if ( (this.x == enemyKing.x && this.y + 2 == enemyKing.y) ||
                        //      (this.x == enemyKing.x && this.y - 2 == enemyKing.y) ||
                        //      (this.y == enemyKing.y && this.x + 2 == enemyKing.x) ||
                        //      (this.y == enemyKing.y && this.x - 2 == enemyKing.x) ||
                        //      (this.x + 2 == enemyKing.x && this.y + 2 == enemyKing.y) ||
                        //      (this.x - 2 == enemyKing.x && this.y + 2 == enemyKing.y) ||
                        //      (this.x + 2 == enemyKing.x && this.y - 2 == enemyKing.y) ||
                        //      (this.x - 2 == enemyKing.x && this.y - 2 == enemyKing.y))  {
                        //          console.log("конфликт королей");
                        //          return false;
                        // }

                        if (gameMap[cellY - 1][cellX - 1] != null) {
                            gameMap[cellY - 1][cellX - 1].death();
                        }
    
                        gameMap[this.y - 1][this.x - 1] = null;
                        this.x = cellX;
                        this.y = cellY;
                        gameMap[this.y - 1][this.x - 1] = this;
                        domEngine.replaceFigure(this.id, Number(String(cellX) + String(cellY)));
    
                        return true;
                        
                }

                return false;
            }
        break;
    }
}