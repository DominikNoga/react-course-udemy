export default function CoreConcept({ image, title, description }) {
    return (
        <li>
            <img src={image} alt="alt" />
            <h3>{title}</h3>
            <p>{description}</p>
        </li>
    )
}

export default function CoreConcept2(props) {
    return (
        <li>
            <img src={props.image} alt="alt" />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </li>
    )
}
