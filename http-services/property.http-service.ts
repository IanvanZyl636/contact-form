import propertyListData from '@/data/property-list.data';

class PropertyHttpService {
    private readonly baseURL
    public static instance: PropertyHttpService;

    constructor() {
        this.baseURL = 'https://api.example.com';
    }

    static getInstance() {
        if (!PropertyHttpService.instance) {
            PropertyHttpService.instance = new PropertyHttpService();
        }
        return PropertyHttpService.instance;
    }

    async getPropertyList() {
        return new Promise<typeof propertyListData>((resolve) => {
            setTimeout(() => {
                resolve(propertyListData);
            }, 200);
        });
    }
}

export default PropertyHttpService.getInstance();
