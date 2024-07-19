export default class PageScrollService{
    private currentSection:number = 0;
    private sectionYScroll:number|null = null;
    private get currentScrollPosition(){return window.scrollY || document.documentElement.scrollTop}
    private get lastScrollTop(){return this._lastScrollTop}
    private set lastScrollTop(value:number){this._lastScrollTop = value <= 0 ? 0 : value}
    private _lastScrollTop = 0;

    constructor(private sectionName:string, private amountOfSections:number) {
        this.initializeCurrent();

        // window.addEventListener('scroll', this.handleScroll);
        // window.addEventListener('scrollend', this.handleScrollEnd);
        window.addEventListener('hashchange', this.handleHashChange);
    }

    destroy(){
        // window.removeEventListener('scroll', this.handleScroll);
        // window.removeEventListener('scrollend', this.handleScrollEnd);
        window.removeEventListener('hashchange', this.handleHashChange);
    }

    public scrollSection = (direction:'UP'|'DOWN') =>{
        if(direction === 'UP') this.currentSection = Math.min(this.currentSection + 1, this.amountOfSections - 1);

        if(direction === 'DOWN') this.currentSection = Math.max(this.currentSection - 1, 0);

        this.scrollToSection();
        window.history.pushState(null, '', `#${this.sectionName}${this.currentSection}`);
    };

    scrollToSectionIndex(index:number){
        this.currentSection = index;

        this.scrollToSection();
    }

    private initializeCurrent(){
        const hash = window.location.hash;

        if(hash) {
            this.scrollToHashSection();
            return;
        }

        this.scrollToY(0);
    }

    private scrollToY(y:number){
        window.scroll({
            top: y,
            behavior: "smooth"
        });
    }

    private handleScrollEnd = () => {
        if(this.sectionYScroll !== null){
            this.lastScrollTop = this.currentScrollPosition;
            this.sectionYScroll = null;

            return;
        }

        this.currentScrollPosition > this.lastScrollTop ? this.scrollSection('UP') : this.scrollSection('DOWN');

        this.lastScrollTop = this.currentScrollPosition;
    }

    private handleScroll = () =>{
        if(this.sectionYScroll !== null) return;

        this.currentScrollPosition > this.lastScrollTop ? this.scrollSection('UP') : this.scrollSection('DOWN');

        this.lastScrollTop = this.currentScrollPosition;
    }

    private handleHashChange = () => {
        this.scrollToHashSection();
    };

    private scrollToHashSection(){
        const hash = window.location.hash.replace('#', '').replace(`${this.sectionName}`, '');
        const sectionIndex = +hash;
        if (sectionIndex >= 0) {
            this.currentSection = sectionIndex;
            this.scrollToSection();
        }
    }

    private scrollToSection = (index?:number) => {
        const section = document.getElementById(`${this.sectionName}${index?index:this.currentSection}`);

        if (!section) return;

        this.sectionYScroll = section.getBoundingClientRect().top + window.scrollY;

        this.scrollToY(this.sectionYScroll);
    };
}