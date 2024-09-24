
import { createFooter, createHeader, createLogo, createFooterLogo, createMain } from "./createElements.js";
import { createButtonsGroup, createTable, createForm, createRow } from "./createElements.js";


export const renderPhoneBook = (app, title) => {

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
    
    
    
    export const renderContacts = (elem, localData) => {
        const allRow = localData.map(createRow);
        elem.append(...allRow);
        return allRow;
    };