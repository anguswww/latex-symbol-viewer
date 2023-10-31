import Latex from "react-latex-next";
import { FaCopy } from "react-icons/fa";
import { toast } from 'react-toastify';
import "katex/dist/katex.min.css";
export default function Card(props) {
    let symbol:string = "$"+props.symbol+"$";
    return (
        <div className="bg-slate-700 rounded-md shadow-md shadow-slate-800 text-center">
            <div className="text-5xl bg-slate-500 rounded-t py-4">
                <Latex>
                {symbol}
                </Latex>
            </div>
            <div className="flex flex-row p-2 w-full">
                <div><div className="bg-slate-900 font-mono text-center m-1 p-2 float-left align-middle flex-grow w-full rounded-l-lg">{symbol.substring(1,symbol.length-1)}</div></div>
                <div className="bg-sky-500 hover:bg-sky-400 m-1 p-3 text-center shadow float-right self-end w-10 rounded-r-lg" onClick={() => copy(symbol.substring(1,symbol.length-1))}><FaCopy/></div>
            </div>

        </div>
    )
}
function copy(str:string) {
    navigator.clipboard.writeText(str);
    toast("Copied to clipboard!");
}