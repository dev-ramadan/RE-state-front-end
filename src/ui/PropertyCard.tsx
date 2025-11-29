import { Link } from "react-router"
type EstateCardPropse = {
    property :{
    image ?: string;
    address ?: string;
    price ?: string | number
    area ?: string | number
    name ?: string
}

}
const PropertyCard = ({property:{ image, address, price, area, name }}: EstateCardPropse) => {

    return (
        <>
            <Link to="/estateDetails" className="block rounded-lg p-4 shadow-xs shadow-indigo-100">
                <img
                    lang="lazy"
                    src={image}
                    alt={name}
                    className="h-56 w-full rounded-md  object-cover group-hover:scale-105 transition-transform"
                />
                <div className="p-3 space-y-1">
                    <h3 className="font-semibold text-gray-800">{name}</h3>
                    <p className="font-medium text-gray-800 ml-0.5"><span className="text-sm text-gray-400">Adderss : </span> {address}</p>
                    <p className="text-gray-500 text-sm"><span className="text-sm text-gray-400">Area :</span> {area}</p>
                    <p className="text-green-600 font-bold"><span className="text-sm text-gray-400">Price :</span> {price || '240,000'}</p>
                </div>
            </Link>

        </>
    )
}
export default PropertyCard