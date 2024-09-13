import Province from "@/constants/province.constant";
import Suburb from "@/constants/suburb.constant";
import City from "@/constants/city.constant";

export default interface LocationModel {
    street: string;
    suburb: Suburb;
    city: City;
    province:Province;
}
