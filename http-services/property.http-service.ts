class PropertyHttpService {
    private readonly baseURL
    public static instance: PropertyHttpService;

    constructor() {
        this.baseURL = 'https://api.example.com'; // TODO: Replace with your base URL
    }

    static getInstance() {
        if (!PropertyHttpService.instance) {
            PropertyHttpService.instance = new PropertyHttpService();
        }
        return PropertyHttpService.instance;
    }

    async get(path: string) {
        const response = await fetch(`${this.baseURL}${path}`);
        return response.json();
    }

    async post(path: string, data: {}) { // TODO: replace data with type
        const response = await fetch(`${this.baseURL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    // Add more methods as needed (PUT, DELETE, etc.)
}

export default PropertyHttpService.getInstance;
