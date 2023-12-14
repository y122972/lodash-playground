import lodash from "lodash";
import classNames from "classnames";

interface Props {
  search: string;
  current: string;
  onChange: (key: string) => void;
}

export default function LodashList({ search, current, onChange }: Props) {
  return (
    <>
      {Object.keys(lodash)
        .filter((key) => {
          if (search === "") {
            return true;
          }

          return key.toLowerCase().includes(search.toLowerCase());
        })
        .map((item) => (
          <div
            key={item}
            className={classNames(
              "cursor-pointer hover:bg-blue-300/30 p-2",
              current === item ? "bg-orange" : ""
            )}
            onClick={() => {
              onChange(item);
            }}
          >
            {item}
          </div>
        ))}
    </>
  );
}
