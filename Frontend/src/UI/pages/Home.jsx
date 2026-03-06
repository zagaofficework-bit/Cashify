import NavMenu from "../components/NavMenu";
import NavBar from "../components/NavBar";
import BuyRefurbishedDevices from "../components/BuyRefurbishedDevices";
import RefurbishedLaptops from "../components/RefurbishedLaptops";
import Feedback from "../components/Feedback";
import FAQ from "../components/FAQ";
import DownloadAppBanner from "../components/DownloadAppBanner";
import Info from "../components/Info";


export default function Home(){
    return (<>
    <NavBar/>
    <NavMenu/>
    <BuyRefurbishedDevices/>
    <RefurbishedLaptops/>
    <Feedback/>
    <FAQ/>
    <DownloadAppBanner/>
    <Info/>
    </>)
}


