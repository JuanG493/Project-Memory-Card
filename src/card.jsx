import { Card } from "react-bootstrap";
export default function CardComp({ url, title, handlerClick }) {
    console.log(imgUrl);
    
    return (

        <Card style={{ width: '18rem' }} onClick={handlerClick}>
            {console.log(imgUrl)}
            <Card.Img variant="top" src={imgUrl} />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                {/* <Card.Text> */}
                {/* Some quick example text to build on the card title and make up the */}
                {/* bulk of the card's content. */}
                {/* </Card.Text> */}
                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>

    )
}