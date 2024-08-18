import { Card } from "react-bootstrap";
export default function CardComp({ url, title, handlerClick}) {

    return (

        <Card className="mb-2 bg-dark text-white cardCom"
            style={{ width: '15rem' }}
            onClick={() => handlerClick(title)}
            >
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title className="text-center">{title}</Card.Title>
            </Card.Body>
        </Card>

    )
}