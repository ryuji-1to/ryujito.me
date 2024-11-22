export function TimeLine(props: { children: React.ReactNode[] }) {
  return <div>{props.children.map((child) => child)}</div>;
}

export function TimeLineCard() {
  return <div>timeline card</div>;
}
