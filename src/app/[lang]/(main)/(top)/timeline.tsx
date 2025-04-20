import { cn } from "@/share/lib";
import type { I18n, MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react";

export function TimeLine(props: { i18n: I18n }) {
  return (
    <div>
      {data.map((d, i) => (
        <div key={d.title.id}>
          <div className="flex gap-16 items-center">
            <div className="w-[10px] h-[10px] bg-gray-8 dark:bg-dark-gray-8 rounded-full" />
            <span className="text-xs">
              {props.i18n.date(new Date(d.date).toDateString())}
            </span>
          </div>
          <div className="flex gap-24 pl-[4px]">
            <div
              className={cn(
                i !== data.length - 1 && "bg-gray-6 dark:bg-dark-gray-6",
                "w-[2px]",
              )}
            />
            <div className="py-24 w-full">
              <section className="bg-gray-2 dark:bg-dark-gray-2 border border-gray-6 dark:border-dark-gray-6 p-24 w-full rounded-6">
                <h2 className="font-semibold mb-8 dark:text-gray-1">
                  <Trans id={d.title.id} />
                </h2>
                <p className="text-gray-11 dark:text-dark-gray-11 text-xxs">
                  <Trans id={d.description.id} />
                </p>
              </section>
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
