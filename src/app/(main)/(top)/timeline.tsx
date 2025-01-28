import { cn } from "@/share/lib";

export function TimeLine() {
  return (
    <div>
      {data.map((d, i) => (
        <div key={d.title}>
          <div className="flex gap-8 items-center">
            <div className="w-[10px] h-[10px] bg-gray-400 dark:bg-gray-600 rounded-full" />
            <span className="text-xs">{new Date(d.date).toDateString()}</span>
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
                <h2 className="font-semibold mb-2">{d.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-[11px]">
                  {d.description}
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
  title: string;
  description: string;
  date: `${number}-${number}-${number}`;
}[] = [
  { title: "？", description: "...", date: "2024-02-01" },
  {
    title: "LINEヤフー株式会社 退職",
    description: "2年間ヤフーメール、3ヶ月間ヤフー検索のエンジニアとして働いた",
    date: "2024-01-31",
  },
  {
    title: "ヤフー株式会社(現LINEヤフー) 入社",
    description:
      "ヤフーメールを開発する部署に配属され、2年ほどFE開発や技術刷新などを担当",
    date: "2022-04-01",
  },
];
