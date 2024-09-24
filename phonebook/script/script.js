import * as getStorage from "./modules/serviceStorage.js";
import { renderPhoneBook, renderContacts } from "./modules/render.js";
import { formControl, deleteControl,modalControl, hoverRow } from "./modules/control.js";
import { sortTable }  from "./modules/sortElements.js";

{

const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {list, form, logo, btnAdd, btnDel, formOverlay} = renderPhoneBook(app, title);

    const allRow = renderContacts(list, getStorage.getStorage('data'));
    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    sortTable();
    
};

    window.phoneBookInit = init;
}