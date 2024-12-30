import PropertyModel from "@/models/property.model";
import PropertyType from "@/constants/property-type.constant";
import SaleType from "@/constants/sale-type.constant";
import Province from "@/constants/province.constant";
import Suburb from "@/constants/suburb.constant";
import City from "@/constants/city.constant";

const propertyListData: Array<PropertyModel> = [
    {
        id: 'e249c1a7-2df4-44d7-817a-566708b46820',
        photos: [{
            isFeature: true,
            url: "/property-photos/vacant-land/Culture-Grumpy-Cat-487386121.jpg"
        }],
        description: `
    <div>Looking for a place to call home with low maintenance and everything move-in ready?
                                This
                                one has just come on the market!
                            </div>
                            <div>The home offers you everything you need!</div>
                            <div>
                                Features:
                                <ul>
                                    <li>Three bedrooms with BIC and main has walk-in dressing</li>
                                    <li>Two bathrooms with en being en-suite</li>
                                    <li>Double Garage</li>
                                    <li>8 solar panels</li>
                                    <li>10kwh lithium battery system</li>
                                    <li>SunSynk 8kwh inverter</li>
                                    <li>Lapa with built-in braai</li>
                                    <li>Security beams outside</li>
                                    <li>Lounge</li>
                                    <li>Open Plan Kitchen with scullery</li>
                                </ul>
                            </div>
                            <div> Call me today for a viewing!</div>
    `,
        price: 695000,
        bedroomAmount: 0,
        garageAmount: 0,
        bathroomAmount: 0,
        parkingSpaces: 0,
        erfSize: 8921,
        floorSize: 0,
        availabilityInMonths: 0,
        hasGarden: false,
        hasPool: true,
        isInSecurityEstate: false,
        isPetFriendly: false,
        propertyType: PropertyType.vacantLandOrPlot,
        saleType: SaleType.forSale,
        location: {
            street: '32 Totius Street',
            suburb: Suburb.KOOKRUS,
            city: City.MEYERTON,
            province: Province.GT
        }
    },
    {
        id: '791a925e-dc58-4b59-914d-c0d81e2bf9e2',
        photos: [
            {
                isFeature: true,
                url: "/property-photos/house/jpg.jpg"
            },
            {
                isFeature: false,
                url: "/property-photos/house/koeksisters-recipe.jpg"
            }
        ],
        description: `<div>Looking for a place to call home with low maintenance and everything move-in ready?
                                This
                                one has just come on the market!
                            </div>
                            <div>The home offers you everything you need!</div>
                            <div>
                                Features:
                                <ul>
                                    <li>Three bedrooms with BIC and main has walk-in dressing</li>
                                    <li>Two bathrooms with en being en-suite</li>
                                    <li>Double Garage</li>
                                    <li>8 solar panels</li>
                                    <li>10kwh lithium battery system</li>
                                    <li>SunSynk 8kwh inverter</li>
                                    <li>Lapa with built-in braai</li>
                                    <li>Security beams outside</li>
                                    <li>Lounge</li>
                                    <li>Open Plan Kitchen with scullery</li>
                                </ul>
                            </div>
                            <div> Call me today for a viewing!</div>
    `,
        price: 1368000,
        bedroomAmount: 3,
        garageAmount: 2,
        bathroomAmount: 2,
        parkingSpaces: 2,
        erfSize: 8921,
        floorSize: 136,
        availabilityInMonths: 0,
        hasGarden: true,
        hasPool: false,
        isInSecurityEstate: false,
        isPetFriendly: true,
        propertyType: PropertyType.house,
        saleType: SaleType.forSale,
        location: {
            street: '30 Totius Street',
            suburb: Suburb.KOOKRUS,
            city: City.MEYERTON,
            province: Province.GT
        }
    },
    {
        id: '3a34446f-798f-4f7b-a394-2d57a13ac6cd',
        photos: [{
            isFeature: true,
            url: "/property-photos/vacant-land/Culture-Grumpy-Cat-487386121.jpg"
        }],
        description: `<div>Looking for a place to call home with low maintenance and everything move-in ready?
                                This
                                one has just come on the market!
                            </div>
                            <div>The home offers you everything you need!</div>
                            <div>
                                Features:
                                <ul>
                                    <li>Three bedrooms with BIC and main has walk-in dressing</li>
                                    <li>Two bathrooms with en being en-suite</li>
                                    <li>Double Garage</li>
                                    <li>8 solar panels</li>
                                    <li>10kwh lithium battery system</li>
                                    <li>SunSynk 8kwh inverter</li>
                                    <li>Lapa with built-in braai</li>
                                    <li>Security beams outside</li>
                                    <li>Lounge</li>
                                    <li>Open Plan Kitchen with scullery</li>
                                </ul>
                            </div>
                            <div> Call me today for a viewing!</div>
    `,
        price: 1582500,
        bedroomAmount: 3,
        garageAmount: 2,
        bathroomAmount: 2,
        parkingSpaces: 2,
        erfSize: 800,
        floorSize: 156,
        availabilityInMonths: 0,
        hasGarden: true,
        hasPool: false,
        isInSecurityEstate: true,
        isPetFriendly: true,
        propertyType: PropertyType.townhouse,
        saleType: SaleType.forSale,
        location: {
            street: '33 Totius Street',
            suburb: Suburb.KOOKRUS,
            city: City.MEYERTON,
            province: Province.GT
        }
    },
    {
        id: '15cf2e56-f7fd-4191-ba3a-7dbe84093377',
        photos: [{
            isFeature: true,
            url: "/property-photos/vacant-land/Culture-Grumpy-Cat-487386121.jpg"
        }],
        description: `<div>Looking for a place to call home with low maintenance and everything move-in ready?
                                This
                                one has just come on the market!
                            </div>
                            <div>The home offers you everything you need!</div>
                            <div>
                                Features:
                                <ul>
                                    <li>Three bedrooms with BIC and main has walk-in dressing</li>
                                    <li>Two bathrooms with en being en-suite</li>
                                    <li>Double Garage</li>
                                    <li>8 solar panels</li>
                                    <li>10kwh lithium battery system</li>
                                    <li>SunSynk 8kwh inverter</li>
                                    <li>Lapa with built-in braai</li>
                                    <li>Security beams outside</li>
                                    <li>Lounge</li>
                                    <li>Open Plan Kitchen with scullery</li>
                                </ul>
                            </div>
                            <div> Call me today for a viewing!</div>
    `,
        price: 10500,
        bedroomAmount: 3,
        garageAmount: 2,
        bathroomAmount: 2,
        parkingSpaces: 2,
        erfSize: 800,
        floorSize: 156,
        availabilityInMonths: 0,
        hasGarden: true,
        hasPool: false,
        isInSecurityEstate: true,
        isPetFriendly: true,
        propertyType: PropertyType.townhouse,
        saleType: SaleType.toRent,
        location: {
            street: '33 Totius Street',
            suburb: Suburb.KOOKRUS,
            city: City.MEYERTON,
            province: Province.GT
        }
    },
]

export default propertyListData;
