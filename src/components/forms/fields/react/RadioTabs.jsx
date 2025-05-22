import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/react/Tabs.tsx';
import { sleep } from '~/utils/misc';

const RadioTabsJS = ({ name, instruction, options, value }) => {

  const handleRadioTabsChange = async (updatedValue) => {
    while (true) {
      const radioButton = document.getElementById(`radio-${name}-${updatedValue}`);
      if (radioButton) {
        radioButton.checked = true;
        break;
      }
      await sleep(0.25);
    }
  };

  return (
    <Tabs id={`${name}-tabs`} defaultValue={value} onValueChange={handleRadioTabsChange} className="w-full">
      {
        instruction && (
          <div className="mt-6 mb-10 text-center">
            <span className="py-3">
              <i>{instruction}</i>
            </span>
          </div>
        )
      }
      <TabsList>
        {
          options.map(({ name: option_name, title, icon }) =>
            <TabsTrigger key={option_name} value={option_name}>
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
            </TabsTrigger>)
        }
      </TabsList>
      {
        options.map(({ name: option_name, label }) =>
          <TabsContent key={option_name} value={option_name}>
            <div className="mb-5 py-3 px-4 w-full text-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900">
              <div className="hidden">
                <input
                  type="radio"
                  id={`radio-${name}-${option_name}`}
                  name={name}
                  value={option_name}
                  {...(('' + value == '' + option_name)
                    ? { defaultChecked: true }
                    : {})
                  }
                />
              </div>
              <div className="px-3">
                <div className="my-5 py-3 px-4 w-full text-md rounded-lg bg-white dark:bg-slate-900">
                  {label}
                </div>
              </div>
            </div>
          </TabsContent>
        )
      }
    </Tabs>
  )
};

export default RadioTabsJS;
