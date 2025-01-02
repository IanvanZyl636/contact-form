'use client'

import YoutubePlayer from "@/components/common/video/youtube-player";
import H1 from "@/components/ui/typography/h1";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Banknote, Car, ChartNoAxesCombined, Check, MapPin, School, ShoppingBag, Stethoscope} from 'lucide-react'
import FeatureHighlight from "@/components/common/features/feature-highlight/feature-highlight";
import FeatureHighlightItem from "@/components/common/features/feature-highlight/feature-highlight-item";
import PhotoCarousel from "@/components/common/image/photo-carousel";
import StripeListItem, {StripeListItemProps} from "@/app/investment/[estateType]/components/stripe-list-item";
import Image from "next/image";
import TextParagraph from "@/components/ui/typography/text-paragraph";
import PlaceOfInterestListItem from "@/app/investment/[estateType]/components/place-of-interest-list-item";

const stripeListItems: StripeListItemProps[] = [
    {
        title: 'Unit size',
        value: '110m²'
    },
    {
        title: 'Yard size',
        value: '210m²'
    },
    {
        title: 'Approx. monthly rental income',
        value: 'R9 500'
    },
    {
        title: 'Monthly bond repayment @30yr, 11.50% from',
        value: 'R8 903'
    },
    {
        title: 'Approx. monthly levy from',
        value: 'R4 529'
    },
    {
        title: 'Approx. monthly rates from',
        value: 'R2 346'
    },
]

const photos = [
    '/property-photos/house/jpg.jpg',
    '/property-photos/house/koeksisters-recipe.jpg',
]

