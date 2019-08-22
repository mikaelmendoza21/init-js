// Object classes
class Modal {
    constructor(args) {
        // Arrange elements
        if (args.title === null || args.title === undefined){
            args.title = '';
        }
        let closingClass = 'init-modal-close'; // Used internally (No styling)

        // Styles
        let modalContainerClasses = this.joinStyleClasses(args.modalContainerClasses);
        let headerClasses = this.joinStyleClasses(args.headerClasses);
        let titleClasses = this.joinStyleClasses(args.titleClasses);
        let contentClasses = this.joinStyleClasses(args.contentClasses);
        let closeButtonClasses = closingClass + ' ' + this.joinStyleClasses(args.closeButtonClasses);
        let closeButtonContainerClasses = this.joinStyleClasses(args.closeButtonContainerClasses);

        // Build modal HTML
        this.modal = document.createElement('div');
        this.modal.className = modalContainerClasses;
        this.modal.innerHTML += 
            `<div class="${headerClasses}">` +
                `<span class="${titleClasses}">${args.title}</span>` +
                `<span class="${closeButtonContainerClasses}">` +
                    `<button class="${closeButtonClasses}" style="padding:0.1rem;"> X </button>`+ 
                '</span>' +
            '</div>' +
            `<div class="${contentClasses}">${args.content}</div>`;
        document.body.appendChild(this.modal);

        // Set event listeners
        var closeButton = this.modal.getElementsByClassName(closingClass)[0];
        window.addEventListener('keyup', (e) => {
            // Bind ESC
            if(e.keyCode == 27){
                this.hide();
            }
        });
        closeButton.addEventListener('click', (e) => {
            this.hide();
        });

        // Open/Close callbacks
        if (args.onCloseCallback != null && typeof args.onCloseCallback === "function"){
            this.onCloseCallback = args.onCloseCallback;
        }
        if (args.onOpenCallback != null && typeof args.onOpenCallback === "function"){
            this.openCallback = args.onOpenCallback;
            this.openCallback();
        }
    }
    hide(){
        var parent = this.modal.parentNode;
        if (this.onCloseCallback != null){
            this.onCloseCallback();
        }
        parent.removeChild(this.modal); // TODO: do not remove - make it reusable (let client decide)
    }

    joinStyleClasses(classArray){
        if(classArray !== null && classArray !== undefined && classArray.constructor === Array && classArray.length > 0){
            return classArray.join(' ');
        }
        else{
            return '';
        }
    }
}

// Utilities
var isMenuShown = false;
function toggleMenu() {
    let expandedClass = 'expanded';
    let menuItems = document.getElementsByClassName('menu-item');
    let menuToggle = document.getElementsByClassName('menu-toggle');
    if (isMenuShown) {
        menuToggle[0].classList.remove(expandedClass);
        for (var index = 0; index < menuItems.length; index++) {
            menuItems[index].classList.remove(expandedClass);
        }
    }
    else {
        menuToggle[0].classList.add(expandedClass);
        for (var index = 0; index < menuItems.length; index++) {
            menuItems[index].classList.add(expandedClass);
        }
    }
    isMenuShown = !isMenuShown;
}

window.onload = function(){
    let menuItems = document.getElementsByClassName('menu-item');
    for (var index = 0; index < menuItems.length; index++) {
        menuItems[index].addEventListener('click', toggleMenu);
    }
};