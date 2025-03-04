import componentsImg from '../../../../assets/components.png';
import CoreConcept from '../CoreConcept/CoreConcept';
import { CORE_CONCEPTS } from '../../../../data/core-concepts';

export default function CoreConceptsList() {
    return (
        <section id="core-concepts">
            <h2>Core Concepts</h2>
            <ul>
                {
                    CORE_CONCEPTS.map(concept => (
                        <CoreConcept {...concept} />
                    ))
                }
            </ul>
        </section>
    )
}
