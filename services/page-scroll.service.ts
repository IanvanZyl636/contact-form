export default class PageScrollService{
    private currentSection:number = 0;
    private sectionYScroll:number|null = null;
    private get currentScrollPosition(){return window.scrollY || document.documentElement.scrollTop}
    private get lastScrollTop(){return this._lastScrollTop}
    private set lastScrollTop(value:number){this._lastScrollTop = value <= 0 ? 0 : value}
    private _lastScrollTop = 0;

    constructor(private sectionName, private amountOfSections:number) {
        this.initializeCurrent();

        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('scrollend', this.handleScrollEnd);
        window.addEventListener('hashchange', this.handleHashChange);
    }

    destroy(){
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('scrollend', this.handleScrollEnd);
        window.removeEventListener('hashchange', this.handleHashChange);
    }

    private initializeCurrent(){
        const hash = window.location.hash;
    }

    private handleScrollEnd = () => {
        if(this.sectionYScroll !== null){
            this.lastScrollTop = this.currentScrollPosition;
            this.sectionYScroll = null;

            return;
        }
    }

    private handleScroll = () =>{
        if(this.sectionYScroll !== null) return;

        this.currentScrollPosition > this.lastScrollTop ? this.moveToSection('UP') : this.moveToSection('DOWN');

        this.lastScrollTop = this.currentScrollPosition;
    }

    private handleHashChange = (e:HashChangeEvent) => {
        const hash = window.location.hash.replace('#', '').replace(`${this.sectionName}`, '');
        const sectionIndex = +hash;
        if (sectionIndex >= 0) {
            this.currentSection = sectionIndex;
            this.scrollToSection();
        }
    };

    private moveToSection = (direction:'UP'|'DOWN') =>{
        if(direction === 'UP') this.currentSection = Math.min(this.currentSection + 1, this.amountOfSections - 1);

        if(direction === 'DOWN') this.currentSection = Math.max(this.currentSection - 1, 0);

        this.scrollToSection();
        window.history.pushState(null, '', `#${this.sectionName}${this.currentSection}`);
    };

    private scrollToSection = () => {
        const section = document.getElementById(`${this.sectionName}${this.currentSection}`);

        if (!section) return;

        this.sectionYScroll = section.getBoundingClientRect().top + window.scrollY;

        window.scroll({
            top: this.sectionYScroll,
            behavior: "smooth"
        });
    };
}