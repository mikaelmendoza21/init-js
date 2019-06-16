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
        if(args.onOpenCallback != null){
            args.onOpenCallback();
        }

        // Set event listeners
        var closeButton = this.modal.getElementsByClassName(closingClass)[0];
        closeButton.addEventListener('click', (e) => {
                this.hide();
                if(args.onCloseCallback != null){
                    args.onCloseCallback();
                }
        });
    }
    hide(){
        var parent = this.modal.parentNode;
        parent.removeChild(this.modal);
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