export function TimeLine(props: { children: React.ReactNode[] }) {
  return <div>{props.children.map((child) => child)}</div>;
}

export function TimeLineCard() {
  return (
    <div className="border p-4 rounded-md">
      <h2>Title</h2>
      <p>description</p>
    </div>
  );
}
