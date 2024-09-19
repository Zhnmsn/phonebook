"use strict"


    
{
    
    const getStorage = (key) => {
        const localData = JSON.parse(localStorage.getItem(key));
        return localData;
        };
    
    const setStorage = (key, obj) => {
        const localData = getStorage(key);
        localData.push(obj);
        let setNewContact = localStorage.setItem('data', JSON.stringify(localData));
        return setNewContact;
    };
        
    const removeStorage = (phone) => {
        const localData = getStorage('data');
        for(let i=0; i<localData.length; i++) {
            if(localData[i].phone === phone) {
                    localData.splice(i, 1);
                }
        }  localStorage.setItem('data', JSON.stringify(localData));
};


const addContactData = (contact) => {
    setStorage('data',  contact);
}

const createContainer = () => {
const container = document.createElement('div');
container.classList.add('container');
return container;
};


const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;
    return header;
}

const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const footerContainer = createContainer();
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;
    return footer;
}

const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник, ${title}`;
    return h1;
}

const createFooterLogo = title => {
    const h2 = document.createElement('h2');
    h2.textContent = `Все права защищены \u00A9${ title}`;
    return h2;
}

const createMain = () => {
const main = document.createElement('main');
const mainContainer = createContainer();
main.append(mainContainer);
main.mainContainer = mainContainer;
return main;

}

const createButtonsGroup = (params) => {
    const  btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

const btns = params.map(({className, type, text}) => {
    const button = document.createElement('button');
    button.className = className;
    button.type = type;
    button.textContent = text;
        return button;
});

btnWrapper.append(...btns);

    return {
        btnWrapper,
        btns,
    }
};

const createTable = () => {
const table = document.createElement('table');
table.classList.add('table', 'table-striped');
const tHead = document.createElement('thead');
tHead.insertAdjacentHTML('beforeend', 
    `<tr> 
            <th class= 'delete'> Удалить </th>
            <th class= 'colName'> Имя</th>
            <th class= 'colSurName'> Фамилия</th>
            <th> Телефон</th>
            <th class = 'edit'> Редактировать </th>
    </tr>`
);

const tBody = document.createElement('tbody');
table.append(tHead, tBody);
table.tBody = tBody;

return table;
}

const createForm = ()=> {
const overlay = document.createElement('div');
overlay.classList.add('form-overlay');

const form = document.createElement('form');
form.classList.add('form');
form.insertAdjacentHTML('beforeend', `
    <button class = 'close' type = "button"> </button>
    <h2 class= "form-title"> Добавить контакт</h2>

    <div class = "form-group"> 
    <label class = "form-label" for="name" >Имя: </label>
    <input class="form-input" name="name" id="name"
        type = "text" required
    </div>

    <div class = "form-group"> 
    <label class = "form-label" for="surname" >Фамилия: </label>
    <input class="form-input" name="surname" id="surname"
        type = "text" required
    </div>

    <div class = "form-group"> 
    <label class = "form-label" for="phone" >Телефон: </label>
    <input class="form-input" name="phone" id="phone"
        type = "number" required
    </div>
    
    `)

const buttonGroup = createButtonsGroup([
    {
        className : 'btn btn-primary mr-3',
        type : 'submit',
        text : 'Добавить',
    },
        {
        className : 'btn btn-danger',
        type : 'reset',
        text : 'Отмена',
    },
]);
form.append(...buttonGroup.btns);
overlay.append(form);
return { overlay, 
    form,
};
};


const renderPhoneBook = (app, title) => {

const header = createHeader();
const footer = createFooter();
const logo = createLogo(title);
const footerLogo = createFooterLogo(title);
const main = createMain();
const buttonGroup = createButtonsGroup([
    {
        className : 'btn btn-primary mr-3',
        type : 'button',
        text : 'Добавить',
    },
        {
        className : 'btn btn-danger',
        type : 'button',
        text : 'Удалить',
    },
]);

const table = createTable();
const {form, overlay} = createForm();

app.append(header, main, footer);
main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
header.headerContainer.append(logo);
footer.footerContainer.append(footerLogo);

return {
    list : table.tBody, logo,
    btnAdd : buttonGroup.btns[0],
    btnDel : buttonGroup.btns[1],
    formOverlay : overlay,
    form,
};

};

const createRow = ({name : firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('dell-icon');
    tdDel.append(buttonDel);


    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    
    const tdSurName = document.createElement('td');
    tdSurName.textContent = surname;
    
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    const tdEdit = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    tdEdit.append(editBtn);
tr.append(tdDel, tdName, tdSurName, tdPhone, tdEdit);

    return tr;
}

const renderContacts = (elem, localData) => {
    const allRow = localData.map(createRow);
    elem.append(...allRow);
    return allRow;
};

const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach(contact => {
        contact.addEventListener('mouseenter', ()=> {
            logo.textContent = contact.phoneLink.textContent;
        });

        contact.addEventListener('mouseleave', () => {
            logo.textContent = text;
        });

        contact.addEventListener('click', (e)=> {
            if(e.target.closest('.dell-icon')) {
                e.target.closest('.contact').remove();
                removeStorage(contact.phoneLink.textContent); // удаление контакта по телефонному номеру
                }
        });
    });
};

const modalControl = (btnAdd, formOverlay) => {

    const openModal = () => {
        formOverlay.classList.add('is-visible');
    };
    const closeModal = () => {
        formOverlay.classList.remove('is-visible');
    }

    btnAdd.addEventListener('click', openModal);
        
    formOverlay.addEventListener('click', e => {
        const target = e.target;
        if(target === formOverlay || target.closest('.close')) {
            closeModal();
        };
    });
    return  {
        closeModal,
    };
};


const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
            document.querySelectorAll('.delete').forEach( del => {
            del.classList.toggle('is-visible');
        });
    });
};

const addContactPage = (contact, list) => {
    list.append(createRow(contact));
};

const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const newContact = Object.fromEntries(formData);
        console.log(newContact);
        addContactPage(newContact, list);
        addContactData(newContact);
        form.reset();
        closeModal();
    });
};

const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {list, form, logo, btnAdd, btnDel, formOverlay} = renderPhoneBook(app, title);

    const allRow = renderContacts(list, getStorage('data'));
    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

        
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
            
};

    window.phoneBookInit = init;
}