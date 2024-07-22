import React from 'react'
import ProductCard from '../product-card/ProductCard'
import Button from '../Button'
import Product from '../../model/Product'

export default function Home() {
    const acerAspireE5 = new Product({
        make: "Acer Aspire E5-532G",
        model: "NX.MZ2EX.022",
        price: 299,
        description: `Series: Aspire E5<br>Software: Linux<br>Processor series: Intel Celeron<br>Processor: Intel Celeron N3050 1.60 GHz, 2 MB cache<br>Memory, MB: 4096MB(1x4GB) 1600MHz<br>Memory slots: No free slot available<br>Memory type: DDR3L<br>Hard drive type: SATA<br>Hard drive, GB: 1000GB 5.4krpm<br>Display, inch: 15.6"(39.62 cm) <br> Display resolution: 1366×768 <br> Display type: Glare(Acer CineCrystal) <br> Video card: nVidia GeForce 920M <br> Video card, MB: 2048MB DDR3 <br> Optical drive: DVD + /-RW<br>Audio: Certified for Skype, Two built -in stereo speakers, Built -in digital microphone<br>    Network: Gigabit Ethernet<br>Wireless network: 802.11ac wireless LAN<br>    Bluetooth: Bluetooth 4.0<br>USB port: 2 USB 3.0 ports(one USB 3.0 port with power - off charging), 1 USB 2.0<br>HDMI port: HDMI<br>    Ethernet(RJ - 45) port: yes<br>Audio ports: 1 Headset / speaker jack <br> Card reader: SD Card Reader <br> Web camera, MP: HD webcam with 1280 x 720 resolution and 720p HD audio / video recording <br> Keyboard type: Full - sized Keyboard.BDS Cyrillic keyboard layout.<br> Security: Kensington lock slot <br> Battery, cell: 37 Wh 2500 mAh 14.8 V 4 - cell Li - ion battery pack, Battery life up to 5 hours, 3 - pin 45 W AC adapter <br> Color: White <br> Weight, kg: 2.40 kg`,
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.XYC6b-ZkrN_0DNM-mX-buwAAAA%26pid%3DApi&f=1&ipt=0ed0d7e487cf9920b24418554db7a5a5dbae62ddfc095ec517061f5a2e3e63fc&ipo=images"
    })
    const acerAspireS5 = new Product({
        make: "Acer Aspire S5-371 Ultrabook",
        model: "NX.GCHEX.016_RR",
        price: 320,
        description: `Series: Aspire S5<br>Software: Windows 10 Home 64-bit<br>Processor series: Intel Core i7<br>Processor: Intel Core i7-6500U 2.50 GHz, 4 MB cache<br>Memory, MB: 8192MB<br>Memory type: LPDDR3L<br>Hard drive type: SSD<br>Hard drive, GB: 256GB<br>Display, inch: 13.3" (33.78 cm)<br>Display resolution: 1920×1080<br>Display type: Anti-Glare<br>Video card: Intel HD Graphics 520<br>Audio: Acer TrueHarmony technology, Two built-in stereo speakers<br>Wireless network: 802.11ac/a/b/g/n wireless LAN<br>Bluetooth: Bluetooth 4.0<br>USB port: 2 USB 3.0, 1 USB Type-C port<br>HDMI port: HDMI<br>Audio ports: 1 Headphone/speaker jack<br>Card reader: SD Card Reader<br>Web camera, MP: Acer Crystal Eye HD webcam with 1280 x 720 resolution and 720p HD audio/video recording<br>Keyboard type: Standard Keyboard. BDS Cyrillic keyboard layout.<br>Windows OS: yes<br>Battery, cell: 45 Wh 4030 mAh 11.25 V 3-cell Li-ion battery, Battery life up to 11 hours<br>Color: Black<br>Weight, kg: 1.42 kg `,
        img: "https://shop.hadeco.eu/wp-content/uploads/sites/16/2017/01/p102682.jpg"
    })
    const lenovoIdeaPad = new Product({
        make: "Lenovo IdeaPad 700 15.6″ i7-6700HQ 80RU00LRBM",
        model: "IdeaPad 700",
        price: 799.0,
        description: `Processor name: Intel® Core™ i7-6700HQ up to 3.5GHz QuadCore<br>Processor: Intel Core i7<br>Video name: NVIDIA® GeForce™ GTX 950M 4GB<br>Video: nVidia GeForce<br>Memory: 8192<br>Hard drive Type: HDD<br>Disk size: 1000 GB<br>Screen size: 15.6" FullHD IPS (1920×1080) Antiglare<br>Screen resolution: 1920 x 1080 Pixels<br>Memory type: DDR4<br>Maximum capacity: 16384<br>Memory slots: 2<br>SSD slot: M.2 2280<br>Optical drive: DVD<br>LAN: 10/100/1000<br>WiFi standard: 802.11a/c<br>Operating system name: DOS<br>Operating system: DOS<br>Bluetooth: Yes<br>USB 2.0: 1<br>USB 3.0: 2<br>RJ-45 (LAN): Yes<br>VGA output: Yes<br>HDMI output: Yes<br>Card reader: 4-in-1 (SD/MMC...)<br>Battery: 4-cell<br>Battery life (hours): up to 4 hours<br>Weight: 2.3<br>Color: Black<br>Warranty: 2 years<br>Security option: Kensington Lock Slot<br>Built-in camera: 720p HD webcam`,
        img: "https://cdn.x-kom.pl/i/setup/images/prod/big/product-small,,pr_2016_2_23_15_14_29_102.jpg",
    }

    )

    const products = [acerAspireE5, acerAspireS5, lenovoIdeaPad]

    return (
        <div className='row'>
            {
                products.map((product, index) => (
                    <div className='col' key={index}>
                        <ProductCard product={product} />
                    </div>
                ))
            }
            {/* <div className='col col-lg-3'>
                <Button color='prominent'>Test </Button>
                <Button color='warning'>Test </Button>
            </div>
            <div className='col col-lg-3'>
                <Button color='prominent' outline='1'>Test outlined</Button>
                <Button color='info' outline='1'>Test outlined</Button>
                <Button color='danger' outline='1'>Test outlined</Button>
                <Button color='success' outline='1'>Test outlined</Button>
            </div> */}
        </div>
    )
}