import React, { useState } from 'react'
import TabButton from '../TabButton/TabButton'
import { EXAMPLES } from '../../../../../data/data';
import AppSection from '../../../../shared/AppSection/AppSection';
import AppTabs from '../../../../shared/AppTabs/AppTabs';

export default function ExamplesList() {
    const options = ['Components', 'JSX', 'Props', 'State'];
    const [selectedTopic, setSelectedTopic] = useState();
    const handleClick = (index) => {
        setSelectedTopic(index);
    };
    const selectedTab = selectedTopic !== undefined ? EXAMPLES[options[selectedTopic].toLocaleLowerCase()] : undefined;
    const isSelected = (index) => selectedTopic === index;

    return (
        <AppSection title='Examples' id='examples'>
            <AppTabs id="tab-content" buttons={
                <>
                    {
                        options.map((option, index) =>
                            <TabButton
                                isSelected={isSelected(index)}
                                onClick={() => handleClick(index)}
                                key={index}>{option}
                            </TabButton>
                        )
                    }
                </>
            }>
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
            </AppTabs>
        </AppSection>
    )
}
