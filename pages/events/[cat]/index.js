import Image from "next/image";
import Link from "next/link";

const EventsCatPage = ({ data, pageName }) => {
  // const nameUpperCase = pageName[0].toUpperCase() + pageName.slice(1);
  const nameUpperCase = pageName
    .replace(/(?:^|-)([a-z])/g, (_, letter) => letter.toUpperCase())
    .replace(/-/g, " ");

  return (
    <div>
      <h1>Events in {nameUpperCase}</h1>
      <div>
        {data.map((ev) => (
          <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref>
            <Image width={300} height={300} alt={ev.title} src={ev.image} />
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        cat: ev.id.toString(),
      },
    };
  });
  console.log(allPaths);
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context);
  // assigns the value of context.params.cat to the variable id, but only if context is not null or undefined. The ?. is called the Optional Chaining operator, which allows the property params.cat to be safely accessed even if context is null or undefined. If context is null or undefined, the value of id will be undefined.
  const id = context?.params.cat;
  const { allEvents } = await import("/data/data.json");
  const data = allEvents.filter((ev) => ev.city === id);
  console.log(data);
  // props: { data: data }
  return { props: { data, pageName: id } };
}
