import { cn } from "@/share/lib";
import { Fragment } from "react";

export function TimeLine() {
  return (
    <div>
      {data.map((d, i) => (
        <Fragment key={d.title}>
          <div className="flex gap-16 items-center">
            <div className="w-[10px] h-[10px] bg-gray-8 dark:bg-dark-gray-8 rounded-full" />
            <time dateTime={d.date} className="text-xs">
              {new Date(d.date).toDateString()}
            </time>
          </div>
          <div className="flex gap-24 pl-[4px]">
            <div
              className={cn(
                i !== data.length - 1 && "bg-gray-6 dark:bg-dark-gray-6",
                "w-[2px]",
              )}
            />
            <div className="py-24 w-full">
              <article
                aria-labelledby={d.title}
                className="bg-gray-2 dark:bg-dark-gray-2 border border-gray-6 dark:border-dark-gray-6 p-24 w-full rounded-6"
              >
                <h2
                  id={d.title}
                  className="font-semibold mb-8 dark:text-gray-1"
                >
                  {d.title}
                </h2>
                <p className="text-gray-11 dark:text-dark-gray-11 text-xxs">
                  {d.description}
                </p>
              </article>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

const data: {
  title: string;
  description: string;
  date: `${number}-${number}-${number}`;
}[] = [
  {
    title: "株式会社一休に入社",
    description:
      "一休.com、Y!トラベルのフロントエンド開発、RESZAIKO台帳の開発に従事",
    date: "2025-02-01",
  },
  {
    title: "LINEヤフー株式会社を退職",
    description: "Yahooメールで2年間、Yahoo検索で3か月間エンジニアとして勤務",
    date: "2024-01-31",
  },
  {
    title: "Yahoo! JAPAN（現：LINEヤフー株式会社）に入社",
    description:
      "Yahooメールの開発チームに配属され、約2年間フロントエンド開発と技術のモダン化に取り組む",
    date: "2022-04-01",
  },
];