export default function PageContainer() {
    const [photoGallaryIndex, setPhotoGallaryIndex] = useState<number | undefined>(undefined);

    return (
        <div>
            <div className={'relative'}>
                <YoutubePlayer videoId={'Qk7L8ZdN2uc'}/>
                <div className={'absolute bottom-0 left-0 w-full bg-red-800 flex flex-row justify-evenly z-20 p-2'}>
                    <div>
                        <p className={'p-0 m-0 text-2xl font-bold text-primary-foreground'}>2 bedroom & 2 bathroom
                            townhouse at R799 000</p>
                    </div>
                    <div>
                        <p className={'p-0 m-0 text-2xl font-bold text-primary-foreground'}>3 bedroom & 2 bathroom
                            townhouse at R899 000</p>
                    </div>
                </div>
            </div>
            <div className={'page-section'}>
                <div className={'flex flex-col h-full'}>
                    <div className={'py-4 bg-secondary'}>
                        <FeatureHighlight className={'property-container-fluid mx-auto'}>
                            <FeatureHighlightItem icon={MapPin} title={'Kookrus'}
                                                  text={'Meyerton, Gauteng'}></FeatureHighlightItem>
                            <FeatureHighlightItem icon={Banknote} title={'Priced From'}
                                                  text={'R799 000 - R899 000'}></FeatureHighlightItem>
                            <FeatureHighlightItem icon={ChartNoAxesCombined} title={'Gross Return on Investment'}
                                                  text={'Up to 50%'}></FeatureHighlightItem>
                        </FeatureHighlight>
                    </div>
                    <div className={'flex flex-col gap-2 justify-evenly text-center h-full'}>
                        <div>
                            <H1>RIVERVIEW ESTATE</H1>
                        </div>
                        <div>
                            <span className={'text-3xl'}>KOOKRUS | MEYERTON | GAUTENG</span>
                        </div>
                        <div>
                            <span className={'text-3xl font-bold'}>GET READY TO INVEST IN YOUR FUTURE</span>
                        </div>
                        <div>
                            Welcome to Riverview estate, a quality residential development in the well-established
                            and
                            popular area of Kookrus, Meyerton in Gauteng.<br/><br/>
                            Offering easy access to public transport, shopping centers, and exceptional medical care
                            facilities.<br/><br/>
                            Perfectly suited for those in search of a secure and comfortable home.
                        </div>
                        <div>
                            <Button size={'lg'} className={'text-lg'} type={'button'}>ENQUIRE NOW</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'page-section bg-secondary flex flex-col lg:justify-center py-12'}>
                <div className={'grid lg:grid-cols-2 grid-cols-1 gap-12 w-full'}>
                    <div>
                        <PhotoCarousel className={'lg:rounded-r-lg overflow-hidden'}
                                       photoUrls={photos}/>
                    </div>
                    <div className={'pr-12 flex flex-col gap-6'}>
                        <div className={'text-3xl text-center uppercase'}>One bedroom | one bathroom | two garage</div>
                        <div className={'text-3xl text-center font-bold uppercase'}>Priced at R899 000</div>
                        <div
                            className={'bg-primary text-primary-foreground p-4 rounded-lg overflow-hidden font-bold flex flex-row justify-center gap-2'}>
                            <div className={'flex flex-col justify-center'}>
                                <div>
                                    <Check size={25} strokeWidth={3}></Check>
                                </div>
                            </div>
                            <div className={'flex flex-col justify-center'}>
                                <div>Bond and transfer fees included</div>
                            </div>
                        </div>
                        <div className={'flex flex-col gap-6 grow'}>
                            {stripeListItems.map((stripeListItem, index) => <StripeListItem
                                key={`stripe-list-item${index}`} className={'text-xl'} {...stripeListItem}/>)}
                        </div>
                        <div className={'flex flex-row justify-center'}>
                            <Button size={'lg'} className={'text-lg'} type={'button'}>ENQUIRE NOW</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'bg-primary-foreground page-section flex flex-col lg:justify-center py-12'}>
                <div className={'grid lg:grid-cols-2 grid-cols-1 gap-12 w-full'}>
                    <div className={'pl-12 flex flex-col gap-6'}>
                        <div className={'text-3xl text-center uppercase'}>One bedroom | one bathroom | two garage</div>
                        <div className={'text-3xl text-center font-bold uppercase'}>Priced at R899 000</div>
                        <div
                            className={'bg-primary text-primary-foreground p-4 rounded-lg overflow-hidden font-bold flex flex-row justify-center gap-2'}>
                            <div className={'flex flex-col justify-center'}>
                                <div>
                                    <Check size={25} strokeWidth={3}></Check>
                                </div>
                            </div>
                            <div className={'flex flex-col justify-center'}>
                                <div>Bond and transfer fees included</div>
                            </div>
                        </div>
                        <div className={'flex flex-col gap-6 grow'}>
                            {stripeListItems.map((stripeListItem, index) => <StripeListItem
                                key={`stripe-list-item${index}`} className={'text-xl'} {...stripeListItem}/>)}
                        </div>
                        <div className={'flex flex-row justify-center'}>
                            <Button size={'lg'} className={'text-lg'} type={'button'}>ENQUIRE NOW</Button>
                        </div>
                    </div>
                    <div>
                        <PhotoCarousel className={'lg:rounded-l-lg overflow-hidden'}
                                       photoUrls={photos}/>
                    </div>

                </div>
            </div>
            <div className={'page-section bg-secondary relative p-12'}>
                <Image src={'/kitchen.jpg'}
                       alt={`kitchen`}
                       fill
                       draggable={false}
                       className={'select-none '}
                       style={{objectFit: 'cover', objectPosition: 'center'}}/>
                <div
                    className={'absolute top-0 left-0 h-full w-full lg:background-text-left background-text-center'}></div>
                <div className={'flex flex-row'}>
                <div className={'relative z-20 lg:w-1/2 flex flex-col gap-6 justify-center'}>
                    <div className={'text-3xl uppercase'}>
                        Unmatched Features for Modern Living
                    </div>
                    <div className={'text-3xl font-bold uppercase'}>
                        Experience the Perfect Blend of Style, Comfort, and Functionality
                    </div>
                    <div>
                        Discover a home that redefines modern living, thoughtfully designed with features that cater to
                        convenience and contemporary tastes:
                    </div>
                    <div>
                        <ul className={'ul-gap-2'}>
                            <li>
                                <b>Granite Countertops:</b> Elegant and durable surfaces that elevate your kitchen&apos;s
                                appeal.
                            </li>
                            <li>
                                <b>Built-in Cupboards:</b> Maximized storage solutions for a clutter-free lifestyle.
                            </li>
                            <li>
                                <b>Built-in Stove and Oven with Extractor Fan:</b> A fully equipped kitchen ready for
                                your
                                culinary creations.
                            </li>
                            <li>
                                <b>Space for Appliances:</b> Dedicated areas for a washing machine, dishwasher, and
                                dryer,
                                ensuring effortless laundry and cleaning.
                            </li>
                            <li>
                                <b>Open-Plan Living:</b> Seamlessly designed spaces adorned with modern tiles
                                throughout,
                                promoting an airy and connected ambiance.
                            </li>
                            <li>
                                <b>Fibre-Ready Connectivity:</b> Stay ahead with high-speed internet access for work and
                                entertainment.
                            </li>
                            <li>
                                <b>Modern Fittings and Finishes:</b> Sleek and stylish details that add a touch of
                                sophistication to every corner.
                            </li>
                            <li>
                                <b>Prepaid Electricity Meters:</b> Convenient and efficient energy management for your
                                household.
                            </li>
                        </ul>
                    </div>
                    <div>
                        With these standout features, your investment guarantees a lifestyle of ease, beauty, and
                        practicality, perfectly suited to contemporary living standards in Meyerton, Gauteng.
                    </div>
                </div>
                </div>
            </div>
            <div className={'page-section p-12'}>
                <div className={'property-container-fluid mx-auto flex flex-col gap-6 justify-center h-full'}>
                    <div className={'text-3xl text-center uppercase'}>
                        Unlock the Potential: Your ROI at a Glance
                    </div>
                    <div className={'text-3xl text-center font-bold uppercase'}>
                        Discover How Your Investment Can Work for You
                    </div>
                    <div>
                        Understanding the potential return on investment is essential when making property decisions.
                        This section highlights how your capital investment compares to the annual rental income,
                        ensuring you make informed decisions about your financial future.
                    </div>
                    <table className={'rounded-lg overflow-hidden'}>
                        <thead>
                        <tr>
                            <th>
                                Unit Option
                            </th>
                            <th>
                                Investment
                            </th>
                            <th>
                                Monthly Rental Income
                            </th>
                            <th>
                                Annual Rental Income
                            </th>
                            <th>
                                Annual ROI (%)
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>2 Bedroom 2 Bathroom 2 Garage</td>
                            <td>R900 000</td>
                            <td>R7 500</td>
                            <td>R90 000</td>
                            <td>10%</td>
                        </tr>
                        <tr>
                            <td>3 Bedroom 2 Bathroom 2 Garage</td>
                            <td>R1 100 000</td>
                            <td>R9 500</td>
                            <td>R114 000</td>
                            <td>10.36%</td>
                        </tr>
                        </tbody>
                    </table>
                    <div>
                        The development of Riverstone Mall will significantly boost property values in Meyerton. As a
                        major retail and entertainment hub, the mall will attract more residents, businesses, and
                        visitors, leading to higher demand for nearby properties. This increased demand will drive
                        property appreciation, making it an excellent time to invest. Additionally, rental income
                        potential will rise as more people seek accommodation in the area. With property values and
                        rental rates set to increase, investing near Riverstone Mall offers both short-term rental
                        returns and long-term capital growth opportunities.
                    </div>
                    <div>
                        Ready to invest in a property that works for you? Contact us today to learn more about
                        opportunities tailored to your financial goals.
                    </div>
                    <div className={'flex flex-row justify-center'}>
                        <Button size={'lg'} className={'text-lg'} type={'button'}>ENQUIRE NOW</Button>
                    </div>
                </div>
            </div>
            <div className={'page-section p-12 bg-secondary'}>
                <div className={'flex flex-row h-full gap-12'}>
                    <div className={'flex-1 flex flex-col gap-6'}>
                        <div className={'text-3xl uppercase'}>
                            Location That Offers the Best of Both Worlds
                        </div>
                        <div className={'text-3xl font-bold uppercase'}>
                            Conveniently Connected, Comfortably Away
                        </div>
                        <div>
                            <TextParagraph>
                                Nestled in the tranquil town of Meyerton, this estate offers the perfect balance between
                                peaceful suburban living and city accessibility. Just minutes away from the major
                                highway, you’ll enjoy seamless connectivity to Johannesburg and surrounding areas. This
                                location is ideal for those seeking to escape the city&apos;s hustle while remaining close
                                enough for daily commutes or quick trips.
                            </TextParagraph>
                        </div>
                        <div>
                            <TextParagraph>
                                Meyerton also boasts top-tier medical facilities, providing residents with peace of
                                mind. The estate’s proximity to reputable hospitals and clinics ensures that quality
                                healthcare is never far from home.
                            </TextParagraph>
                        </div>
                        <div>
                            <TextParagraph>
                                With convenient access to modern conveniences, schools, shopping, and nature, this
                                estate is not just a place to live, it’s a lifestyle upgrade.
                            </TextParagraph>
                        </div>
                        <div className={'card w-full aspect-ratio-16-9'}>
                            map
                        </div>
                    </div>
                    <div className={'flex-1 flex-col gap-6 flex'}>
                        <PlaceOfInterestListItem placeOfInterest={{
                            icon: Car, title: 'TRAVEL', items: [
                                {title: 'R59 Highway', value: '2 KM'}
                            ]
                        }}></PlaceOfInterestListItem>
                        <PlaceOfInterestListItem placeOfInterest={{
                            icon: School, title: 'EDUCATION', items: [
                                {title: 'R59 Highway', value: '2 KM'},
                                {title: 'R59 Highway', value: '2 KM'},
                                {title: 'R59 Highway', value: '2 KM'},
                                {title: 'R59 Highway', value: '2 KM'},
                            ]
                        }}></PlaceOfInterestListItem>
                        <PlaceOfInterestListItem placeOfInterest={{
                            icon: ShoppingBag, title: 'RECREATION & SHOPPING', items: [
                                {title: 'R59 Highway', value: '2 KM'},
                                {title: 'R59 Highway', value: '2 KM'},
                                {title: 'R59 Highway', value: '2 KM'},
                                {title: 'R59 Highway', value: '2 KM'},
                            ]
                        }}></PlaceOfInterestListItem>
                        <PlaceOfInterestListItem placeOfInterest={{
                            icon: Stethoscope, title: 'MEDICAL', items: [
                                {title: 'R59 Highway', value: '2 KM'},
                                {title: 'R59 Highway', value: '2 KM'},
                                {title: 'R59 Highway', value: '2 KM'},
                                {title: 'R59 Highway', value: '2 KM'},
                            ]
                        }}></PlaceOfInterestListItem>
                    </div>
                </div>
            </div>
            {/*<div>*/}
            {/*    Return on investment breakdown*/}
            {/*</div>*/}
            <div className={'page-section relative flex flex-row justify-end '}>
                <Image src={'/Riverstone-Mall-Meyerton.jpg'}
                       alt={`Riverstone mall`}
                       fill
                       draggable={false}
                       className={'select-none '}
                       style={{objectFit: 'cover', objectPosition: 'center'}}/>
                <div
                    className={'absolute top-0 left-0 h-full w-full lg:background-text-right background-text-center'}></div>
                <div className={'lg:w-1/2 relative z-10 flex flex-col gap-6 p-12 justify-center'}>
                    <div className={'text-3xl uppercase'}>Invest in the Future</div>
                    <div className={'text-3xl uppercase'}>
                        Riverstone Mall, Meyerton&apos;s New Landmark
                    </div>
                    <div className={'text-3xl font-bold uppercase'}>A R370 million Development That’s
                        Shaping Meyerton&apos;s Growth
                    </div>
                    <div>
                        <TextParagraph>
                            Riverstone Mall is set to redefine the landscape of Meyerton, Gauteng, as a
                            state-of-the-art
                            shopping and lifestyle destination. Strategically located in the heart of Meyerton, this
                            premier development promises to elevate the value of surrounding properties and create
                            an
                            unmatched investment opportunity for homeowners and developers alike.
                        </TextParagraph>
                    </div>
                    <div>
                        <TextParagraph>
                            With a variety of retail outlets, restaurants, and entertainment spaces, Riverstone Mall
                            is
                            not just a shopping center but a hub for community and commerce. The development is
                            expected
                            to attract both local and international brands, boosting economic activity in the area
                            and
                            making Meyerton a focal point for growth in Gauteng.
                        </TextParagraph>
                    </div>
                    <div>
                        <TextParagraph>
                            Investing in properties near Riverstone Mall means more than just securing a home—it’s
                            about
                            securing your future. As the mall nears completion, demand for nearby real estate is
                            projected to rise significantly, offering excellent returns on investment.
                        </TextParagraph>
                    </div>
                    <div>
                        <TextParagraph>
                            Don&apos;t miss out on this chance to be part of Meyerton’s thriving future. Secure your
                            place now and reap the rewards of this transformative development.
                        </TextParagraph>
                    </div>
                </div>
            </div>
            <div className={'py-6 bg-primary-foreground'}>
                <div className={'property-container-fluid mx-auto'}>
                    <PhotoCarousel
                        photoUrls={(photos.map((photo) => photo)) ?? []}
                        fullScreenOnly={true}
                        fullScreenIndex={photoGallaryIndex} onFullScreenChange={(isFullScreen) => {
                        !isFullScreen ? setPhotoGallaryIndex(undefined) : null
                    }}></PhotoCarousel>
                    <div className={'flex flex-col gap-6'}>
                        <div className={'text-3xl text-center font-bold'}>Gallery</div>
                        <div className={'md:rounded-lg overflow-hidden flex flex-row gap-4'}>
                            {photos.map((photo, index) => (
                                <div key={`gallery-photo${index}`}
                                     className={'w-1/4 cursor-pointer'}
                                     onClick={() => setPhotoGallaryIndex(index)}
                                >
                                    <div className={'w-full pb-[70%] relative'}>
                                        <Image
                                            src={photo}
                                            alt={`Photo ${index}`}
                                            fill
                                            draggable={false}
                                            className={'select-none'}
                                            style={{objectFit: 'cover', objectPosition: 'center'}}/>
                                    </div>
                                </div>
                            ))}
                            {photos.map((photo, index) => (
                                <div key={`gallery-photo${index}`}
                                     className={'w-1/4 cursor-pointer'}
                                     onClick={() => setPhotoGallaryIndex(index)}
                                >
                                    <div className={'w-full pb-[70%] relative'}>
                                        <Image
                                            src={photo}
                                            alt={`Photo ${index}`}
                                            fill
                                            draggable={false}
                                            className={'select-none'}
                                            style={{objectFit: 'cover', objectPosition: 'center'}}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}