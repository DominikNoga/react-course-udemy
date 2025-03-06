import CoreConcept from '../CoreConcept/CoreConcept';
import { CORE_CONCEPTS } from '../../../../data/data';
import './core-concepts-list.css';

export default function CoreConceptsList() {
    return (
        <section id="core-concepts">
            <h2>Core Concepts</h2>
            <ul>
                {
                    CORE_CONCEPTS.map((concept, index) => 
                        <CoreConcept {...concept} key={index}/>
                    )
                }
            </ul>
        </section>
    )
}
