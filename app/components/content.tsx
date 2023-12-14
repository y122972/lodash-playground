import { TextArea } from "@radix-ui/themes";
import lodash from "lodash"

const getLink = (key: string) => {
  return `https://lodash.com/docs/${lodash.VERSION}#${key}`;
};

interface Props {
  args: any[];
  argsError: string;
  current: string
  params: string;
  onParamsChange: (params: string) => void;
}

export default function Content({ args, argsError, current, params, onParamsChange }: Props) {
  const currentKey = current as keyof typeof lodash;

  if (typeof lodash[currentKey] === "function") {
    let result = "-";

    try {
      result = (lodash[currentKey] as Function)(...args);

      if (typeof result === "object") {
        result = JSON.stringify(result, null, 2);
      } else {
        result = result.toString();
      }
    } catch (e: any) {
      result = e.toString();
    }

    return (
      <div>
        <a
          href={getLink(currentKey)}
          className="underline text-blue-500"
          target="_blank"
        >
          {currentKey}
        </a>
        <TextArea
          placeholder={`Params. Example: "[1], 2, [3]"(if the function is lodash.concat)`}
          className="mt-4"
          value={params}
          onChange={(e) => onParamsChange(e.target.value)}
        />
        {argsError && (
          <div className="whitespace-pre bg-red-800 text-gray-200 p-3 rounded mt-4">
            {argsError}
          </div>
        )}
        <div className="whitespace-pre bg-gray-700 text-gray-200 p-3 rounded mt-4">
          {`lodash.${currentKey}(${params})`}
        </div>
        <div className="whitespace-pre bg-cyan-900 text-gray-100 p-3 rounded mt-4">
          {result}
        </div>
      </div>
    );
  }

  if (typeof lodash[currentKey] === "object") {
    return (
      <div className="whitespace-pre bg-gray-700 text-gray-200 p-3 rounded">
        {JSON.stringify(lodash[currentKey], null, 2)}
      </div>
    );
  }

  return lodash[currentKey].toString();
}
