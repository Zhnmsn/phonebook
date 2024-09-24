import { setStorage, removeStorage } from "./serviceStorage.js";  
import { createRow } from "./createElements.js";


const addContactData = (contact) => {
    setStorage('data', contact);
}

export const hoverRow = (allRow, logo) => {
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

export const modalControl = (btnAdd, formOverlay) => {

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

export const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
            document.querySelectorAll('.delete').forEach( del => {
            del.classList.toggle('is-visible');
        });
    });
};

export const addContactPage = (contact, list) => {
    list.append(createRow(contact));
};

export const formControl = (form, list, closeModal) => {
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
    export default addContactData;