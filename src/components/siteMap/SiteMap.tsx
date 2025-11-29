type SiteMapProps = {
    lat: number;
    lng: number;
}
//lat = Latitude → خط العرض
//lng = Longitude → خط الطول
const SiteMap = ({ lat, lng }: SiteMapProps) => {

    return (
        <>
            {/* خريطة الموقع */}
            <section>
                <h2 className="text-lg font-semibold mb-3 text-left">Location on the map</h2>
                <div className="rounded-xl overflow-hidden shadow-md border">
                    <iframe
                        title="Property Location"
                        src={`https://www.google.com/maps?q=${lat},${lng}&hl=ar&z=15&output=embed`}
                        width="100%"
                        height="350"
                        loading="lazy"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>
        </>
    )
}
export default SiteMap