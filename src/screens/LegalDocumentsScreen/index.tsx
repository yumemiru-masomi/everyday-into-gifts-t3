"use client";

type Props = {
  title: string;
  discription?: string;
  data: { title: string; body: JSX.Element }[];
  establishmentDateText?: string;
};

export function LegalDocumentsScreen(props: Props) {
  return (
    <main>
      <h1>{props.title}</h1>
      {props.discription && <p>{props.discription}</p>}
      {props.data.map((d) => (
        <div key={d.title}>
          <h2>{d.title}</h2>
          <p>{d.body}</p>
        </div>
      ))}
      {props.establishmentDateText && <p>{props.establishmentDateText}</p>}
    </main>
  );
}
