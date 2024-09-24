


export const sortTable = () => {
    const table = document.querySelector('table'); 
    let keyArr = [];

        const sortedRowsName = Array.from(table.rows).slice(1).sort((rowA, rowB) =>
            rowA.cells[1].textContent > rowB.cells[1].textContent ? 1 : -1) ;

            table.addEventListener('click', e => {
                const target = e.target;
                    if(target.closest('.colName')) {
                    keyArr.push(sortedRowsName);
                    table.tBodies[0].append(...sortedRowsName);
                    localStorage.setItem('sortName', JSON.stringify(keyArr));
                }
            });   
            
        const sortedRowsSurName = Array.from(table.rows).slice(1).sort((rowA, rowB) =>
            rowA.cells[2].textContent > rowB.cells[2].textContent ? 1 : -1) ;
            table.addEventListener('click', e => {
                const target = e.target;
                if(target.closest('.colSurName')) {
                    keyArr.push(sortedRowsSurName);
                    table.tBodies[0].append(...sortedRowsSurName);
                    localStorage.setItem('sortSurName', JSON.stringify(keyArr));
                }
            }); 
            
            window.addEventListener('DOMContentLoaded', () => {
                console.log('DOMContentLoaded');
                if(localStorage.getItem('sortName')) {
                    table.tBodies[0].append(...sortedRowsName);
                };
            });

            window.addEventListener('DOMContentLoaded', () => {
                console.log('DOMContentLoaded');
                if(localStorage.getItem('sortSurName')) {
                    table.tBodies[0].append(...sortedRowsSurName);
                };
            });
} 

