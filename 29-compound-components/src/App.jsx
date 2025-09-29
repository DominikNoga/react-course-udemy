import Accordion from "./components/Accordion/Accordion";
import AccordionItem from "./components/AccordionItem/AccordionItem";

function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>
        <Accordion className="accordion">
          <AccordionItem className="accordion-item" title="We are leaders in our field">
            <article>
              <p>
                You cant go wrong with us.
              </p>
              <p>
                We have been in business for over 20 years and have a proven track record of success.
              </p>
            </article>
          </AccordionItem>
          <AccordionItem className="accordion-item" title="We are working with local guides">
            <article>
              <p>
                We are not doing this alone. From our office.
              </p>
              <p>
                Instead we work with local guides that know the area like the back of their hand.
              </p>
            </article>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}

export default App;
