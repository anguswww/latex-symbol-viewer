import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
export default function Card() {
    return (
        <div className="bg-gray-600 p-10 py-7 rounded-md">
            
            <h1 className="">Card</h1>
            <Latex>$\rightarrow$</Latex>
        </div>
    )
}