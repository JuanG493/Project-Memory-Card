import { Card } from "react-bootstrap";
export default function CardComp({ url, title, info, handlerClick}) {

    return (

        <Card className="mb-2 bg-dark cardCom"
            style={{ width: '78%', }}
            onClick={() => handlerClick(title)}
            >
            <Card.Img variant="top" src={url} title={info}  />
            <Card.Body >
                <Card.Title className="text-center text-warning s-1 ">{title.split('-').join(' ').toUpperCase()}</Card.Title>
            </Card.Body>
        </Card>

    )
}