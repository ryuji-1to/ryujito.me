import { cn } from "@/share/lib";
import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";

export function TimeLine() {
  return (
    <div>
      {data.map((d, i) => (
        <div key={d.title.id}>
          <div className="flex gap-8 items-center">
            <div className="w-[10px] h-[10px] bg-gray-400 dark:bg-gray-600 rounded-full" />
            <span className="text-xs dark:text-gray-400">
              {i18n.date(new Date(d.date).toDateString())}
            </span>
          </div>
          <div className="flex gap-8 pl-1">
            <div
              className={cn(
                i !== data.length - 1 && "bg-gray-300 dark:bg-gray-700",
                "w-[2px]",
              )}
            />
            <div className="py-6 w-full">
              <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 w-full rounded-lg">
                <h2 className="font-semibold mb-2 dark:text-gray-300">
                  <Trans id={d.title.id} />
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-[11px]">
                  <Trans id={d.description.id} />
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const data: {
  title: MessageDescriptor;
  description: MessageDescriptor;
  date: `${number}-${number}-${number}`;
}[] = [
  {
    title: msg`Joined Ikyu Corporation`,
    description: msg`Assigned to the development of the accommodation business.`,
    date: "2025-02-01",
  },
  {
    title: msg`Left LY Corporation`,
    description: msg`Worked as an engineer for two years on Yahoo Mail and for three months on Yahoo Search`,
    date: "2024-01-31",
  },
  {
    title: msg`Joined Yahoo! Japan (now LY Corporation)`,
    description: msg`Assigned to the Yahoo Mail development team, where I worked on front-end development and technology modernization for about two years.`,
    date: "2022-04-01",
  },
];
