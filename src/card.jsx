import { Card } from "react-bootstrap";
export default function CardComp({ url, title, handlerClick}) {

    return (

        <Card className="mb-2 bg-dark cardCom"
            style={{ width: '70%' }}
            onClick={() => handlerClick(title)}
            >
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title className="text-center text-warning s-1">{title}</Card.Title>
            </Card.Body>
        </Card>

    )
}