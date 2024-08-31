import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import HomeCard from './HomeCard'
import { HomeDetails, HomeDetails1, HomeDetails10, HomeDetails11, HomeDetails12, HomeDetails14, HomeDetails15, HomeDetails16, HomeDetails2, HomeDetails4, HomeDetails5, HomeDetails6, HomeDetails7, HomeDetails8, HomeDetails9 } from './HomeDetails'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import BannerCard from './BannerCard'
import HomeCard1 from './HomeCard1'
import HomeCard2 from './HomeCard2'
import HrBox from './HrBox'
import HomeCard5, { HomeCard5a, HomeCard5b, HomeCard5c } from './HomeCard5'
import HomeCard6 from './HomeCard6'
import HomeCard7 from './HomeCard7'
import Footer from '../../components/Footer/Footer'
import HomeCard8 from './HomeCard8'

const Home = () => {
    return (
        <>
            <Box>
                <Navbar />
                <HomeCard type={HomeDetails} />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/Aug24/22-aug-24/blu/Desktop%20banner.png'}
                    alt={'Freelenses.jpg'} />
                <HomeCard1 type={HomeDetails1} />
                <Image
                    src="https://static1.lenskart.com/media/desktop/img/Apr22/Bannerforexport.jpg"
                    alt="img"
                    mt="10"
                />
                <HomeCard2 type={HomeDetails2} src="https://i.imgur.com/Gry0Q5D.png" />
                <HrBox content={'FREE PROGRESSIVE LENSES'} />
                <br />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/2024/may/prog/New%20Web%20Banner.jpg'}
                    alt={'PROGRESSIVE_LENSES.jpg'} />
                <br />
                <HrBox content={'BOOK EYE TEST AT HOME'} />
                <br />
                <BannerCard link={'https://static5.lenskart.com/media/uploads/hechome11.png'}
                    alt={'hOME_EYETEST.jpg'} />
                <br />
                <HrBox content={'FREE ONLINE EYE TEST'} />
                <br />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/2024/jun/eyetest/Turban-DesktopBanner.jpg'}
                    alt={'onlineEYEtEST.jpg'} />
                <br />
                <HrBox content={'PREMIUM EYE WEAR'} />
                <br />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/oct23/home/13-10-23/As%20seen%20on%20Desk.jpg'}
                    alt={'joHNjACOBS.jpg'} />
                <br />
                <HrBox content={'AS SEEN ON MOUNI ROY'} />
                <br />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/23may/cannes/web.gif'}
                    alt={'MouniRoy.gif'} />
                <br />
                <HrBox content={'AS SEEN ON SHARK TANK'} />
                <br />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif'}
                    alt={'SharkTank.gif'} />
                <br />
                <HrBox content={'AS SEEN ON KARAN JOHAR'} />
                <br />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/Dec22/Web_banner.gif'}
                    alt={'KaranJohar.gif'} />
                <br />
                <HrBox content={'TRENDING SUNGLASSES'} />
                <br />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/Jan23/sunglasses/Sun-Banner-web.gif'}
                    alt={'StylishGlasses.gif'} />
                <br />
                <HrBox content={'AQUACOLOR - GLAM UP WITH COLOR LENSES'} fs={'27px'} />
                <br />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/Oct22/kiara/Refresh-Banner-Web.gif'}
                    alt={'aquaColor.gif'} />
                <br />
                <HrBox content={'FIND THE PERFECT FIT'} />
                <br />
                <HomeCard5 />
                <br />
                <HrBox content={'CONTACT LENSES & MORE'} />
                <br />
                <HomeCard5a type={HomeDetails4} />
                <br />
                <HrBox content={'BUY IT YOUR WAY'} />\
                <br />
                <HomeCard5b type={HomeDetails5} />
                <br />
                <br />
                <br />
                <br />
                <HrBox content={'OUR BRANDS'} />
                <br />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/VC-Banner.jpg'}
                    alt={'Brands.jpg'} />
                <br />
                <HomeCard6 type={HomeDetails6} heading="EYEGLASSES" />
                <br />
                <br />
                <br />
                <HomeCard6 type={HomeDetails7} heading="SUNGLASSES" />
                <br />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/Nov22/Updated%20brand%20banner%20jj%20.jpg'}
                    alt={'johnJacobs.jpg'} />
                <br />
                <HomeCard6 type={HomeDetails6} heading="EYEGLASSES" />
                <br />
                <br />
                <br />
                <HomeCard6 type={HomeDetails7} heading="SUNGLASSES" />
                <br />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/Aug21/25-Aug/LK-AIR-Banner.jpg'}
                    alt={'lensKartAir.jpg'} />
                <br />
                <HomeCard6 type={HomeDetails16} heading="EYEGLASSES" />
                <br />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/Aug21/25-Aug/LK-Readers-Banner.jpg'}
                    alt={'lensKartReaders.jpg'} />
                <br />
                <HomeCard6 type={HomeDetails10} heading="EYEGLASSES" />
                <br />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/Banner05_Final2ndDec21.jpg'}
                    alt={'Hooper.jpg'} />
                <br />
                <HomeCard6 type={HomeDetails8} heading="WITH POWER COMPUTER BLU LENSES" />
                <br />
                <br />
                <HomeCard6
                    type={HomeDetails9}
                    heading="WITH ZERO POWER COMPUTER BLU LENSES"
                />
                <br />
                <BannerCard link={'https://static1.lenskart.com/media/desktop/img/June22/Our-Brands-Banner.jpg'}
                    alt={'aqualens.jpg'} />
                <br />
                <HomeCard6
                    type={HomeDetails11}
                    heading="CONTACT LENSES"
                />
                <br />
                <HomeCard6
                    type={HomeDetails12}
                    heading="COLOR CONTACT LENSES"
                />
                <br />
                <BannerCard link={'https://static5.lenskart.com/media/uploads/whatsapp-1.png'}
                    alt={'WhatsAppBAnner.jpg'} />
                <br />
                <HomeCard5c type={HomeDetails14} heading="MEET OUR HAPPY CUSTOMERS" />
                <HomeCard7/>
                <HomeCard8  type={HomeDetails15}/>
                <Footer/>
                







            </Box>

        </>
    )
}

export default Home