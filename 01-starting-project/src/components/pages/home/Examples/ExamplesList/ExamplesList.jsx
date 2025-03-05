import React, { useState } from 'react'
import TabButton from '../TabButton/TabButton'
import { EXAMPLES } from '../../../../../data/data';

export default function ExamplesList() {
    const options = ['Components', 'JSX', 'Props', 'State'];
    const [selectedTopic, setSelectedTopic] = useState();
    const handleClick = (index) => {
        setSelectedTopic(index);
    };
    const selectedTab = selectedTopic !== undefined ? EXAMPLES[options[selectedTopic].toLocaleLowerCase()] : undefined;
    const isSelected = (index) => selectedTopic === index;

    return (
        <div id="examples">
            <h2>Examples</h2>
            <menu>
                {
                    options.map((option, index) =>
                        <TabButton 
                            isSelected={isSelected(index)} 
                            onClick={() => handleClick(index)} 
                            key={index}>{option}
                        </TabButton>
                    )
                }
            </menu>
            <div id="tab-content">
                {
                    selectedTab !== undefined ?
                        <>
                            <h3>
                                {
                                    selectedTab.title
                                }
                            </h3>
                            <p>
                                {
                                    selectedTab.description
                                }
                            </p>
                            <pre>
                                {
                                    selectedTab.code
                                }
                            </pre>
                        </>
                        : 'Select an option'
                }

            </div>
        </div>
    )
}
