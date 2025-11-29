import type { ReactNode } from "react";

type CardDetilsPropse = {
    count?: string;
    title?: string;
    icon?: ReactNode;
    Hcolor?: string;
    Hfont?: string;
    Pfont?: string;
    width?:string;
    effect?:string;

}
const CardDetils = ({ count, title, Hcolor, Hfont, Pfont, icon, effect}: CardDetilsPropse) => {

    return (
        <>
            <div className={`shadow-md flex flex-col items-center justify-center h-32 bg-white rounded-lg w-full lg:w-72 border-2 border-gray-200 hover:${effect}`}>
                <span className="text-3xl space-y-6">{icon}</span>
                <div className={`flex flex-col items-center justify-center`}>
                    <h4 className={`text-${Hcolor} text-2xl font-${Hfont} mb-2`}>{count}</h4>
                    <p className={`text-gray-500 text-lg font-${Pfont} mb-2`}>{title}</p>
                </div>
            </div>
        </>
    )
}
export default CardDetils