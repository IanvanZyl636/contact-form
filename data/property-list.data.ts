import PropertyModel from "@/models/property.model";
import PropertyType from "@/constants/property-type.constant";
import SaleType from "@/constants/sale-type.constant";
import Province from "@/constants/province.constant";
import Suburb from "@/constants/suburb.constant";
import City from "@/constants/city.constant";

const propertyListData:Array<PropertyModel> = [
  {
    photos:[{
      isFeature: true,
      url: "/property-photos/vacant-land/Culture-Grumpy-Cat-487386121.jpg"
    }],
    description: `
      Perfect opportunity in a well developing area of Kookrus. This 8 921 square meters is ideal area to develop townhouses or subdivide and sell individual stands. Close to local amenities and easy access to Meyerton CBD and R59 onramp. Don't delay and contact me today!!
      \n\n    
      "PLEASE NOTE: Dolomite study report is a requirement for every piece of vacant land in Kookrus before building plans can be submitted. It's a new bylaw passed by Midvaal Municipality and entails a cost to the purchaser. If you intend to purchase with a bond, banks finance up to 60% on vacant land hence a 40% deposit will be required PLUS the bond and transfer costs.
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
    photos:[
      {
        isFeature: true,
        url: "/property-photos/house/jpg.jpg"
      },
      {
        isFeature: false,
        url: "/property-photos/house/koeksisters-recipe.jpg"
      }
    ],
    description: `
      Looking for a place to call home with low maintenance and everything move-in ready? This one has just come on the market!
      \n\n
      The home offers you everything you need!
      \n\n
      Features:
      \n\n
      Three bedrooms with BIC and main has walk-in dressing
      \n\n
      Two bathrooms with en being en-suite
      \n\n
      Double Garage
      \n\n
      8 solar panels
      \n\n
      10kwh lithium battery system
      \n\n
      SunSynk 8kwh inverter
      \n\n
      Lapa with built-in braai
      \n\n
      Security beams outside
      \n\n
      Lounge
      \n\n
      Open Plan Kitchen with scullery
      \n\n
      Call me today for a viewing!
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
    photos:[{
      isFeature: true,
      url: "/property-photos/vacant-land/Culture-Grumpy-Cat-487386121.jpg"
    }],
    description: `
      Lovely modern townhouse in RiverView Estate with 24HR security.
      \n\n
      This townhouse offers a luxurious experience.It consists of 3 bedrooms, 2 bathrooms, open plan living room and kitchen with modern finishes and granite tops, automated double garage,
      \n\n
      Its convenient location ensures easy access to all amenities. 2 mins drive to Engen and Shell petrol station, 2 mins drive to Pierneef Boulevard shopping center, 3 mins drive to Corgi shopping center, 2 mins drive to Meyerton high/secondary school and 5 mins drive to Meyerton SAPS.
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
    photos:[{
      isFeature: true,
      url: "/property-photos/vacant-land/Culture-Grumpy-Cat-487386121.jpg"
    }],
    description: `
      Lovely modern townhouse in RiverView Estate with 24HR security.
      \n\n
      This townhouse offers a luxurious experience.It consists of 3 bedrooms, 2 bathrooms, open plan living room and kitchen with modern finishes and granite tops, automated double garage,
      \n\n
      Its convenient location ensures easy access to all amenities. 2 mins drive to Engen and Shell petrol station, 2 mins drive to Pierneef Boulevard shopping center, 3 mins drive to Corgi shopping center, 2 mins drive to Meyerton high/secondary school and 5 mins drive to Meyerton SAPS.
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
