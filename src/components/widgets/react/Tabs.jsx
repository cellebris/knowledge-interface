import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/react/Tabs.tsx';
import { useState, useEffect } from 'react';
import { sleep } from '~/utils/misc';

const TabsJS = ({ orientation, name, tabs, value }) => {
  const [elements, setElements] = useState({});

  const handleTabsChange = async (updatedValue) => {
    let content = null;
    let activeTab = null;

    while (true) {
      content = elements[updatedValue];
      activeTab = document.getElementById(`${updatedValue}-data`);
      if (activeTab && content) {
        break;
      }
      await sleep(0.25);
    }
    activeTab.appendChild(content);
  };

  useEffect(() => {
    async function initialize() {
      const loadedElements = {};
      const contents = document.getElementsByClassName(`${name}-content`);
      for (let index = 0; index < contents.length; index++) {
        const contentName = contents[index].dataset.name;
        const content = contents[index].getElementsByClassName("content-container")[0];
        loadedElements[contentName] = content;

        if (value == contentName) {
          let activeTab = null;

          while (true) {
            activeTab = document.getElementById(`${contentName}-data`);
            if (activeTab && content) {
              break;
            }
            await sleep(0.25);
          }
          activeTab.appendChild(content);
        }
      }
      setElements(loadedElements);
    }
    initialize();
  }, []);

  return (
    <Tabs id={`${name}-tabs-widget`} orientation={orientation} defaultValue={value} onValueChange={handleTabsChange} className="w-full">
      <TabsList orientation={orientation} className="border-b-2 py-5">
        {
          tabs.map(({ name: tabName, title, icon }) =>
            <TabsTrigger key={tabName} value={`${name}-${tabName}`} orientation={orientation}>
              <div className="">
                {icon && (
                  <img
                    src={icon}
                    className="h-12 inline"
                    loading="eager"
                  />
                )}
                <span className="text-med text-wrap">
                  {title}
                </span>
              </div>
            </TabsTrigger>
          )
        }
      </TabsList>
      {
        tabs.map(({ name: tabName }) =>
          <TabsContent key={tabName} value={`${name}-${tabName}`} orientation={orientation} asChild>
            <div id={`${name}-${tabName}-data`} className={`${name}-data`}></div>
          </TabsContent>
        )
      }
    </Tabs>
  )
};

export default TabsJS;
