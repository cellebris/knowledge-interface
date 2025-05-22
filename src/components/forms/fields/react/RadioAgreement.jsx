import { Choice, ChoiceOption } from '~/components/forms/fields/react/Choice.tsx';
import { sleep } from '~/utils/misc';

import { cn } from '~/utils/misc';

const RadioAgreementJS = ({ name, instruction, value }) => {

  const sentimentOptions = [
    {
      assignedValue: "-3",
      label: "Strongly<br/>Disagree",
      style: "bg-red-300 border-2 border-red-500",
      activeStyle: "data-[state=checked]:font-bold data-[state=checked]:bg-white data-[state=checked]:border-red-700 data-[state=checked]:ring-4 data-[state=checked]:ring-red-700",
    },
    {
      assignedValue: "-2",
      label: "Disagree",
      style: "bg-red-200 border-2 border-red-500",
      activeStyle: "data-[state=checked]:font-bold data-[state=checked]:bg-white data-[state=checked]:border-red-700 data-[state=checked]:ring-4 data-[state=checked]:ring-red-700",
    },
    {
      assignedValue: "-1",
      label: "Somewhat<br/>Disagree",
      style: "bg-red-100 border-2 border-red-500",
      activeStyle: "data-[state=checked]:font-bold data-[state=checked]:bg-white data-[state=checked]:border-red-700 data-[state=checked]:ring-4 data-[state=checked]:ring-red-700",
    },
    {
      assignedValue: "0",
      label: "Neither<br/>Agree or Disagree",
      style: "bg-neutral-100 border-2 border-gray-500",
      activeStyle: "data-[state=checked]:font-bold data-[state=checked]:bg-white data-[state=checked]:border-gray-700 data-[state=checked]:ring-4 data-[state=checked]:ring-neutral-700",
    },
    {
      assignedValue: "1",
      label: "Somewhat<br/>Agree",
      style: "bg-green-100 border-2 border-green-500",
      activeStyle: "data-[state=checked]:font-bold data-[state=checked]:bg-white data-[state=checked]:border-green-700 data-[state=checked]:ring-4 data-[state=checked]:ring-green-700",
    },
    {
      assignedValue: "2",
      label: "Agree",
      style: "bg-green-200 border-2 border-green-500",
      activeStyle: "data-[state=checked]:font-bold data-[state=checked]:bg-white data-[state=checked]:border-green-700 data-[state=checked]:ring-4 data-[state=checked]:ring-green-700",
    },
    {
      assignedValue: "3",
      label: "Strongly<br/>Agree",
      style: "bg-green-300 border-2 border-green-500",
      activeStyle: "data-[state=checked]:font-bold data-[state=checked]:bg-white data-[state=checked]:border-green-700 data-[state=checked]:ring-4 data-[state=checked]:ring-green-700",
    }
  ]

  const handleRadioAgreementChange = async (updatedValue) => {
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
    <Choice defaultValue={value} onValueChange={handleRadioAgreementChange} className="w-full">
      {
        instruction && (
          <div className="my-6 text-center">
            <span className="text-lg">
              {instruction}
            </span>
          </div>
        )
      }
      <div class="w-full flex justify-center">
        {
          sentimentOptions.map(({ assignedValue, label, style, activeStyle }) =>
            <ChoiceOption
              key={assignedValue}
              id={`choice-${name}-${assignedValue}`}
              value={assignedValue}
              className={cn(
                "min-w-20 min-h-20 max-w-30 max-h-30 break-all text-sm align-middle",
                style,
                "hover:bg-gray-100 hover:ring-blue-400 hover:ring-2 hover:font-bold",
                activeStyle
              )}
            >
              <div className="px-2">
                <div className="hidden">
                  <input
                    type="radio"
                    id={`radio-${name}-${assignedValue}`}
                    name={name}
                    value={assignedValue}
                    {...(('' + value == '' + assignedValue)
                      ? { defaultChecked: true }
                      : {})
                    }
                  />
                </div>
                <div dangerouslySetInnerHTML={{ __html: label }} />
              </div>
            </ChoiceOption>
          )
        }
      </div>
    </Choice>
  )
};

export default RadioAgreementJS;
