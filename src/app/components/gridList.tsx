import Card from './card'

export default function GridList(props:any) {
    let jsx = props.json.map(
        (element:any, index:any) => (
            <div key={index}><Card symbol={element.symbol}/></div>
         )
     );
    return (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-6 gap-y-4 pb-3">
            {jsx}
        </div>
    )
}